import Elysia from "elysia";
import { appContext } from "../../utils/context";
import addHandler from "./add";
import clearHandler from "./clear";
import removeHandler from "./remove";

const cartRoute = new Elysia({ prefix: "/cart" }).use(appContext).guard(
	{
		beforeHandle: ({ appContext }) => {
			if (appContext.user == null) {
				return Response.error();
			}
		},
	},
	(app) => app.use(addHandler).use(clearHandler).use(removeHandler),
);

export default cartRoute;
