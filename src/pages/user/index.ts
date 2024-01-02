import Elysia from "elysia";
import SignUpPage from "./signup";
import IndexPage from "./indexPage";
import SignInPage from "./signin";
import SignOutPage from "./signout";

const userRoute = new Elysia({ prefix: "/user" })
	.use(IndexPage)
	.use(SignInPage)
	.use(SignUpPage)
	.use(SignOutPage);

export default userRoute;
