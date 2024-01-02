import cookie from "@elysiajs/cookie";
import Elysia from "elysia";

const signoutHandler = new Elysia()
	.use(cookie)
	.post("signout", async ({ set, cookie, setCookie }) => {
		const authToken = cookie.guavaToken;

		if (authToken != null) {
			console.log("remove", authToken);
			// this api is broken
			// see https://github.com/elysiajs/elysia-cookie/issues/6
			// removeCookie("guavaToken");
			setCookie("guavaToken", "", {
				maxAge: 0,
				path: "/",
			});
		}

		set.status = 200;
		set.headers["HX-Redirect"] = "/";
		return "";
	});

export default signoutHandler;
