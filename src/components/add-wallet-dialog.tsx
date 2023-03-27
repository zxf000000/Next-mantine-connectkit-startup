import {Button, Dialog, Flex, Modal, TextInput, Title} from "@mantine/core";
import {DialogHeader} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {ChangeEvent, useState} from "react";
import {addWallet} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";

type Props = {
    show: boolean,
    onClose: () => void;
}
const AddWalletDialog = ({show, onClose}: Props) => {
    const [fpNumber, setFpNumber] = useState("");
    const handleFpNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFpNumber(e.target.value);
    }
    const [address, setAddress] = useState("");
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }
    const [mnemonic, setMnemonic] = useState("");
    const handleMnemonicChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMnemonic(e.target.value);
    }
    const [pKey, setPkey] = useState("");
    const handlePkeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPkey(e.target.value);
    }
    const [mmPwd, setMmPwd] = useState("");
    const handleMmPwdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMmPwd(e.target.value);
    }

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await addWallet({
                address: address,
                fp_number: fpNumber,
                mnemonic: mnemonic,
                mm_pwd: mmPwd,
                p_key: pKey,
            })
            showSuccess("添加成功!");
            setLoading(false);
        } catch (e: any) {
            setLoading(false);
            showError(e.message);
        }
    }

    return (
        <Modal opened={show} onClose={onClose} title={"添加钱包"} size={"md"}>
            <Flex direction={"column"} align={"stretch"} gap={"xs"}>
                <Flex align={"center"} justify={"space-between"}>
                    <TextInput placeholder={"指纹"} value={fpNumber} onChange={handleFpNumberChange}>
                    </TextInput>
                    <TextInput placeholder={"地址"} value={address} onChange={handleAddressChange}>
                    </TextInput>
                </Flex>
                <TextInput placeholder={"助记词"} value={mnemonic} onChange={handleMnemonicChange}>
                </TextInput>
                <TextInput placeholder={"私钥"} value={pKey} onChange={handlePkeyChange}>
                </TextInput>
                <TextInput placeholder={"小狐狸密码"} value={mmPwd} onChange={handleMmPwdChange}>
                </TextInput>
                <Button onClick={handleSubmit} loading={loading}>
                    提交
                </Button>
            </Flex>
        </Modal>
    )
}

export default AddWalletDialog;
