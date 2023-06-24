import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/layouts/site-layout";
import {ActionIcon, Button, Container, Flex, Modal, Space, Title} from "@mantine/core";
import LmTable from "@/components/lm-table";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import AddWalletDialog from "@/components/add-wallet-dialog";
import {useEffect, useState} from "react";
import {SocialAccout} from ".prisma/client";
import {useSocialAccounts} from "@/utils/api/fetches";
import AddSocialaccountModal from "@/components/add-socialaccount-modal";
import {deleteSocialAccount} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";

const AccountsPage: NextPageWithLayout = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [accounts, setAccounts] = useState<SocialAccout[]>([]);
    const {data, loading, mutate} = useSocialAccounts();
    const [currentAccount, setCurrentAccount] = useState<SocialAccout | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        if (data) {
            setAccounts(data);
        }
    }, [data]);
    const handleEditItem = (item: SocialAccout) => {
        setCurrentAccount(item);
        setShowDialog(true);
    }
    const handleDeleteItem = (item: SocialAccout) => {
        setCurrentAccount(item);
        setConfirmOpen(true);
    }
    const handleConfirmClose = () => {
        setConfirmOpen(false);
    }
    const handleConfirmDelete = async () => {
        try {
            await deleteSocialAccount(currentAccount?.id || 0);
            showSuccess("Deleted!");
            mutate();
            setConfirmOpen(false);
        } catch (e: any) {
            showError(e.message);
        }
    }
    const handleDialogClose = () => {
        setShowDialog(false)
    }

    return (
        <Container fluid>
            <Title>三件套</Title>
            <Flex align={"center"} justify={"flex-end"}>
                <Button onClick={() => {
                    setCurrentAccount(null);
                    setShowDialog(true);
                }}>
                    添加账户
                </Button>
            </Flex>
            <Space h={30}></Space>
            <LmTable
                sx={{
                    minWidth: "1000px"
                }}
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
                        电话号码
                    </th>
                    <th>
                        国家
                    </th>
                    <th>
                        密码
                    </th>
                    <th>
                        Google 邮箱
                    </th>
                    <th>
                        验证器
                    </th>
                    <th>
                        验证邮箱
                    </th>
                    <th>
                        推特
                    </th>
                    <th>
                        Discord token
                    </th>
                    <th>
                        用户名
                    </th>
                    <th>
                        IP
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    accounts.map((item) => {
                        return <tr key={item.id}>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.fp_number}
                            </td>
                            <td>
                                {item.phone}
                            </td>
                            <td>
                                {item.country}
                            </td>
                            <td>
                                {item.password}
                            </td>
                            <td>
                                {item.gmail}
                            </td>
                            <td>
                                {item.verifier}
                            </td>
                            <td>
                                {item.assist_email}
                            </td>
                            <td>
                                {item.twitter}
                            </td>
                            <td>
                                {item.discord_token}
                            </td>
                            <td>
                                {item.username}
                            </td>
                            <td>
                                {item.ip}
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
            <AddSocialaccountModal
                onCreated={mutate}
                show={showDialog}
                currentAccount={currentAccount}
                onClose={handleDialogClose}></AddSocialaccountModal>
            <Modal
                centered
                opened={confirmOpen} onClose={handleConfirmClose}
                title={"确定删除吗"}
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

AccountsPage.getLayout = getLayout;

export default AccountsPage;
