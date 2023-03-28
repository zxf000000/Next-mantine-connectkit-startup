import {NextPageWithLayout} from "@/pages/_app";
import {ActionIcon, Button, Container, Flex, Image, Modal, Space, Table, Title} from "@mantine/core";
import {getLayout} from "@/layouts/site-layout";
import {useEffect, useState} from "react";
import AddChainModal from "@/components/add-chain-modal";
import {Chain, Ecosystem, Job} from "@prisma/client";
import {useChains, useEcosystems, useJobs} from "@/utils/api/fetches";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {deleteEcosystem, deleteJob} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";
import AddEcosystemModal from "@/components/add-ecosystem-modal";
import LmTable from "@/components/lm-table";
import AddJobsModal from "@/components/add-jobs-modal";
import {JobModel} from "@/utils/data-types";

const JobsPage: NextPageWithLayout = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentItem, setCurrentItem] = useState<JobModel | null>(null);
    const [items, setItems] = useState<JobModel[]>([]);
    const {data, loading, mutate} = useJobs();
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
    const handleEditItem = (item: JobModel) => {
        setCurrentItem(item);
        setOpenModal(true);
    }

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const handleConfirmClose = () => {
        setConfirmOpen(false);
    }
    const handleDeleteItem = (item: JobModel) => {
        setCurrentItem(item);
        setConfirmOpen(true);
    }

    const handleConfirmDelete = async () => {
        setDeleting(true);
        try {
            await deleteJob(currentItem?.id || 0);
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
        <Title>任务</Title>
        <Flex justify={"flex-end"}>
            <Button onClick={handleTapAdd}>
                添加
            </Button>
        </Flex>
        <Space h={20}></Space>
        <LmTable withBorder>
            <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                    生态
                </th>
                <th>
                    网站
                </th>
                <th>
                    说明
                </th>
                <th>
                    网络
                </th>
                <th>
                    备注
                </th>
                <th>
                    是否完成
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
                            <Flex>
                                <Image src={item.ecosystem.logo} width={20} height={20}
                                       fit={"contain"}
                                ></Image>
                                {item.ecosystem.name}
                            </Flex>
                        </td>
                        <td>
                            {item.homepage}
                        </td>
                        <td>
                            {item.description}
                        </td>
                        <td>
                            {item.network.name}
                        </td>
                        <td>
                            {item.remarks}
                        </td>
                        <td>
                            false
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
        </LmTable>
        <Modal
            centered
            opened={confirmOpen} onClose={handleConfirmClose}
            title={"确定删除任务吗"}
        >
            <Flex justify={"flex-end"}>
                <Button color={"red"} onClick={handleConfirmDelete}>
                    确定
                </Button>
            </Flex>
        </Modal>
        <AddJobsModal
            open={openModal}
            onClose={handleCloseModal}
            onSuccess={handleCreated}
            job={currentItem} />
    </Container>
}

JobsPage.getLayout = getLayout;

export default JobsPage;
