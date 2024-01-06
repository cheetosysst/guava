import Elysia from "elysia";
import cartPage from "./index.page";

const cartRoute = new Elysia({ prefix: "/cart" }).use(cartPage);

export default cartRoute;
