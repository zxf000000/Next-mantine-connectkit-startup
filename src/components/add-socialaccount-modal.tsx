import {SocialAccout} from ".prisma/client";
import {Button, Flex, Grid, Modal, SimpleGrid, TextInput, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {addSocialAccount, updateSocialAccount} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";

type Props = {
    show: boolean,
    currentAccount: SocialAccout | null,
    onClose: () => void;
    onCreated: () => void;
}
const AddSocialaccountModal = ({show, currentAccount, onClose, onCreated}: Props) => {
    const [fpNumber, setFpnumber] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [gmail, setGmail] = useState("");
    const [verifier, setVerifier] = useState("");
    const [assignedEmail, setAssignedEmail] = useState("");
    const [twitter, setTwitter] = useState("");
    const [discordToken, setDiscordToken] = useState("");
    const [username, setUsername] = useState("");
    const [ip, setIp] = useState("");
    const [loading, setLoading] = useState(false);
    const handleEdit = async () => {
        try {
            setLoading(true);
            const res = await updateSocialAccount({
                id: currentAccount!.id,
                fp_number: fpNumber,
                phone: phone,
                country: country,
                password: password,
                gmail: gmail,
                verifier: verifier,
                assist_email: assignedEmail,
                twitter: twitter,
                discord_token: discordToken,
                username: username,
                ip: ip,
            });
            showSuccess("Deleted!");
            onCreated();
            onClose();
        } catch (e: any) {
            showError(e.message);
        }
    }
    const handleCreate = async () => {
        try {
            setLoading(true);
            const res = await addSocialAccount({
                fp_number: fpNumber,
                phone: phone,
                country: country,
                password: password,
                gmail: gmail,
                verifier: verifier,
                assist_email: assignedEmail,
                twitter: twitter,
                discord_token: discordToken,
                username: username,
                ip: ip,
            });
            showSuccess("Success!");
            onClose();
            onCreated();
        } catch (e: any) {
            showError(e.message);
        }

    }
    const handleConfirm = () => {
        if (currentAccount) {
            handleEdit();
        } else {
            handleCreate();
        }
    }

    useEffect(() => {
        if (currentAccount) {
            setFpnumber(currentAccount.fp_number || "");
            setPhone(currentAccount.phone || "");
            setCountry(currentAccount.country || "");
            setPassword(currentAccount.password || "");
            setGmail(currentAccount.gmail || "");
            setVerifier(currentAccount.verifier || "");
            setAssignedEmail(currentAccount.assist_email || "");
            setTwitter(currentAccount.twitter || "");
            setDiscordToken(currentAccount.discord_token || "");
            setUsername(currentAccount.username || "");
            setIp(currentAccount.ip || "");
        }
    }, [currentAccount]);

    useEffect(() => {
        if (!show) {
            setLoading(false);
            setFpnumber("");
            setPassword("");
            setPhone("");
            setCountry("");
            setGmail("");
            setVerifier("");
            setAssignedEmail("");
            setTwitter("");
            setDiscordToken("");
            setUsername("");
            setIp("");
        }
    }, [show]);

    return (
        <Modal opened={show} onClose={onClose} centered title={"三件套"}>
            <Flex direction={"column"} gap={"xs"}>
                <SimpleGrid cols={2}>
                    <TextInput label={"浏览器指纹"} value={fpNumber}
                               onChange={(e) => {
                                   setFpnumber(e.target.value)
                               }}
                    ></TextInput>


                    <TextInput label={"电话"} value={phone}
                               onChange={(e) => {
                                   setPhone(e.target.value)
                               }}
                    ></TextInput>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                    <TextInput label={"国家"} value={country} onChange={
                        (e) => {
                            setCountry(e.target.value)
                        }
                    }></TextInput>
                    <TextInput label={"密码"} value={password} onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    }></TextInput>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                    <TextInput label={"Google邮箱"} value={gmail} onChange={
                        (e) => {
                            setGmail(e.target.value)
                        }
                    }></TextInput>
                    <TextInput label={"验证器"} value={ verifier} onChange={
                        (e) => {
                            setVerifier(e.target.value)
                        }
                    }></TextInput>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                    <TextInput label={"验证邮箱"} value={ assignedEmail} onChange={
                        (e) => {
                            setAssignedEmail(e.target.value)
                        }
                    }></TextInput>
                    <TextInput label={"推特"} value={ twitter} onChange={
                        (e) => {
                            setTwitter(e.target.value)
                        }
                    }></TextInput>
                </SimpleGrid>
                <SimpleGrid cols={2}>
                    <TextInput label={"Discord Token"} value={ discordToken} onChange={
                        (e) => {
                            setDiscordToken(e.target.value)
                        }
                    }></TextInput>
                    <TextInput label={"用户名"} value={username} onChange={
                        (e) => {
                            setUsername(e.target.value)
                        }
                    }></TextInput>
                </SimpleGrid>
                <SimpleGrid cols={1}>
                    <TextInput label={"IP"} value={ ip} onChange={
                        (e) => {
                            setIp(e.target.value)
                        }
                    }></TextInput>
                </SimpleGrid>
                <Button onClick={handleConfirm} loading={loading}>
                    {
                        currentAccount ?
                            "编辑" : "添加"
                    }
                </Button>
            </Flex>
        </Modal>
    )
}

export default AddSocialaccountModal;
