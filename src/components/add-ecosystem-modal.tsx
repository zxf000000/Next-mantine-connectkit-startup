import {Button, Checkbox, Flex, Modal, Select, Textarea, TextInput} from "@mantine/core";
import {ChangeEvent, useEffect, useState} from "react";
import {Category, Chain, Ecosystem} from "@prisma/client";
import {useCategories, useChains} from "@/utils/api/fetches";
import ChainSelector from "@/components/chain-selector";
import CategorySelector from "@/components/category-selector";
import {addCategory, addEcosystem} from "@/utils/api/posts";
import {showError, showSuccess} from "@/notification";

type Props = {
    open: boolean,
    onClose: () => void;
    onSuccess: () => void;
    ecosystem: Ecosystem | null,
}
const AddEcosystemModal = ({open, onClose, onSuccess, ecosystem}: Props) => {
    const [name, setName] = useState("");
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const [logo, setLogo] = useState("");
    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogo(e.target.value);
    }
    const [homepage, setHomepage] = useState("");
    const handleHomepageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHomepage(e.target.value);
    }

    const [isIco, setIsIco] = useState("");
    const handleIsIcoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsIco(e.target.value);
    }
    const [description, setDescription] = useState("");
    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }
    const [twitterFans, setTwitterFans] = useState("");
    const handleTwitterFansChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTwitterFans(e.target.value);
    }
    const [financing, setFinacing] = useState("");
    const handleFinacingChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFinacing(e.target.value);
    }
    const [suggestion, setSuggestion] = useState("");
    const handleSuggestionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setSuggestion(e.target.value);
    }

    const [chain, setChain] = useState<Chain | null>(null);
    const handleChainChange = (value: Chain) => {
        console.log(value);
        setChain(value);
    }

    const [category, setCategory] = useState<Category | null>(null);
    const handleCategoryChange = (value: Category) => {
        console.log(value);
        setCategory(value);
    }
    const [loading, setLoading] = useState(false);
    const handleTapSubmit = async () => {
        setLoading(true);
        try {
            const res = await addEcosystem({
                name,
                logo,
                homepage,
                chainId: Number(chain?.id || ""),
                category_id: category?.id || 0,
                is_ico: Boolean(isIco),
                twitter_fans: twitterFans,
                description: description,
                suggestion: suggestion,
                financing: financing,
            });
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
      <Modal opened={open} onClose={onClose} centered={true} size={"lg"} title={"Add Ecosystem"}>
          <Flex direction={"column"} gap={"xs"}>
              <Flex justify={"space-between"} gap={"xs"}>
                  <TextInput sx={{
                      flexGrow: 1
                  }} label={"生态名称"} value={name} onChange={handleNameChange}></TextInput>
                  <TextInput sx={{
                    flexGrow: 1
                  }} label={"Logo"} value={logo} onChange={handleLogoChange}></TextInput>
              </Flex>
              <TextInput label={"官网"} value={homepage} onChange={handleHomepageChange}></TextInput>
              <ChainSelector value={chain} onChange={handleChainChange}></ChainSelector>
              <CategorySelector value={category} onChange={handleCategoryChange}></CategorySelector>
              <Flex align={"center"} gap={"sm"}>
                  <Checkbox label={"是否 ICO"} value={isIco} onChange={handleIsIcoChange}></Checkbox>
              </Flex>
              <TextInput label={"Twitter 粉丝"} value={twitterFans} onChange={handleTwitterFansChange}></TextInput>
              <Textarea label={"介绍"} value={description} onChange={handleDescriptionChange}></Textarea>
              <TextInput label={"融资"} value={financing} onChange={handleFinacingChange}></TextInput>
              <Textarea label={"交互建议"} value={suggestion} onChange={handleSuggestionChange}></Textarea>
              <Button onClick={handleTapSubmit} loading={loading}>
                  提交
              </Button>
          </Flex>
      </Modal>
    );
}

export default AddEcosystemModal;
