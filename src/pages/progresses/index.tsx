import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import { Container } from "@mantine/core";

const ProgressesPage: NextPageWithLayout = () => {
    return (
        <Container>ProgressesPage</Container>
    )
}

ProgressesPage.getLayout = getLayout;

export default ProgressesPage;
