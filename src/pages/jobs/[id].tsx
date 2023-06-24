import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import {
    ActionIcon,
    Button,
    Card,
    Checkbox,
    Container,
    Flex,
    Image,
    List, Modal,
    Paper,
    Space,
    Stack,
    Switch, Text, Title
} from "@mantine/core";
import {useEffect, useState} from "react";
import {JobModel} from "@/utils/data-types";
import {useJob, useWalletsWithJob} from "@/utils/api/fetches";
import { useRouter } from "next/router";
import {Prisma, Wallet} from "@prisma/client";
import LmTable from "@/components/lm-table";
import {IconArrowAutofitLeft, IconArrowBack, IconArrowLeft} from "@tabler/icons-react";
import Link from "next/link";
import ModelName = Prisma.ModelName;
import {showError, showSuccess} from "@/notification";
import {markCompleteJobWithWallet} from "@/utils/api/posts";

type WalletWithComplete = Wallet & {
    complete: boolean
}

const JobDetailPage: NextPageWithLayout = () => {
    const router = useRouter();
    const {id} = router.query;
    const [job, setJob] = useState<JobModel | null>(null);
    const {data, loading} = useJob(Number(id));
    const {data: walletData, loading: loadingWallets, mutate} = useWalletsWithJob(Number(id));
    const [wallets, setWallets] = useState<WalletWithComplete[]>([]);
    useEffect(() => {
        if (data) {
            setJob(data);
        }
        if (walletData) {
            setWallets(walletData);
        }
    }, [data, walletData]);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const handleConfirmClose = () => {
        setConfirmOpen(false);
    }

    const [currentWallet, setCurrentWallet] = useState<WalletWithComplete | null>(null);

    const handleComplete = (wallet: WalletWithComplete) => {
        if (wallet.complete) {
            return;
        }
        setCurrentWallet(wallet);
        setConfirmOpen(true);
    }
    const [actionLoading, setActionLoading] = useState(false);
    const handleConfirm = async () => {
        if (job && currentWallet) {
            try {
                setActionLoading(true);
                const res = await markCompleteJobWithWallet(job.id, currentWallet.id);
                console.log(res);
                setActionLoading(false);
                mutate();
            } catch (e: any) {
                setActionLoading(false);
                showError(e.message);
            }
        }

    }

    return (
        <Container fluid>
            <ActionIcon size={"lg"} onClick={() => {
                router.back();
            }}>
                <IconArrowLeft></IconArrowLeft>
            </ActionIcon>
            <Space h={20}></Space>
            <Paper p={"md"} mb={"lg"}>
                <Stack>
                    <Flex gap={"md"}>
                        <Text w={100}>任务编号: </Text>
                        <Text color={"white"}>{job?.id}</Text>
                    </Flex>
                    <Flex gap={"md"}>
                        <Text w={100}>生态: </Text>
                        <Text color={"white"}>{job?.ecosystem.name}</Text>
                    </Flex>
                    <Flex gap={"md"}>
                        <Text w={100}>任务网站: </Text>
                        <Link href={job?.homepage || ""} target={"_blank"}>
                            {job?.homepage}
                        </Link>
                    </Flex>
                    <Flex gap={"md"}>
                        <Text w={100}>网络: </Text>
                        <Text color={"white"}>{job?.network.name}</Text>
                    </Flex>
                    <Flex gap={"md"}>
                        <Text w={100} sx={{
                            flexShrink: 0,
                        }}>任务说明: </Text>
                        <Text color={"white"} sx={{
                            wordBreak: "break-all",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            background: "transparent"
                        }}>{job?.description}</Text>
                    </Flex>
                    <Flex gap={"md"}>
                        <Text w={100} sx={{
                            flexShrink: 0,
                        }}>备注: </Text>
                        <Text color={"white"} sx={{
                            wordBreak: "break-all",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            background: "transparent"
                        }}>{job?.remarks}</Text>
                    </Flex>

                </Stack>
            </Paper>
            <LmTable withBorder>
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
                        是否完成
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    wallets.map((item, index) => (
                        <tr key={index}>
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
                                <Switch checked={item.complete} onClick={() => {
                                    handleComplete(item);
                                }
                                }></Switch>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </LmTable>
            <Modal opened={confirmOpen} onClose={handleConfirmClose}
                   title={"确认标记完成吗?"}
                   centered
            >
                <Text>{currentWallet?.address}</Text>
                <Flex justify={"flex-end"}>
                    <Button onClick={handleConfirm} loading={actionLoading}>
                        确定
                    </Button>
                </Flex>
            </Modal>
        </Container>
    )
}

JobDetailPage.getLayout = getLayout;

export default JobDetailPage;
