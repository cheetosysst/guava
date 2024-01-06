import Elysia from "elysia";
import IndexPage from "./index.page";

const productRoute = new Elysia({ prefix: "/product" }).use(IndexPage);

export default productRoute;
