import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import {Button, Container, Flex} from "@mantine/core";
import AddWalletDialog from "@/components/add-wallet-dialog";
import {useState} from "react";

const WalletsPage: NextPageWithLayout = () => {
    const [showDialog, setShowDialog] = useState(false);
    const handleDialogClose = () => {
        setShowDialog(false);
    }
    return (
        <Container>
            <Flex align={"center"} justify={"flex-end"}>
                <Button onClick={() => {
                    setShowDialog(true);
                }}>
                    添加钱包
                </Button>
            </Flex>
            <AddWalletDialog show={showDialog} onClose={handleDialogClose}></AddWalletDialog>
        </Container>
    )
}

WalletsPage.getLayout = getLayout;

export default WalletsPage;
