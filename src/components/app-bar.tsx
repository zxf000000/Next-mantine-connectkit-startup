import {Box, Flex, UnstyledButton} from "@mantine/core";
import Link from "next/link";
import {ConnectKitButton} from "connectkit";

const AppBar = () => {
    return (
        <Box sx={{
            width: '100%',
        }}>
            <Flex w={"100%"} align={"center"} justify={"space-between"}>
                <UnstyledButton component={Link} href={"/"}>
                    NExt startup
                </UnstyledButton>
                <ConnectKitButton></ConnectKitButton>
            </Flex>
        </Box>
    )
}

export default AppBar;
