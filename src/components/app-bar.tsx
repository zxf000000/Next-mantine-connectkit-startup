import {Box, Flex, Group, UnstyledButton} from "@mantine/core";
import Link from "next/link";
import {ConnectKitButton} from "connectkit";

const AppBar = () => {
    return (
        <Box sx={{
            width: '100%',
        }} px={"md"} h={"80px"}>
            <Flex w={"100%"} h={"100%"} align={"center"} justify={"space-between"}>
                <UnstyledButton component={Link} href={"/"}>
                    NExt startup
                </UnstyledButton>
                <Group>
                    <Link href={"/"}>
                        HOME
                    </Link>
                    <Link href={"/about"}>
                        ABOUT
                    </Link>
                </Group>
                <ConnectKitButton></ConnectKitButton>
            </Flex>
        </Box>
    )
}

export default AppBar;
