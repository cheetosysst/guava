import Elysia from "elysia";
import MainLayout from "../../layouts/main";
import { appContext } from "../../utils/context";

const Page = new Elysia().use(appContext).get("/", ({ appContext }) => {
	console.log("page", appContext);
	return (
		<MainLayout appContext={appContext} title="User Profile">
			User Profile
		</MainLayout>
	);
});
export default Page;
