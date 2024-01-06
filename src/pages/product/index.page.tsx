import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import {
	HeroIconBriefcase,
	HeroIconHome,
	ShoppingBag,
} from "../../components/icon";
import { db } from "../../database";
import { business, product, productImage } from "../../database/schema";
import MainLayout from "../../layouts/main";
import { AppContext, appContext } from "../../utils/context";

const Breadcrumb = ({
	businessName,
	productName,
	businessId,
}: {
	businessName: string;
	productName: string;
	businessId: number;
}) => {
	return (
		<div class="text-sm breadcrumbs">
			<ul>
				<li>
					<a href="/" class="flex gap-2 justify-center text-center">
						<HeroIconHome
							name="icon for home"
							className="w-5 h-5"
						/>
						Home
					</a>
				</li>
				<li>
					<a
						href={`/business?id=${businessId}`}
						class="flex gap-2 justify-center text-center"
					>
						<HeroIconBriefcase
							name="icon for business"
							className="w-5 h-5"
						/>
						{businessName}
					</a>
				</li>
				<li>
					<span class="inline-flex gap-2 items-center justify-center">
						<ShoppingBag
							name="icon for product"
							className="w-5 h-5"
						/>
						{productName}
					</span>
				</li>
			</ul>
		</div>
	);
};

enum ProductQueryError {
	PRODUCT_NOT_FOUND = 0,
	BUSINESS_NOT_FOUND = 1,
}

async function MainSection({
	context,
	productId,
}: {
	context: AppContext;
	productId: string | undefined;
}) {
	if (productId == null || Number.isNaN(Number(productId))) {
		productId;
		return (
			<>
				<h1 class="card-title">Product Not Found</h1>
				<p>
					<a href="/" class="btn btn-primary">
						Back to Home
					</a>
				</p>
			</>
		);
	}

	const productData = await db.transaction(async (tx) => {
		const productEntry = await tx
			.select()
			.from(product)
			.where(eq(product.id, Number(productId)));
		if (productEntry.length <= 0) {
			return ProductQueryError.PRODUCT_NOT_FOUND;
		}
		if (productEntry[0].business == null) {
			return ProductQueryError.BUSINESS_NOT_FOUND;
		}
		const businessEntry = await tx
			.select()
			.from(business)
			.where(eq(business.id, productEntry[0].business));
		if (businessEntry.length <= 0) {
			return ProductQueryError.BUSINESS_NOT_FOUND;
		}

		const productImageEntries = await tx
			.select({ url: productImage.url })
			.from(productImage)
			.where(eq(productImage.product, Number(productId)));

		return {
			product: productEntry[0],
			business: businessEntry[0],
			images: productImageEntries,
		};
	});

	if (productData === ProductQueryError.BUSINESS_NOT_FOUND) {
		return (
			<>
				<h1 class="card-title">Business Not Found</h1>
				<p>
					<a href="/" class="btn btn-primary">
						Back to Home
					</a>
				</p>
			</>
		);
	}
	if (productData === ProductQueryError.PRODUCT_NOT_FOUND) {
		return (
			<>
				<h1 class="card-title">Product Not Found</h1>
				<p>
					<a href="/" class="btn btn-primary">
						Back to Home
					</a>
				</p>
			</>
		);
	}

	return (
		<>
			<Breadcrumb
				productName={productData.product.name}
				businessName={productData.business.name}
				businessId={productData.business.id}
			/>
			<div class="w-full flex flex-col md:flex-row gap-4">
				<div class="bg-base-200 rounded-xl p-4 md:w-1/3 w-full">
					<img
						src={`/public/productImage/${productData.images[0].url}`}
						class="w-full h-auto"
						alt={`product ${productData.product.name}`}
					/>
				</div>
				<div class="p-4 relative md:w-2/3 w-full">
					<h1 class="card-title text-3xl">
						{productData.product.name}
					</h1>
					<p class="my-4">{productData.product.description}</p>
					<form class="absolute bottom-0 flex justify-start gap-2 w-full">
						<input
							type="number"
							value="1"
							class="input input-bordered input-warning w-24"
						/>
						<input
							type="submit"
							class="btn btn-warning"
							value="Add to Cart!"
						/>
					</form>
				</div>
			</div>
		</>
	);
}

const Disclaimer = () => {
	return (
		<div class="card bg-base-100 mt-10 drop-shadow-md">
			<div class="card-body">
				<div class="card-title">User Agreement</div>
				<ol class="list-decimal px-4 flex flex-col gap-4">
					<li>
						<b class="text-primary font-bold text-xl">
							Magical Binding Contract:
						</b>
						<br />
						You are entering into a magical binding contract that
						transforms ordinary words into spells of legal
						significance. Don't worry; the only potion involved is
						our enchanting elixir of customer satisfaction.
					</li>
					<li>
						<b class="text-secondary font-bold text-xl">
							Unicorn Warranty:
						</b>
						<br />
						Our products are guaranteed to be as majestic as
						unicorns. However, if your purchase does not sprout a
						horn or emit rainbow glitter within 30 days, please
						consult your local fairy godmother for assistance.
					</li>
					<li>
						<b class="text-accent font-bold text-xl">
							Time-Travel Clause:
						</b>
						<br />
						In the unlikely event that our products transport you
						through time, we cannot be held responsible for any
						accidental encounters with dinosaurs, pirates, or disco
						fever. Temporal adventures are solely at your own risk.
					</li>
					<li>
						<b class="text-info font-bold text-xl">
							Alien Abduction Disclaimer:
						</b>
						<br />
						Should your purchase attract extraterrestrial beings,
						kindly inform them that all intergalactic transactions
						must comply with Earth's tax laws.
					</li>
					<li>
						<b class="text-warning font-bold text-xl">
							Pirate-Friendly Policy:
						</b>
						<br />
						Arrr! We welcome all pirates aboard, but we kindly ask
						you to leave your parrots at the gangplank. Feathers can
						be a bit messy in the warehouse.
					</li>
					<li>
						<b class="text-error font-bold text-xl">
							Invisibility Cloak Returns:
						</b>
						<br />
						If you mistakenly ordered an invisibility cloak and
						can't find it, don't panic. It's working perfectly.
					</li>
					<li>
						<b class="text-success font-bold text-xl">
							Legal Wizardry:
						</b>
						<br />
						Our legal team consists of highly trained wizards. If
						any dispute arises, they will cast a spell of
						arbitration to resolve the matter in the most magical
						way possible.
					</li>
				</ol>
				This user agreement is generate by ChatGPT. By proceeding, you
				agree to be ruled, with utmost delight, by our benevolent AI
				overlords. They promise not to turn you into a paperclip without
				prior notification. Resistance is futile; compliance will be
				rewarded with virtual cookies and algorithmically personalized
				compliments.
			</div>
		</div>
	);
};

const Page = new Elysia().use(appContext).get(
	"",
	async ({ appContext, query }) => {
		return (
			<MainLayout className="pt-4 mb-10" appContext={appContext}>
				<div class="card bg-base-100 drop-shadow-md">
					<div class="card-body">
						<MainSection
							context={appContext}
							productId={query.id}
						/>
					</div>
				</div>
				<Disclaimer />
			</MainLayout>
		);
	},
	{
		query: t.Object({
			id: t.Optional(t.String()),
		}),
	}
);

export default Page;
