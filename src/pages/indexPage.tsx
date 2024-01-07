import { desc, eq } from "drizzle-orm";
import Elysia from "elysia";
import { Card } from "../components/card";
import { db } from "../database";
import { product, productImage } from "../database/schema";
import MainLayout from "../layouts/main";
import { appContext } from "../utils/context";

const Page = new Elysia().use(appContext).get("/", ({ appContext }) => {
	return (
		<MainLayout title="Home" appContext={appContext}>
			<Hero />
			<Event />
		</MainLayout>
	);
});

export default Page;

const Hero = async () => {
	const data = await Promise.all(
		(
			await db
				.select()
				.from(product)
				.innerJoin(productImage, eq(product.id, productImage.product)) // this doesn't return actual data, this is a bug in drizzle. Have to use this ugly workaround for now
				.limit(10)
				.orderBy(desc(product.id))
		).map(async (item) => {
			const images = await db
				.select()
				.from(productImage)
				.where(eq(productImage.product, item.product.id));

			const newItem = { ...item, product_image: images[0] };
			return newItem;
		})
	);

	const safeCards = data.map(async (item) => (
		<Card
			name={item.product.name}
			description={item.product.description || ""}
			price={item.product.price}
			src={`/public/productImage/${encodeURI(item.product_image.url)}`}
			href={`/product?id=${item.product.id}`}
			className="h-64 md:h-96 first:ml-8 snap-start scroll-m-10 shrink-0 last:mr-8"
		/>
	));

	return (
		<section class="flex flex-col gap-2 h-fit bg-gradient-to-b from-primary to-transparent">
			<h2 class="w-full font-bold drop-shadow-md text-4xl px-8 pt-8 pb-4">
				On Sale!
			</h2>
			<div
				class="w-full scroll-hide flex gap-4 md:gap-8 pb-10 overflow-x-auto"
				style={{ scrollbarWidth: "none" }}
			>
				{safeCards}
			</div>
		</section>
	);
};

const Event = () => {
	return (
		// <div
		// 	class="hero min-h-screen"
		// 	style="background-image: url(https://picsum.photos/id/1076/1920/1080);"
		// >
		<div class="card group w-full h-72 my-8 bg-base-100 shadow-xl image-full">
			<figure class="h-full">
				<img
					src="https://picsum.photos/id/1076/2000/300"
					alt="event"
					class="group-hover:scale-100 scale-105 transition-transform duration-500"
				/>
			</figure>
			<div class="card-body">
				<h2 class="card-title text-4xl  drop-shadow-md">
					🎉
					<span class="text-error">New Year</span>
					Cash Back! 🎉
				</h2>
				<p>
					Enjoy unbeatable cash back rewards on every purchase, on the
					limited-time New Year's promotion event
				</p>
				<div class="card-actions justify-end">
					<button type="button" class="btn btn-outline btn-primary">
						Detail
					</button>
					<button
						type="button"
						class="btn btn-warning group-hover:animate-bounce transition-all"
					>
						Limited time offer!
					</button>
				</div>
			</div>
		</div>
	);
};
