import Elysia from "elysia";
import AdminLayout from "../../layouts/admin";
import { appContext } from "../../utils/context";

const page = new Elysia().use(appContext).get("/", ({ appContext }) => {
	return (
		<AdminLayout
			className="flex"
			appContext={appContext}
			title="admin panel"
		>
			dashboard!
		</AdminLayout>
	);
});

export default page;
