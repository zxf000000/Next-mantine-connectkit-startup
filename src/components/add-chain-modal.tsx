import {Button, Dialog, Flex, Modal, TextInput, Title} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import {addChain, addWallet, updateChain, updateWallet} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";
import {Chain} from "@prisma/client";
import exp from "constants";

type Props = {
    show: boolean,
    onClose: () => void;
    onCreated: () => void;
    chain: Chain | null,
}
const AddChainModal = ({show, onClose, onCreated, chain}: Props) => {
    const [chainId, setChainId] = useState("");
    const handleChainIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChainId(e.target.value);
    }
    const [name, setName] = useState("");
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const [rpc, setRpc] = useState("");
    const handleRpcChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRpc(e.target.value);
    }
    const [explore, setExplore] = useState("");
    const handleExploreChange = (e: ChangeEvent<HTMLInputElement>) => {
        setExplore(e.target.value);
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (chain) {
            setChainId(chain.chainId);
            setName(chain.name);
            setRpc(chain.rpc);
            setExplore(chain.explore);
        } else {
            setChainId("");
            setName("");
            setRpc("");
            setExplore("");
        }
    }, [chain]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (chain) {
                const res = await updateChain({
                    name: name,
                    chainId: chainId,
                    rpc: rpc,
                    explore: explore,
                    id: chain.id
                })
            } else {
                const res = await addChain({
                    name: name,
                    chainId: chainId,
                    rpc: rpc,
                    explore: explore
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
            setName("");
            setRpc("");
            setChainId("");
            setExplore("");
        }
    }, [show]);

    return (
        <Modal centered opened={show} onClose={onClose} title={"添加/编辑网络"} size={"md"}>
            <Flex direction={"column"} align={"stretch"} gap={"xs"}>
                <Flex align={"center"} justify={"space-between"}>
                    <TextInput sx={{
                    flexGrow: 1}
                    }
                        label={"名称"}
                        placeholder={"名称"} value={name} onChange={handleNameChange}>
                    </TextInput>
                    <TextInput sx={{
                        flexGrow: 1}
                    }
                        label={"ChainId"}
                        placeholder={"ChainId"} value={chainId} onChange={handleChainIdChange}>
                    </TextInput>
                </Flex>
                <TextInput
                    label={"Rpc"}
                    placeholder={"Rpc"} value={rpc} onChange={handleRpcChange}>
                </TextInput>
                <TextInput
                    label={"浏览器"}
                    placeholder={"浏览器"} value={explore} onChange={handleExploreChange}>
                </TextInput>
                <Button onClick={handleSubmit} loading={loading}>
                    提交
                </Button>
            </Flex>
        </Modal>
    )
}

export default AddChainModal;
