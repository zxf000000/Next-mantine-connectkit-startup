import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import { Container } from "@mantine/core";

const AccountsPage: NextPageWithLayout = () => {
    return (
        <Container>AccountsPage</Container>
    )
}

AccountsPage.getLayout = getLayout;

export default AccountsPage;
