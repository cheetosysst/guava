import Elysia from "elysia";
import { appContext } from "../../utils/context";
import businessAccountHandler from "./businessAccount";
import dashboardHandler from "./dashboard";

const adminRoute = new Elysia({ prefix: "/admin" }).use(appContext).guard(
	{
		beforeHandle({ appContext }) {
			if (appContext.role !== "admin") {
				return Response.error();
			}
		},
	},
	(app) => app.use(dashboardHandler).use(businessAccountHandler),
);

export default adminRoute;
