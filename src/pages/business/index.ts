import Elysia from "elysia";
import IndexPage from "./index.page";

const businessRoute = new Elysia({ prefix: "/business" }).use(IndexPage);

export default businessRoute;
