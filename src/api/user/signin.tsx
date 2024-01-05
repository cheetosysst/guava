import cookie from "@elysiajs/cookie";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import jwt from "jsonwebtoken";
import { db } from "../../database";
import { businessAccount, user } from "../../database/schema";
import { hash } from "../../utils/hash";

const singinHandler = new Elysia().use(cookie()).post(
	"/signin",
	async ({ body: { username, password }, set, setCookie }) => {
		// TODO Fix user entry query under bun:sqlite
		// Possibly related to https://github.com/drizzle-team/drizzle-orm/pull/1276
		// const userEntry = await db.query.user.findFirst({
		// 	where: (users, { eq }) => eq(users.username, username),
		// });
		const userEntry = await db
			.select()
			.from(user)
			.leftJoin(businessAccount, eq(user.id, businessAccount.id)) // this left join doesn't parse correctly
			.where(eq(user.username, username));
		if (!userEntry.length) {
			set.status = 401;
			return (
				<span class="alert inline-block alert-error">
					User doesn't exist, please{" "}
					<a href="/user/signup" class="btn-link">
						sign up
					</a>{" "}
					first!
				</span>
			);
		}
		const businessAccountEntry = await db
			.select()
			.from(businessAccount)
			.where(eq(businessAccount.id, userEntry[0].users.id));

		const passwordHash = hash(password);
		if (passwordHash !== userEntry[0].users.passwordHash) {
			set.status = 401;
			return <span class="alert alert-error">Incorrect Password!</span>;
		}

		const payload = {
			uid: username,
			role: userEntry.at(0)?.users.role,
			bsn: businessAccountEntry.at(0)?.business || -1,
		};
		const newToken = jwt.sign(payload, Bun.env.JWT_SECRET as string, {
			expiresIn: "30d",
		});

		setCookie("guavaToken", newToken);

		set.status = 200;
		set.headers["HX-Redirect"] = "/";
		return "";
	},
	{
		body: t.Object({
			username: t.String(),
			password: t.String(),
		}),
		type: "formdata",
	}
);

export default singinHandler;
