import Elysia from "elysia";
import IndexPage from "./indexPage";

export const pageRoutes = new Elysia({ prefix: "/" }).use(IndexPage);
