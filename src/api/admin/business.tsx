import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../../database";
import { business } from "../../database/schema";

enum ResultAdd {
	SUCCESS = 0,
	ALREADY_EXISTS = 1,
}

const addHandler = new Elysia({ prefix: "/add" }).post(
	"",
	async ({ body }) => {
		const result = await db.transaction(async (tx) => {
			const existingBusiness = await tx
				.select()
				.from(business)
				.where(eq(business.name, body.name));
			if (existingBusiness.length > 0) return ResultAdd.ALREADY_EXISTS;

			await tx.insert(business).values({
				name: body.name,
			});
			return ResultAdd.SUCCESS;
		});

		if (result === ResultAdd.ALREADY_EXISTS) {
			return (
				<span
					safe
					class="alert inline-block alert-error"
					// @ts-ignore
					_="on load wait 5s then transition opacity to 0 then remove me"
				>
					Business "{body.name}" already exists
				</span>
			);
		}

		return (
			<span
				safe
				class="alert inline-block alert-success"
				// @ts-ignore
				_="on load wait 5s then transition opacity to 0 then remove me"
			>
				Business "{body.name}" added
			</span>
		);
	},
	{
		body: t.Object({
			name: t.String(),
		}),
		type: "formdata",
	}
);

const businessHandler = new Elysia({ prefix: "/business" })
	.get("", () => {
		return (
			<div class="p-4 flex gap-4">
				<form
					class="card bg-base-100"
					hx-post="/api/admin/business/add"
					hx-target="#add-result"
				>
					<div class="card-body">
						<div class="card-title">Add Business</div>
						<div id="add-result" />
						<label>
							<div class="label">
								<span class="label-text">Name</span>
							</div>
							<input
								type="text"
								name="name"
								class="input input-bordered"
								placeholder="Pear Computer"
							/>
						</label>
						<input
							type="submit"
							value="submit"
							class="btn btn-primary"
						/>
					</div>
				</form>
				<form class="card bg-base-100">
					<div class="card-body">
						<div class="card-title">Remove Business</div>
						<label>
							<div class="label">
								<span class="label-text">Name</span>
							</div>
							<input
								type="text"
								name="name"
								class="input input-bordered input-disabled"
								placeholder="Pear Computer"
							/>
						</label>
						<input
							type="submit"
							value="submit"
							class="btn btn-primary btn-disabled"
						/>
					</div>
				</form>
			</div>
		);
	})
	.use(addHandler);

export default businessHandler;
