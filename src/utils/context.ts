import cookie from "@elysiajs/cookie";
import Elysia from "elysia";
import jwt from "jsonwebtoken";

export type AuthToken = {
	uid: string;
	iat: number;
	exp: number;
	role: "normal" | "admin";
	bsn: string;
};

export interface AppContext {
	user: AuthToken | undefined;
	business: number | undefined;
	role: "admin" | "normal";
}

export const appContext = new Elysia()
	.use(cookie())
	.derive(({ cookie, removeCookie }) => {
		const authToken = cookie.guavaToken;
		const user = (
			authToken != null
				? jwt.verify(authToken as string, Bun.env.JWT_SECRET as string)
				: undefined
		) as AuthToken | undefined; // TODO put this type somewhere else

		if (
			(typeof authToken === "string" && authToken.length === 0) ||
			typeof user === "undefined"
		) {
			removeCookie("guavaToken");
			return {
				appContext: {
					user: undefined,
					business: undefined,
					role: "normal",
				} satisfies AppContext,
			};
		}

		const business = Number(user.bsn);
		const role = user.role;

		const context = {
			user,
			business,
			role,
		} satisfies AppContext;

		return { appContext: context };
	});
