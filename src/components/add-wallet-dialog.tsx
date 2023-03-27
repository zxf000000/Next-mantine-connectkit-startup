import {Button, Dialog, Flex, Modal, TextInput, Title} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import {addWallet, updateWallet} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";
import {Wallet} from "@/utils/data-types";

type Props = {
    show: boolean,
    onClose: () => void;
    onCreated: () => void;
    wallet: Wallet | null,
}
const AddWalletDialog = ({show, onClose, onCreated, wallet}: Props) => {
    const [fpNumber, setFpNumber] = useState(wallet?.fp_number || "");
    const handleFpNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFpNumber(e.target.value);
    }
    const [address, setAddress] = useState(wallet?.address || "");
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }
    const [mnemonic, setMnemonic] = useState(wallet?.mnemonic || "");
    const handleMnemonicChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMnemonic(e.target.value);
    }
    const [pKey, setPkey] = useState(wallet?.p_key || "");
    const handlePkeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPkey(e.target.value);
    }
    const [mmPwd, setMmPwd] = useState(wallet?.mm_pwd || "");
    const handleMmPwdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMmPwd(e.target.value);
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("wallet ", wallet);
        if (wallet) {
            setFpNumber(wallet.fp_number);
            setAddress(wallet.address);
            setMnemonic(wallet.mnemonic);
            setPkey(wallet.p_key);
            setMmPwd(wallet.mm_pwd);
        } else {
            setFpNumber("");
            setAddress("");
            setMnemonic("");
            setPkey("");
            setMmPwd("");
        }
    }, [wallet]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (wallet) {
                const res = await updateWallet({
                    address: address,
                    fp_number: fpNumber,
                    mnemonic: mnemonic,
                    mm_pwd: mmPwd,
                    p_key: pKey,
                    id: wallet.id
                })
            } else {
                const res = await addWallet({
                    address: address,
                    fp_number: fpNumber,
                    mnemonic: mnemonic,
                    mm_pwd: mmPwd,
                    p_key: pKey,
                });
                showSuccess("添加成功!");
            }
            setLoading(false);
            onCreated();
            onClose();
        } catch (e: any) {
            setLoading(false);
            showError(e.message);
        }
    }

    useEffect(() => {
        if (!show) {
            setFpNumber("");
            setAddress("");
            setMnemonic("");
            setPkey("");
            setMmPwd("");
        }
    }, [show]);

    return (
        <Modal centered opened={show} onClose={onClose} title={"添加钱包"} size={"md"}>
            <Flex direction={"column"} align={"stretch"} gap={"xs"}>
                <Flex align={"center"} justify={"space-between"}>
                    <TextInput
                        label={"浏览器指纹"}
                        placeholder={"指纹"} value={fpNumber} onChange={handleFpNumberChange}>
                    </TextInput>
                    <TextInput
                        label={"钱包地址"}
                        placeholder={"地址"} value={address} onChange={handleAddressChange}>
                    </TextInput>
                </Flex>
                <TextInput
                    label={"助记词"}
                    placeholder={"助记词"} value={mnemonic} onChange={handleMnemonicChange}>
                </TextInput>
                <TextInput
                    label={"私钥"}
                    placeholder={"私钥"} value={pKey} onChange={handlePkeyChange}>
                </TextInput>
                <TextInput
                    label={"小狐狸密码"}
                    placeholder={"小狐狸密码"} value={mmPwd} onChange={handleMmPwdChange}>
                </TextInput>
                <Button onClick={handleSubmit} loading={loading}>
                    提交
                </Button>
            </Flex>
        </Modal>
    )
}

export default AddWalletDialog;
