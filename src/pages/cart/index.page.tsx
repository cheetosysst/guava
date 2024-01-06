import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { HeroIconTrash } from "../../components/icon";
import { db } from "../../database";
import { cartItem, product, user } from "../../database/schema";
import MainLayout from "../../layouts/main";
import { appContext } from "../../utils/context";

const cartPage = new Elysia()
	.use(appContext)
	.get("", async ({ appContext }) => {
		const userEntry = (
			await db
				.select()
				.from(user)
				.where(eq(user.username, appContext.user?.uid as string))
		)[0];
		const cartItemEntry = await Promise.all(
			(
				await db
					.select()
					.from(cartItem)
					.innerJoin(product, eq(product.id, cartItem.product))
					.where(eq(cartItem.user, userEntry.id))
			).map(async (item) => {
				const productEntry = await db
					.select()
					.from(product)
					.where(eq(product.id, item.cart_item.product as number));
				return { ...item, product: productEntry[0] };
			})
		);

		return (
			<MainLayout title="cart" appContext={appContext}>
				<div class="card bg-base-100 drop-shadow-md my-10 min-h-[70dvh]">
					<div class="card-body">
						<div class="overflow-x-auto">
							<table class="table">
								<thead>
									<tr>
										<th> </th>
										<th>Name</th>
										<th>Amount</th>
										<th>Remove</th>
									</tr>
								</thead>
								<tbody>
									{cartItemEntry.map((item, index) => (
										<tr id={`item${item.cart_item.id}`}>
											<th>{index + 1}</th>
											<td>{item.product.name}</td>
											<td>{item.cart_item.amount}</td>
											<td>
												<form
													hx-post="/api/cart/remove"
													hx-target={`#item${item.cart_item.id}`}
													hx-swap="delete"
												>
													<input
														type="hidden"
														name="entry"
														value={item.cart_item.id.toString()}
													/>
													<label class="btn btn-error">
														<HeroIconTrash
															className="w-6 h-6"
															name="remove"
														/>
														<input
															type="submit"
															value=""
														/>
													</label>
												</form>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<form
							class="flex justify-end"
							hx-post="/api/cart/clear"
						>
							<input
								type="submit"
								class="btn btn-primary"
								value="Submit"
							/>
						</form>
					</div>
				</div>
			</MainLayout>
		);
	});

export default cartPage;
