import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import { Container } from "@mantine/core";

const WalletsPage: NextPageWithLayout = () => {
    return (
        <Container>Wallet</Container>
    )
}

WalletsPage.getLayout = getLayout;

export default WalletsPage;
