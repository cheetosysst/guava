import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { tailwind } from "elysia-tailwind";
import staticPlugin from "@elysiajs/static";
import { db } from "./database/index";

import MainLayout from "./layouts/main";
import Navbar from "./components/navbar";

const app = new Elysia()
	.state("db", db)
	.use(staticPlugin())
	.use(html())
	.use(
		tailwind({
			path: "/public/dist.css",
			source: "./style/index.css",
			config: "./tailwind.config.js",
			options: {
				minify: true,
				map: true,
				autoprefixer: false,
			},
		})
	)
	.get("/", () => (
		<MainLayout>
			<Navbar />
			<div class="text-3xl">Hello Elysia</div>
			hello
		</MainLayout>
	))
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
