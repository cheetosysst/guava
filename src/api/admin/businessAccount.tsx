import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../../database";
import { business, businessAccount, user } from "../../database/schema";

enum ResultRemove {
	USER_NOT_FOUND = 0,
	SUCCESS = 1,
	NOT_BUSINESS_ACCOUNT = 2,
}

const removeAccountHandler = new Elysia({ prefix: "/remove" }).post(
	"",
	async ({ body }) => {
		const result: ResultRemove = await db.transaction(async (tx) => {
			const userEntry = await tx
				.select()
				.from(user)
				.where(eq(user.username, body.username));

			if (userEntry.length <= 0) {
				return ResultRemove.USER_NOT_FOUND;
			}

			const businessAccountEntry = await tx
				.select()
				.from(businessAccount)
				.where(eq(businessAccount.id, userEntry[0].id));

			if (businessAccountEntry.length <= 0) {
				return ResultRemove.NOT_BUSINESS_ACCOUNT;
			}

			await tx
				.delete(businessAccount)
				.where(eq(businessAccount.id, userEntry[0].id));

			return ResultRemove.SUCCESS;
		});

		if (result === ResultRemove.USER_NOT_FOUND) {
			return (
				<span
					safe
					class="alert inline-block alert-error"
					// @ts-ignore
					_="on load wait 5s then transition opacity to 0 then remove me"
				>
					User "{body.username}" does not exist
				</span>
			);
		}

		if (result === ResultRemove.NOT_BUSINESS_ACCOUNT) {
			return (
				<span
					safe
					class="alert inline-block alert-error"
					// @ts-ignore
					_="on load wait 5s then transition opacity to 0 then remove me"
				>
					User "{body.username}" does not have a business account
				</span>
			);
		}

		return (
			<span
				safe
				class="alert inline-block alert-success"
				// @ts-ignore
				_="on load wait 5s then transition opacity to 0 then remove me"
			>
				User "{body.username}"'s business account removed
			</span>
		);
	},
	{
		body: t.Object({
			username: t.String(),
		}),
	}
);

const resultAdd = {
	NOT_FOUND: "NOT_FOUND",
	SUCCESS: "SUCCESS",
	IS_BUSINESS_ACCOUNT: "IS_BUSINESS_ACCOUNT",
	// BANNED: "BANNED",
	BUSINESS_ERROR: "BUSINESS_ERROR",
} as const;
type ResultAdd = keyof typeof resultAdd;

const addAccountHandler = new Elysia({ prefix: "/add" }).post(
	"",
	async ({ body }) => {
		const result: ResultAdd = await db.transaction(async (tx) => {
			const userEntry = await tx
				.select()
				.from(user)
				.where(eq(user.username, body.username));
			if (userEntry.length <= 0) {
				return "NOT_FOUND";
			}

			const businessAccountEntry = await tx
				.select()
				.from(businessAccount)
				.where(eq(businessAccount.id, userEntry[0].id));
			if (businessAccountEntry.length > 0) {
				return "IS_BUSINESS_ACCOUNT";
			}

			const businessEntry = await tx
				.select()
				.from(business)
				.where(eq(business.name, body.business));
			if (businessEntry.length <= 0) {
				return "BUSINESS_ERROR";
			}

			await tx.insert(businessAccount).values({
				id: userEntry.at(0)?.id,
				business: businessEntry.at(0)?.id,
			});

			return "SUCCESS";
		});

		if (result === "NOT_FOUND") {
			return (
				<span class="alert inline-block alert-error">
					User doesn't exist
				</span>
			);
		}

		if (result === "IS_BUSINESS_ACCOUNT") {
			return (
				<span class="alert inline-block alert-error">
					User is already a business account
				</span>
			);
		}

		if (result === "BUSINESS_ERROR") {
			return (
				<span class="alert inline-block alert-error">
					Business doesn't exist
				</span>
			);
		}

		return (
			<span safe class="alert inline-block alert-success">
				User {body.username} added!
			</span>
		);
	},
	{
		body: t.Object({
			username: t.String(),
			business: t.String(),
		}),
		type: "formdata",
	}
);

const businessAccountHandler = new Elysia({ prefix: "/businessAccount" })
	.get("", async () => {
		const businesses = await db.select().from(business);

		return (
			<div class="p-4 flex gap-4">
				<div class="card bg-base-100 w-96 drop-shadow-md">
					<form
						action=""
						hx-target="#addresult"
						hx-post="/api/admin/businessAccount/add"
						class="card-body"
						method="post"
					>
						<h1 class="card-title">Add business accounts</h1>
						<div class="" id="addresult" />
						<label class="form-control join w-full max-w-xs">
							<div class="label">
								<span class="label-text">Username</span>
							</div>
							<input
								class="input input-bordered"
								name="username"
								placeholder="ex: exampleuser"
							/>
						</label>
						<label>
							<div class="label">
								<span class="label-text">Business</span>
							</div>
							<select
								name="business"
								class="select select-bordered select-ghost w-full max-w-xs"
							>
								{businesses.map((item) => (
									<option safe value={item.name}>
										{item.name}
									</option>
								))}
							</select>
						</label>
						<input
							type="submit"
							class="btn btn-primary"
							value="submit"
						/>
					</form>
				</div>
				<div class="card bg-base-100 w-96 drop-shadow-md">
					<form
						action=""
						class="card-body"
						method="post"
						hx-post="/api/admin/businessAccount/remove"
						hx-target="#removeresult"
					>
						<h1 class="card-title">Remove business accounts</h1>
						<div class="" id="removeresult" />

						<label class="form-control join w-full max-w-xs">
							<div class="label">
								<span class="label-text">Username</span>
							</div>
							<div class="join">
								<input
									class="input input-bordered join-item"
									name="username"
									placeholder="ex: exampleuser"
								/>
								<input
									type="submit"
									class="btn btn-primary join-item rounded-r-full"
									value="submit"
								/>
							</div>
						</label>
					</form>
				</div>
			</div>
		);
	})
	.use(addAccountHandler)
	.use(removeAccountHandler);

export default businessAccountHandler;
