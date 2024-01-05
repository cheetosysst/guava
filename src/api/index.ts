import Elysia from "elysia";
import adminRoute from "./admin";
import partnerRoute from "./partner";
import userRoute from "./user";

export const apiRoutes = new Elysia({ prefix: "/api" })
	.use(userRoute)
	.use(adminRoute)
	.use(partnerRoute);
