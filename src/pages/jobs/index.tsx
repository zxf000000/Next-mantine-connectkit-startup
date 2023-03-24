import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import { Container } from "@mantine/core";

const JobsPage: NextPageWithLayout = () => {
    return (
        <Container>JobsPage</Container>
    )
}

JobsPage.getLayout = getLayout;

export default JobsPage;
