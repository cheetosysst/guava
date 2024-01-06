import Elysia from "elysia";
import adminRoute from "./admin";
import businessRoute from "./business";
import IndexPage from "./indexPage";
import partnerRoute from "./partner";
import productRoute from "./product";
import userRoute from "./user";

export const pageRoutes = new Elysia()
	.use(IndexPage)
	.use(userRoute)
	.use(adminRoute)
	.use(partnerRoute)
	.use(productRoute)
	.use(businessRoute);
