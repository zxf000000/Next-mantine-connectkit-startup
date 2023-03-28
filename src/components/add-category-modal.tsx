import {Button, Dialog, Flex, Modal, Textarea, TextInput, Title} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import {addCategory, addChain, addWallet, updateCategory, updateChain, updateWallet} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";
import {Category, Chain} from "@prisma/client";

type Props = {
    show: boolean,
    onClose: () => void;
    onCreated: () => void;
    category: Category | null,
}

const AddCategoryModal = ({show, onClose, onCreated, category}: Props) => {
    const [name, setName] = useState("");
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const [desc, setDesc] = useState("");
    const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setName(category.name);
            setDesc(category.description || "");
        } else {
            setName("");
            setDesc("");
        }
    }, [category]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (category) {
                const res = await updateCategory({
                    name: name,
                    description: desc,
                    id: category.id
                })
            } else {
                const res = await addCategory({
                    name: name,
                    description: desc
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
            setDesc("");
        }
    }, [show]);

    return (
        <Modal centered opened={show} onClose={onClose} title={"添加/编辑分类"} size={"md"}>
            <Flex direction={"column"} align={"stretch"} gap={"xs"}>
                <Flex align={"center"} justify={"space-between"}>
                    <TextInput sx={{
                        flexGrow: 1}
                    }
                               label={"名称"}
                               placeholder={"名称"} value={name} onChange={handleNameChange}>
                    </TextInput>
                </Flex>
                <Textarea sx={{
                    flexGrow: 1}
                }
                          label={"说明"}
                          placeholder={"说明"} value={desc} onChange={handleDescChange}>
                </Textarea>
                <Button onClick={handleSubmit} loading={loading}>
                    提交
                </Button>
            </Flex>
        </Modal>
    )
}

export default AddCategoryModal;
