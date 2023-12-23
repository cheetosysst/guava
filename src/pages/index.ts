import Elysia from "elysia";
import IndexPage from "./indexPage";
import userRoute from "./user";

export const pageRoutes = new Elysia().use(IndexPage).use(userRoute);
