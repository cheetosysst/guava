import Elysia from "elysia";
import MainLayout from "../../layouts/main";

const Page = new Elysia().get("/signout", () => {
	return (
		<MainLayout>
			<div hx-post="/api/user/signout" hx-trigger="load">
				Logging out...
			</div>
		</MainLayout>
	);
});
export default Page;
