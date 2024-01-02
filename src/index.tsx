import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { tailwind } from "elysia-tailwind";
import staticPlugin from "@elysiajs/static";

import { apiRoutes } from "./api";
import { pageRoutes } from "./pages";
import { cookie } from "@elysiajs/cookie";
import { exit } from "process";
import path from "path";

if (typeof Bun.env.JWT_SECRET !== "string") {
	console.log("invalid jwt secret");
	exit();
}

// const temp = ["user.ts"].map(file=>{

// 	// const filename = path.parse(file)
// 	return {
// 		// name:
// 	}
// })

// const bundle = await Bun.build({
// 	entrypoints: [path.join(process.cwd(), "/src/script/user.ts")],
// 	outdir: path.join("public"),
// });

// console.log(bundle);

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
