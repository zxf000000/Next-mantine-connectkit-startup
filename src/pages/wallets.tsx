import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import {ActionIcon, Button, Container, Flex, Modal, Space, Table, Title} from "@mantine/core";
import AddWalletDialog from "@/components/add-wallet-dialog";
import {useEffect, useState} from "react";
import {useWallets} from "@/utils/api/fetches";
import {IconDropletCancel, IconEdit, IconTrash} from "@tabler/icons-react";
import {Wallet} from "@/utils/data-types";
import {showError, showSuccess} from "@/notification";
import {deleteWallet} from "@/utils/api/posts";
import LmTable from "@/components/lm-table";

const WalletsPage: NextPageWithLayout = () => {
    const [showDialog, setShowDialog] = useState(false);
    const handleDialogClose = () => {
        setCurrentWallet(null);
        setShowDialog(false);
    }

    const {data, loading, mutate } = useWallets();
    const [wallets, setWallets] = useState<Wallet[]>([]);
    useEffect(() => {
        if (data) {
            setWallets(data);
        } else {
            setWallets([]);
        }
    },[data]);

    const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
    const handleEditItem = (item: Wallet) => {
        setCurrentWallet(item);
        setShowDialog(true);
    }

    const [confirmOpen, setConfirmOpen] = useState(false);
    const handleConfirmClose = () => {
        setConfirmOpen(false);
    }
    const [deleting, setDeleting] = useState(false);
    const handleDeleteItem = (wallet: Wallet) => {
        setCurrentWallet(wallet);
        setConfirmOpen(true);
    }

    const handleConfirmDelete = async () => {
        setDeleting(true);
        try {
            await deleteWallet(currentWallet?.id || 0);
            setConfirmOpen(false);
            setDeleting(false);
            showSuccess("Success!");
            mutate();
        } catch (e: any) {
            showError(e.message);
            setDeleting(false);
        }
    }

    return (
        <Container fluid>
            <Title>钱包</Title>
            <Flex align={"center"} justify={"flex-end"}>
                <Button onClick={() => {
                    setCurrentWallet(null);
                    setShowDialog(true);
                }}>
                    添加钱包
                </Button>
            </Flex>
            <Space h={30}></Space>
            <LmTable
                highlightOnHover={true} withBorder withColumnBorders>
                <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        浏览器指纹
                    </th>
                    <th>
                        地址
                    </th>
                    <th>
                        助记词
                    </th>
                    <th>
                        私钥
                    </th>
                    <th>
                        小狐狸密码
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    wallets.map((item) => {
                        return <tr key={item.id}>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.fp_number}
                            </td>
                            <td>
                                {item.address}
                            </td>
                            <td>
                                {item.mnemonic}
                            </td>
                            <td>
                                {item.p_key}
                            </td>
                            <td>
                                {item.mm_pwd}
                            </td>
                            <td>
                                <Flex gap={"sm"}>
                                    <ActionIcon onClick={() => {
                                        handleEditItem(item)}
                                    }>
                                        <IconEdit color={"green"}></IconEdit>
                                    </ActionIcon>
                                    <ActionIcon onClick={() => {
                                        handleDeleteItem(item)}
                                    }>
                                        <IconTrash color={"red"}></IconTrash>
                                    </ActionIcon>
                                </Flex>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </LmTable>
            <AddWalletDialog
                onCreated={mutate}
                show={showDialog}
                wallet={currentWallet}
                onClose={handleDialogClose}></AddWalletDialog>
            <Modal
                centered
                opened={confirmOpen} onClose={handleConfirmClose}
                   title={"确定删除钱包吗"}
            >
                <Flex justify={"flex-end"}>
                    <Button color={"red"} onClick={handleConfirmDelete}>
                        确定
                    </Button>
                </Flex>
            </Modal>
        </Container>
    )
}

WalletsPage.getLayout = getLayout;

export default WalletsPage;
