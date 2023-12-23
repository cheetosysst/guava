import Elysia from "elysia";
import SignUpPage from "./signup";
import IndexPage from "./indexPage";

const userRoute = new Elysia({ prefix: "/user" })
	.use(IndexPage)
	.use(SignUpPage);

export default userRoute;
