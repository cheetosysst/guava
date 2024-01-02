import Elysia, { t } from "elysia";
import { db } from "../../database";
import { eq } from "drizzle-orm";
import { hash } from "../../utils/hash";
import { user } from "../../database/schema";
import jwt from "jsonwebtoken";
import cookie from "@elysiajs/cookie";

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
		const passwordHash = hash(password);
		if (passwordHash !== userEntry[0].passwordHash) {
			set.status = 401;
			return <span class="alert alert-error">Incorrect Password!</span>;
		}

		const newToken = jwt.sign(
			{
				userid: username,
			},
			Bun.env.JWT_SECRET as string,
			{ expiresIn: "1h" }
		);

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
