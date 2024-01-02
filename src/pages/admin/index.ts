import Elysia from "elysia";
import { appContext } from "../../utils/context";
import indexPage from "./indexPage";

const routeHandler = new Elysia({ prefix: "/admin" }).use(appContext).guard(
	{
		beforeHandle({ appContext }) {
			if (appContext.role !== "admin") {
				return Response.error();
			}
		},
	},
	(app) => app.use(indexPage),
);

export default routeHandler;
