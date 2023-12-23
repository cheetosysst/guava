import Elysia from "elysia";
import MainLayout from "../../layouts/main";

const Page = new Elysia().get("/", () => (
	<MainLayout title="User Profile">User Profile</MainLayout>
));
export default Page;
