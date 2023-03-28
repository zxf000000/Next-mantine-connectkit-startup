import {NextPageWithLayout} from "@/pages/_app";
import {ActionIcon, Button, Container, Flex, Modal, Space, Table, Title} from "@mantine/core";
import {getLayout} from "@/layouts/site-layout";
import {useEffect, useState} from "react";
import AddChainModal from "@/components/add-chain-modal";
import {Chain} from "@prisma/client";
import {useChains} from "@/utils/api/fetches";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {Wallet} from "@/utils/data-types";
import {deleteChain, deleteWallet} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";

const ChainsPage: NextPageWithLayout = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentChain, setCurrentChain] = useState<Chain | null>(null);
    const [chains, setChains] = useState<Chain[]>([]);
    const {data, loading, mutate} = useChains();
    useEffect(() => {
        if (data) {
            setChains(data);
        }
    }, [data]);
    const handleCloseModal = () => {
        setOpenModal(false);
    }
    const handleCreated = () => {
        mutate()
    }
    const handleTapAdd = () => {
        setCurrentChain(null);
        setOpenModal(true);
    }
    const handleEditItem = (item: Chain) => {
        setCurrentChain(item);
        setOpenModal(true);
    }

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const handleConfirmClose = () => {
        setConfirmOpen(false);
    }
    const handleDeleteItem = (chain: Chain) => {
        setCurrentChain(chain);
        setConfirmOpen(true);
    }

    const handleConfirmDelete = async () => {
        setDeleting(true);
        try {
            await deleteChain(currentChain?.id || 0);
            setConfirmOpen(false);
            setDeleting(false);
            showSuccess("Success!");
            mutate();
        } catch (e: any) {
            showError(e.message);
            setDeleting(false);
        }
    }

    return <Container>
        <Title>Chains</Title>
        <Flex justify={"flex-end"}>
            <Button onClick={handleTapAdd}>
                添加
            </Button>
        </Flex>
        <Space h={20}></Space>
        <Table withBorder>
            <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                    名称
                </th>
                <th>
                    ChainID
                </th>
                <th>
                    Rpc
                </th>
                <th>
                    浏览器
                </th>
                <th>
                    操作
                </th>
            </tr>
            </thead>
            <tbody>
            {
                chains.map((item, index) => (
                    <tr key={index}>
                        <td>
                            {item.id}
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.chainId}
                        </td>
                        <td>
                            {item.rpc}
                        </td>
                        <td>
                            {item.explore}
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
                ))
            }
            </tbody>
        </Table>
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
        <AddChainModal show={openModal} onClose={handleCloseModal} onCreated={handleCreated} chain={currentChain} />
    </Container>
}

ChainsPage.getLayout = getLayout;

export default ChainsPage;
