import Elysia from "elysia";
import userRoute from "./user";

export const apiRoutes = new Elysia({ prefix: "/api" }).use(userRoute);
