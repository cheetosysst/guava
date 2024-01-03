import Elysia from "elysia";

const businessAccountHandler = new Elysia({ prefix: "/businessAccount" }).get(
	"",
	() => {
		return <>business Account</>;
	}
);

export default businessAccountHandler;
