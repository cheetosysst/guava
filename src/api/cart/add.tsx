import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../../database";
import { cartItem, user } from "../../database/schema";
import { appContext } from "../../utils/context";

const addHandler = new Elysia({ prefix: "/add" }).use(appContext).post(
	"",
	async ({ appContext, body }) => {
		try {
			const userEntry = (
				await db
					.select()
					.from(user)
					.where(eq(user.username, appContext.user?.uid as string))
			)[0];
			await db.insert(cartItem).values({
				product: Number(body.product),
				amount: Number(body.amount),
				user: userEntry.id,
			});
		} catch (err) {
			return (
				<span
					class="alert inline-block alert-error"
					// @ts-ignore
					_="on load wait 5s then transition opacity to 0 then remove me"
				>
					Failed adding product to cart.
				</span>
			);
		}
		return (
			<span
				class="alert inline-block alert-success"
				// @ts-ignore
				_="on load wait 5s then transition opacity to 0 then remove me"
			>
				Product added to cart.
			</span>
		);
	},
	{
		body: t.Object({ product: t.String(), amount: t.String() }),
		type: "formdata",
	}
);

export default addHandler;
