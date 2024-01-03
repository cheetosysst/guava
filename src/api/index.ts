import Elysia from "elysia";
import adminRoute from "./admin";
import userRoute from "./user";

export const apiRoutes = new Elysia({ prefix: "/api" })
	.use(userRoute)
	.use(adminRoute);
