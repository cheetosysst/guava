import Elysia from "elysia";

const publishHandler = new Elysia({ prefix: "/publish" }).get("", () => {
	return <div class="p-4 flex">publis goods</div>;
});

export default publishHandler;
