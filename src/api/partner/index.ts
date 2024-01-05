import Elysia from "elysia";
import { appContext } from "../../utils/context";
import dashboardHandler from "./dashboard";
import publishHandler from "./publish";

const adminRoute = new Elysia({ prefix: "/partner" }).use(appContext).guard(
	{
		beforeHandle({ appContext }) {
			if (appContext.business == null || appContext.business <= 0) {
				return Response.error();
			}
		},
	},
	(app) => app.use(publishHandler).use(dashboardHandler),
);

export default adminRoute;
