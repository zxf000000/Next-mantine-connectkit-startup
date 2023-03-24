import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import { Container } from "@mantine/core";

const EcosystemPage: NextPageWithLayout = () => {
    return (
        <Container>EcosystemPage</Container>
    )
}

EcosystemPage.getLayout = getLayout;

export default EcosystemPage;
