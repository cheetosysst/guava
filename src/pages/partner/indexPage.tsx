import Elysia from "elysia";
import PartnerLayout from "../../layouts/partner";
import { appContext } from "../../utils/context";

const page = new Elysia().use(appContext).get("", ({ appContext }) => {
	return <PartnerLayout appContext={appContext}>partner</PartnerLayout>;
});

export default page;
