import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { tailwind } from "elysia-tailwind";
import staticPlugin from "@elysiajs/static";

import { apiRoutes } from "./api";
import { pageRoutes } from "./pages";

const app = new Elysia()
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
	.use(apiRoutes)
	.use(pageRoutes)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
