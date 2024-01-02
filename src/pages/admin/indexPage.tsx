import Elysia from "elysia";
import MainLayout from "../../layouts/main";

const page = new Elysia().get("/", () => {
	return <MainLayout>admin</MainLayout>;
});

export default page;
