import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import { Container } from "@mantine/core";

const SanjiantaoPage: NextPageWithLayout = () => {
    return (
        <Container>SanjiantaoPage</Container>
    )
}

SanjiantaoPage.getLayout = getLayout;

export default SanjiantaoPage;
