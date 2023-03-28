import {Button, Checkbox, Flex, Modal, Textarea, TextInput} from "@mantine/core";
import {ChangeEvent, useState} from "react";

type Props = {
    open: boolean,
    onClose: () => void;
    onSuccess: () => void;
}
const AddEcosystemModal = ({open, onClose, onSuccess}: Props) => {
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
    const [chainId, setChainId] = useState("");
    const handleChainIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChainId(e.target.value);
    }
    const [categoryId, setCategoryId] = useState("");
    const handleCategoryIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryId(e.target.value);
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

    return (
      <Modal opened={open} onClose={onClose} centered={true} size={"lg"} title={"Add Ecosystem"}>
          <Flex direction={"column"} gap={"xs"}>
              <Flex justify={"space-between"} gap={"xs"}>
                  <TextInput sx={{
                      flexGrow: 1
                  }
                  } label={"生态名称"} value={name} onChange={handleNameChange}></TextInput>
                  <TextInput sx={{
                  flexGrow: 1}
                  } label={"Logo"} value={logo} onChange={handleLogoChange}></TextInput>
              </Flex>
              <TextInput label={"官网"} value={homepage} onChange={handleHomepageChange}></TextInput>
              <TextInput></TextInput>
              <Flex align={"center"} gap={"sm"}>
                  <TextInput sx={{
                  flexGrow: 1}
                  } label={"ChainID"} value={chainId} onChange={handleChainIdChange}></TextInput>
                  <Checkbox label={"是否 ICO"} value={isIco} onChange={handleIsIcoChange}></Checkbox>
              </Flex>
              <TextInput label={"Twitter 粉丝"} value={twitterFans} onChange={handleTwitterFansChange}></TextInput>
              <Textarea label={"介绍"} value={description} onChange={handleDescriptionChange}></Textarea>
              <TextInput label={"融资"} value={financing} onChange={handleFinacingChange}></TextInput>
              <Textarea label={"交互建议"} value={suggestion} onChange={handleSuggestionChange}></Textarea>
              <Button>
                  提交
              </Button>
          </Flex>
      </Modal>
    );
}

export default AddEcosystemModal;
