import { eq, sql } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { Card } from "../../components/card";
import { db } from "../../database";
import { business, product, productImage } from "../../database/schema";
import MainLayout from "../../layouts/main";
import { appContext } from "../../utils/context";

enum QueryError {
	BUSINESS_NOT_FOUND = 0,
	NO_PRODUCT = 1,
}

const PRODUCT_PER_PAGE = 32 as const;

async function MainSection({
	businessId,
	page,
}: {
	businessId: string | undefined;
	page: number;
}) {
	if (businessId == null || Number.isNaN(Number(businessId))) {
		businessId;
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
		const businessEntry = await tx
			.select()
			.from(business)
			.where(eq(business.id, Number(businessId)));

		if (businessEntry.length <= 0) {
			return QueryError.BUSINESS_NOT_FOUND;
		}
		const offset = page < 1 ? 0 : PRODUCT_PER_PAGE * (page - 1);

		const productEntry = await Promise.all(
			(
				await tx
					.select()
					.from(product)
					.innerJoin(
						productImage,
						eq(product.id, productImage.product)
					) // this doesn't return actual data, this is a bug in drizzle. Have to use this ugly workaround for now
					.where(eq(product.business, Number(businessId)))
					.limit(PRODUCT_PER_PAGE)
					.offset(offset)
			).map(async (item) => {
				const images = await db
					.select()
					.from(productImage)
					.where(eq(productImage.product, item.product.id));

				const newItem = { ...item, product_image: images[0] };
				return newItem;
			})
		);

		if (productEntry.length <= 0) {
			return QueryError.NO_PRODUCT;
		}

		const totalPages =
			(
				await tx
					.select({
						count: sql<number>`cast(count(${product.id}) as int)`,
					})
					.from(product)
			)[0].count /
				PRODUCT_PER_PAGE +
			1;

		return {
			business: businessEntry[0],
			products: productEntry,
			total: totalPages,
		};
	});

	if (productData === QueryError.BUSINESS_NOT_FOUND) {
		return <>not found</>;
	}

	if (productData === QueryError.NO_PRODUCT) {
		return <>no product</>;
	}

	const safeCards = productData.products.map(async (item) => (
		<Card
			name={item.product.name}
			description={item.product.description || ""}
			price={item.product.price}
			src={`/public/productImage/${encodeURI(item.product_image.url)}`}
			href={`/product?id=${item.product.id}`}
			className="h-64 md:h-96 snap-start scroll-m-10 shrink-0"
		/>
	));

	return (
		<>
			<div class="card w-full my-5 bg-base-100 drop-shadow-md">
				<div class="card-body">
					<div class="card-title text-4xl" safe>
						{productData.business.name}
					</div>
				</div>
			</div>
			<div class="flex gap-4 justify-center min-h-screen">
				{safeCards}
			</div>
			<Pagination
				totalPages={productData.total}
				current={page}
				id={Number(businessId)}
			/>
		</>
	);
}

function Pagination({
	totalPages,
	current,
	id,
}: {
	totalPages: number;
	current: number;
	id: number;
}) {
	const renderPageNumbers = () => {
		const pageNumbers = [];

		// Calculate the range of page numbers to display
		const startPage = Math.max(1, current - 4);
		const endPage = Math.min(totalPages, current + 5);

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<li>
					<a
						class={`p-2 rounded-md border-[1px] drop-shadow-sm hover:bg-sky-50 transition-colors ${
							i === current
								? "bg-neutral-300/60"
								: "bg-neutral-100/60"
						}`}
						href={`?id=${id}&page=${i}`}
					>
						{i}
					</a>
				</li>
			);
		}
		return pageNumbers;
	};

	return (
		<ul class="flex gap-2 w-full justify-center" safe>
			{renderPageNumbers()}
		</ul>
	);
}

const Page = new Elysia().use(appContext).get(
	"",
	async ({ appContext, query }) => {
		return (
			<MainLayout className="pt-4 mb-10" appContext={appContext}>
				<MainSection
					businessId={query.id}
					page={Number(query.page) || 1}
				/>
			</MainLayout>
		);
	},
	{
		query: t.Object({
			id: t.Optional(t.String()),
			page: t.Optional(t.String()),
		}),
	}
);

export default Page;
