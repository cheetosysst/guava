import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../../database";
import { cartItem } from "../../database/schema";

const removeHandler = new Elysia({ prefix: "/remove" }).post(
	"",
	async ({ body }) => {
		try {
			await db
				.delete(cartItem)
				.where(eq(cartItem.id, Number(body.entry)));
		} catch (err) {
			return (
				<span
					safe
					class="alert inline-block alert-error"
					// @ts-ignore
					_="on load wait 5s then transition opacity to 0 then remove me"
				>
					Failed to remove from cart.
				</span>
			);
		}
		return;
	},
	{
		body: t.Object({ entry: t.String() }),
		type: "formdata",
	}
);

export default removeHandler;
