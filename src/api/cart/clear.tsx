import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { db } from "../../database";
import { cartItem, user } from "../../database/schema";
import { appContext } from "../../utils/context";

const clearHandler = new Elysia({ prefix: "/clear" })
	.use(appContext)
	.post("", async ({ appContext, set }) => {
		const userEntry = (
			await db
				.select()
				.from(user)
				.where(eq(user.username, appContext.user?.uid as string))
		)[0];
		await db.delete(cartItem).where(eq(cartItem.user, userEntry.id));
		set.headers["HX-Redirect"] = "/";
		return;
	});

export default clearHandler;
