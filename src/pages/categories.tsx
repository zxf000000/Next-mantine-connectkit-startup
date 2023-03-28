import {NextPageWithLayout} from "@/pages/_app";
import {ActionIcon, Button, Container, Flex, Modal, Space, Table, Title} from "@mantine/core";
import {getLayout} from "@/layouts/site-layout";
import {useEffect, useState} from "react";
import AddChainModal from "@/components/add-chain-modal";
import {Category, Chain} from "@prisma/client";
import {useChains, useCategories} from "@/utils/api/fetches";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {showError, showSuccess} from "@/notification";
import { deleteCategory } from "@/utils/api/posts";
import AddCategoryModal from "@/components/add-category-modal";

const ChainsPage: NextPageWithLayout = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentChain, setCurrentChain] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const {data, loading, mutate} = useCategories();
    useEffect(() => {
        if (data) {
            setCategories(data);
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
    const handleEditItem = (item: Category) => {
        setCurrentChain(item);
        setOpenModal(true);
    }

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const handleConfirmClose = () => {
        setConfirmOpen(false);
    }
    const handleDeleteItem = (chain: Category) => {
        setCurrentChain(chain);
        setConfirmOpen(true);
    }

    const handleConfirmDelete = async () => {
        setDeleting(true);
        try {
            await deleteCategory(currentChain?.id || 0);
            setConfirmOpen(false);
            setDeleting(false);
            showSuccess("Success!");
            mutate();
        } catch (e: any) {
            showError(e.message);
            setDeleting(false);
        }
    }

    return <Container fluid>
        <Title>类别</Title>
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
                    说明
                </th>
                <th>
                    操作
                </th>
            </tr>
            </thead>
            <tbody>
            {
                categories.map((item, index) => (
                    <tr key={index}>
                        <td>
                            {item.id}
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.description}
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
        <AddCategoryModal show={openModal} onClose={handleCloseModal} onCreated={handleCreated}
                       category={currentChain} />
    </Container>
}

ChainsPage.getLayout = getLayout;

export default ChainsPage;
