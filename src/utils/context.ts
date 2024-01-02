import cookie from "@elysiajs/cookie";
import Elysia from "elysia";
import jwt from "jsonwebtoken";

export type AuthToken = { userid: string; iat: number; exp: number };

export interface AppContext {
	user: AuthToken | undefined;
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

		if (typeof authToken === "string" && authToken.length === 0) {
			removeCookie("guavaToken");
		}

		const context = {
			user,
		} satisfies AppContext;

		return { appContext: context };
	});
