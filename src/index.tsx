import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { tailwind } from "elysia-tailwind";

import { cookie } from "@elysiajs/cookie";
import { exit } from "process";
import { apiRoutes } from "./api";
import { pageRoutes } from "./pages";

if (typeof Bun.env.JWT_SECRET !== "string") {
	console.log("invalid jwt secret");
	exit();
}

const app = new Elysia()
	.use(staticPlugin())
	.use(cookie())
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
