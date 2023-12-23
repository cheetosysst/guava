import Elysia from "elysia";
import MainLayout from "../layouts/main";
import { Card } from "../components/card";

const Page = new Elysia().get("/", () => (
	<MainLayout title="Home">
		<Hero />
		<Event />
	</MainLayout>
));

export default Page;

const mockData = [
	{
		name: "Est tempor",
		description:
			"Et culpa nulla ullamco aliquip occaecat quis ad proident id cillum mollit incididunt aliqua do.",
		price: 11110,
		img: "https://picsum.photos/id/1020/400/600",
	},
	{
		name: "Est tempor",
		description:
			"Et culpa nulla ullamco aliquip occaecat quis ad proident id cillum mollit incididunt aliqua do.",
		price: 11110,
		img: "https://picsum.photos/id/1020/400/600",
	},
	{
		name: "Est tempor",
		description:
			"Et culpa nulla ullamco aliquip occaecat quis ad proident id cillum mollit incididunt aliqua do.",
		price: 11110,
		img: "https://picsum.photos/id/1020/400/600",
	},
	{
		name: "Est tempor",
		description:
			"Et culpa nulla ullamco aliquip occaecat quis ad proident id cillum mollit incididunt aliqua do.",
		price: 11110,
		img: "https://picsum.photos/id/1020/400/600",
	},
	{
		name: "Est tempor",
		description:
			"Et culpa nulla ullamco aliquip occaecat quis ad proident id cillum mollit incididunt aliqua do.",
		price: 11110,
		img: "https://picsum.photos/id/1020/400/600",
	},
	{
		name: "Est tempor",
		description:
			"Et culpa nulla ullamco aliquip occaecat quis ad proident id cillum mollit incididunt aliqua do.",
		price: 11110,
		img: "https://picsum.photos/id/1020/400/600",
	},
	{
		name: "Est tempor",
		description:
			"Et culpa nulla ullamco aliquip occaecat quis ad proident id cillum mollit incididunt aliqua do.",
		price: 11110,
		img: "https://picsum.photos/id/1020/400/600",
	},
	{
		name: "Est tempor",
		description:
			"Et culpa nulla ullamco aliquip occaecat quis ad proident id cillum mollit incididunt aliqua do.",
		price: 11110,
		img: "https://picsum.photos/id/1020/400/600",
	},
];

const Hero = () => {
	return (
		<section class="flex flex-col gap-2 h-fit bg-gradient-to-b from-primary to-transparent">
			<h2 class="w-full font-bold drop-shadow-md text-4xl px-8 pt-8 pb-4">
				On Sale!
			</h2>
			<div
				class="w-full flex gap-4 md:gap-8 overflow-x-auto"
				style={{ scrollbarWidth: "none" }}
			>
				{mockData.map((item) => (
					<Card
						name={item.name}
						description={item.description}
						price={item.price}
						src={item.img}
						href={`/product?name=${encodeURI(item.name)}`}
						className="h-64 md:h-96 first:ml-8 snap-start scroll-m-10 shrink-0 last:mr-8"
					/>
				))}
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
		<div class="card group w-full h-72 m-8 bg-base-100 shadow-xl image-full">
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
