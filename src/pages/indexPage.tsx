import Elysia from "elysia";
import MainLayout from "../layouts/main";
import Navbar from "../components/navbar";

const Page = new Elysia().get("/", () => (
	<MainLayout>
		<Navbar />
	</MainLayout>
));
export default Page;
