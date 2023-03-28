import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import {Button, Container, Flex, Title} from "@mantine/core";
import AddEcosystemModal from "@/components/add-ecosystem-modal";
import {useState} from "react";
import {Ecosystem} from "@prisma/client";

const EcosystemsPage: NextPageWithLayout = () => {
    const [addOpen, setAddOpen] = useState(false);
    const handleAddModalClose = () => {
        setAddOpen(false);
    }
    const mutate = () => {

    }

    const [ecosystems, setEcosystems] = useState<Ecosystem[]>([]);

    return (
        <Container>
            <Title>生态</Title>
            <Flex justify={"flex-end"}>
                <Button onClick={() => {
                    setAddOpen(true);
                }
                }>添加生态</Button>
            </Flex>
            <AddEcosystemModal open={addOpen} onClose={handleAddModalClose} onSuccess={mutate}></AddEcosystemModal>
        </Container>
    )
}

EcosystemsPage.getLayout = getLayout;

export default EcosystemsPage;
