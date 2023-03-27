import {Box, Flex, Group, UnstyledButton} from "@mantine/core";
import Link from "next/link";
import {ConnectKitButton} from "connectkit";

const AppBar = () => {
    return (
        <Box sx={{
            width: '100%',
        }} px={"md"} h={"80px"} bg={"dark.6"}>
            <Flex w={"100%"} h={"100%"} align={"center"} justify={"space-between"}>
                <UnstyledButton component={Link} href={"/"}>
                    NExt startup
                </UnstyledButton>
                <ConnectKitButton></ConnectKitButton>
            </Flex>
        </Box>
    )
}

export default AppBar;
