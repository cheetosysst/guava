import Elysia from "elysia";
import AdminLayout from "../../layouts/admin";

const page = new Elysia().get("/", () => {
	return (
		<AdminLayout className="flex" title="admin panel">
			dashboard!
		</AdminLayout>
	);
});

export default page;
