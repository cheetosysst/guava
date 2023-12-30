import Elysia from "elysia";
import singupHandler from "./signup";
import singinHandler from "./signin";

const userRoute = new Elysia({ prefix: "/user" })
	.use(singupHandler)
	.use(singinHandler);

export default userRoute;
