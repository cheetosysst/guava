import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../../database";
import { business, product, productImage } from "../../database/schema";
import { appContext } from "../../utils/context";
import { convertToAvif, generateUniqueFilename } from "../../utils/image";

enum UploadResult {
	BUSINESS_MISSING = 0,
	SUCCESS = 1,
}

const uploadHandler = new Elysia({ prefix: "/upload" }).use(appContext).post(
	"",
	async ({ body, appContext }) => {
		const image = await convertToAvif(body.image);
		if (!(image instanceof Buffer)) {
			return (
				<span
					class="alert inline-block alert-error"
					// @ts-ignore
					_="on load wait 5s then transition opacity to 0 then remove me"
				>
					File upload failed
				</span>
			);
		}
		image;

		if (appContext.business == null) {
			return (
				<span
					class="alert inline-block alert-error"
					// @ts-ignore
					_="on load wait 5s then transition opacity to 0 then remove me"
				>
					User is not a business account
				</span>
			);
		}
		const filename = generateUniqueFilename(
			appContext.business.toString(),
			"avif"
		);

		const result: UploadResult = await db.transaction(async (tx) => {
			const businessEntry = await tx
				.select()
				.from(business)
				.where(eq(business.id, appContext.business));

			if (businessEntry.length <= 0) {
				return UploadResult.BUSINESS_MISSING;
			}

			Bun.write(`public/productImage/${filename}`, image);

			const productEntry = await tx
				.insert(product)
				.values({
					name: body.name,
					business: appContext.business,
					description: body.description,
					price: Number(body.price),
					amount: Number(body.amount),
				})
				.returning({ id: product.id });

			await tx.insert(productImage).values({
				product: productEntry[0].id,
				url: filename,
			});

			return UploadResult.SUCCESS;
		});
		if (result === UploadResult.BUSINESS_MISSING) {
			return (
				<span
					class="alert inline-block alert-error"
					// @ts-ignore
					_="on load wait 5s then transition opacity to 0 then remove me"
				>
					Business doesn't exist
				</span>
			);
		}

		return (
			<div>
				<h2 safe>{body.name}</h2>
				<img
					src={`/public/productImage/${filename}`}
					class="w-full h-auto"
					alt=""
				/>
				<p safe>Price: {body.price}</p>
				<p safe>Description: {body.description}</p>
				<p safe>Amount: {body.amount}</p>
			</div>
		);
	},
	{
		type: "multipart/form-data",
		body: t.Object({
			name: t.String(),
			price: t.String(),
			amount: t.String(),
			description: t.String(),
			image: t.File(),
		}),
	}
);

const publishHandler = new Elysia({ prefix: "/publish" })
	.get("", () => {
		return (
			<div class="p-4 flex gap-4 w-full">
				<form
					class="card bg-base-100 drop-shadow-md"
					hx-encoding="multipart/form-data"
					hx-post="/api/partner/publish/upload"
					hx-target="#publish-result"
				>
					<div class="card-body">
						<div class="card-title">Publish</div>
						<label class="form-control w-full max-w-xs">
							<div class="label">
								<span class="label-text">Product name</span>
							</div>
							<input
								type="text"
								class="input input-bordered"
								name="name"
								placeholder="ex: Mirage 2000 fighter"
								required
							/>
						</label>
						<label class="form-control w-full max-w-xs">
							<div class="label">
								<span class="label-text">Price</span>
							</div>
							<input
								type="number"
								class="input input-bordered"
								name="price"
								value="100"
								required
							/>
						</label>
						<label class="form-control w-full max-w-xs">
							<div class="label">
								<span class="label-text">Amount</span>
							</div>
							<input
								type="number"
								class="input input-bordered"
								name="amount"
								value="100"
								required
							/>
						</label>
						<label class="form-control">
							<div class="label">
								<span class="label-text">
									Product Description
								</span>
							</div>
							<textarea
								class="textarea textarea-bordered h-24"
								name="description"
								placeholder="product description"
								required
							/>
						</label>
						<label class="form-control w-full max-w-xs">
							<div class="label">
								<span class="label-text">Product Image</span>
							</div>
							<input
								type="file"
								name="image"
								class="file-input file-input-bordered w-full max-w-xs"
								accept="image/*"
								required
							/>
						</label>
						<input
							type="submit"
							value="Submit"
							class="btn btn-primary"
						/>
					</div>
				</form>
				<div class="card bg-base-100 drop-shadow-md w-96">
					<div class="card-body">
						<div class="card-title">Upload Result</div>
						<div id="publish-result" />
					</div>
				</div>
			</div>
		);
	})
	.use(uploadHandler);

export default publishHandler;
