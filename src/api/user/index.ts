import Elysia from "elysia";
import singupHandler from "./signup";
import singinHandler from "./signin";
import signoutHandler from "./signout";

const userRoute = new Elysia({ prefix: "/user" })
	.use(singupHandler)
	.use(singinHandler)
	.use(signoutHandler);

export default userRoute;
