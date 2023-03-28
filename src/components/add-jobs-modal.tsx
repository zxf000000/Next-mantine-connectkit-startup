import {Button, Checkbox, Flex, Modal, Select, Textarea, TextInput} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import {Category, Chain, Ecosystem, Job} from "@prisma/client";
import {useCategories, useChains} from "@/utils/api/fetches";
import ChainSelector from "@/components/chain-selector";
import CategorySelector from "@/components/category-selector";
import {addCategory, addEcosystem, addJobs, updateEcosystem, updateJob} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";
import EcosystemSelector from "@/components/ecosystem-seletor";
import {JobModel} from "@/utils/data-types";

type Props = {
    open: boolean,
    onClose: () => void;
    onSuccess: () => void;
    job: JobModel | null,
}
const AddJobsModal = ({open, onClose, onSuccess, job}: Props) => {
    const [homepage, setHomepage] = useState("");
    const handleHomepageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHomepage(e.target.value);
    }
    const [description, setDescription] = useState("");
    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }
    const [chain, setChain] = useState<Chain | null>(null);
    const handleChainChange = (value: Chain) => {
        setChain(value);
    }

    const [remarks, setRemarks] = useState("");
    const handleRemarksChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setRemarks(e.target.value);
    }

    const [ecosystem, setEcosystem] = useState<Ecosystem | null>(null);
    const handleEcosystemChange = (value: Ecosystem) => {
        setEcosystem(value);
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (job) {
            setHomepage(job.homepage);
            setDescription(job.description);
            setRemarks(job.remarks);
            setChain(job.network);
            setEcosystem(job.ecosystem);
        }
    }, [job]);

    useEffect(() => {
        if (!open) {
            setHomepage("");
            setDescription("");
            setRemarks("");
            setChain(null);
            setEcosystem(null);
        }
    }, [open])

    const handleTapSubmit = async () => {
        setLoading(true);
        try {
            if (job) {
                const res = await updateJob({
                    homepage,
                    remarks,
                    description,
                    ecosystemId: ecosystem?.id || 0,
                    id: job.id,
                    networkId: chain?.id || 0
                });
            } else {
                const res = await addJobs({
                    homepage,
                    remarks,
                    description,
                    ecosystemId: ecosystem?.id || 0,
                    networkId: chain?.id || 0
                });
            }
            setLoading(false);
            onClose();
            onSuccess();
            showSuccess("Success");
        } catch (e: any) {
            showError(e.message);
            setLoading(false);
        }
    }

    return (
        <Modal opened={open} onClose={onClose} centered={true} size={"lg"} title={"添加/编辑任务"}>
            <Flex direction={"column"} gap={"xs"}>
                <TextInput label={"官网"} value={homepage} onChange={handleHomepageChange}></TextInput>
                <ChainSelector value={chain} onChange={handleChainChange}></ChainSelector>
                <EcosystemSelector value={ecosystem} onChange={handleEcosystemChange}></EcosystemSelector>
                <Textarea label={"介绍"} value={description} onChange={handleDescriptionChange}></Textarea>
                <Textarea label={"备注"} value={remarks} onChange={handleRemarksChange}></Textarea>
                <Button onClick={handleTapSubmit} loading={loading}>
                    提交
                </Button>
            </Flex>
        </Modal>
    );
}

export default AddJobsModal;
