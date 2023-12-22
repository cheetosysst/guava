import Elysia from "elysia";

export const apiRoutes = new Elysia({ prefix: "/api" }).get(
	"/test",
	() => "test",
);
