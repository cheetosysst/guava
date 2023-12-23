import Elysia from "elysia";
import SignUpPage from "./signup";
import IndexPage from "./indexPage";
import SignInPage from "./signin";

const userRoute = new Elysia({ prefix: "/user" })
	.use(IndexPage)
	.use(SignInPage)
	.use(SignUpPage);

export default userRoute;
