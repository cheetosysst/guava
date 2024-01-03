import Elysia from "elysia";

const dashboardHandler = new Elysia({ prefix: "/dashboard" }).get("", () => {
	return <>dashboard</>;
});

export default dashboardHandler;
