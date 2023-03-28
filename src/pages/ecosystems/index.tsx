import {NextPageWithLayout} from "@/pages/_app";
import {ActionIcon, Button, Container, Flex, Modal, Space, Table, Title} from "@mantine/core";
import {getLayout} from "@/layouts/site-layout";
import {useEffect, useState} from "react";
import AddChainModal from "@/components/add-chain-modal";
import {Chain, Ecosystem} from "@prisma/client";
import {useChains, useEcosystems} from "@/utils/api/fetches";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {deleteEcosystem} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";
import AddEcosystemModal from "@/components/add-ecosystem-modal";

const ChainsPage: NextPageWithLayout = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentItem, setCurrentItem] = useState<Ecosystem | null>(null);
    const [items, setItems] = useState<Ecosystem[]>([]);
    const {data, loading, mutate} = useEcosystems();
    useEffect(() => {
        if (data) {
            setItems(data);
        }
    }, [data]);
    const handleCloseModal = () => {
        setOpenModal(false);
    }
    const handleCreated = () => {
        mutate()
    }
    const handleTapAdd = () => {
        setCurrentItem(null);
        setOpenModal(true);
    }
    const handleEditItem = (item: Ecosystem) => {
        setCurrentItem(item);
        setOpenModal(true);
    }

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const handleConfirmClose = () => {
        setConfirmOpen(false);
    }
    const handleDeleteItem = (item: Ecosystem) => {
        setCurrentItem(item);
        setConfirmOpen(true);
    }

    const handleConfirmDelete = async () => {
        setDeleting(true);
        try {
            await deleteEcosystem(currentItem?.id || 0);
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
        <Title>生态</Title>
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
                    Logo
                </th>
                <th>
                    官网
                </th>
                <th>
                    链
                </th>
                <th>
                    板块
                </th>
                <th>
                    是否发币
                </th>
                <th>
                    推特粉丝
                </th>
                <th>
                    项目介绍
                </th>
                <th>
                    融资
                </th>
                <th>
                    交互建议
                </th>
                <th>
                    操作
                </th>
            </tr>
            </thead>
            <tbody>
            {
                 items.map((item, index) => (
                    <tr key={index}>
                        <td>
                            {item.id}
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            <img width={30} height={30}
                                 src={item.logo}
                                 alt={item.name}
                            />
                        </td>
                        <td>
                            {item.homepage}
                        </td>
                        <td>
                            {item.chainId}
                        </td>
                        <td>
                            {item.category_id}
                        </td>
                        <td>
                            {item.is_ico ? "是" : "否"}
                        </td>
                        <td>
                            {item.twitter_fans}
                        </td>
                        <td>
                            {item.description}
                        </td>
                        <td>
                            {item.financing}
                        </td>
                        <td>
                            {item.suggestion}
                        </td>
                        <td>
                            <Flex gap={"sm"}>
                                <ActionIcon onClick={() => {
                                    setCurrentItem(item);
                                    handleEditItem(item)}
                                }>
                                    <IconEdit color={"green"}></IconEdit>
                                </ActionIcon>
                                <ActionIcon onClick={() => {
                                    setCurrentItem(item);
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
        <AddEcosystemModal
            open={openModal}
            onClose={handleCloseModal}
            onSuccess={handleCreated}
            ecosystem={currentItem} />
    </Container>
}

ChainsPage.getLayout = getLayout;

export default ChainsPage;
