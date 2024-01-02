import Elysia from "elysia";
import IndexPage from "./indexPage";
import userRoute from "./user";
import adminRoute from "./admin";

export const pageRoutes = new Elysia()
	.use(IndexPage)
	.use(userRoute)
	.use(adminRoute);
