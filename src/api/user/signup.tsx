import { Elysia, t } from "elysia";
import { db } from "../../database";
import { user, userProfile } from "../../database/schema";
import { eq } from "drizzle-orm";
import { hash } from "../../utils/hash";

const singupHandler = new Elysia().post(
	"/signup",
	async ({ body: { email, username, password }, set }) => {
		const exists = await db.transaction(async (tx) => {
			const existingUser = await tx
				.select()
				.from(user)
				.where(eq(user.username, username));
			const existingEmail = await tx
				.select()
				.from(userProfile)
				.where(eq(userProfile.email, email));
			return { email: existingEmail.length, user: existingUser.length };
		});

		if (exists.email) {
			set.status = 401;
			return <span class="alert alert-error">Email already used</span>;
		}

		if (exists.user) {
			set.status = 401;
			return <span class="alert alert-error">User already exists</span>;
		}

		const passwordHash = hash(password);
		signup(username, email, passwordHash);

		set.status = 200;
		set.headers["HX-Redirect"] = "/user/signin";
		return "";
	},
	{
		body: t.Object({
			email: t.String(),
			username: t.String(),
			password: t.String(),
		}),
		type: "formdata",
	},
);

async function signup(username: string, email: string, passwordHash: string) {
	db.transaction(async (tx) => {
		await tx.insert(user).values({
			username,
			passwordHash,
		});
		const userEntry = await tx.query.user.findFirst({
			where: eq(user.username, username),
		});
		if (!userEntry) {
			tx.rollback();
			return;
		}
		await tx.insert(userProfile).values({
			id: userEntry.id,
			email: email,
		});
	});
}

export default singupHandler;
