import Elysia from "elysia";

const dashboardHandler = new Elysia({ prefix: "/dashboard" }).get("", () => {
	return <div class="p-4 flex">dashboard for partner</div>;
});

export default dashboardHandler;
