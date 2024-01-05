import Elysia from "elysia";
import { appContext } from "../../utils/context";
import IndexPage from "./indexPage";

const partnerRoute = new Elysia({ prefix: "/partner" }).use(appContext).guard(
	{
		beforeHandle({ appContext }) {
			if (appContext.business == null || appContext.business <= 0) {
				return Response.error();
			}
		},
	},
	(app) => app.use(IndexPage),
);

export default partnerRoute;
