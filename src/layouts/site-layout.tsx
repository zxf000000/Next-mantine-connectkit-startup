import React, {ReactElement, useState} from "react";
import {AppShell, Box, createStyles, Header, List, Navbar, NavLink} from "@mantine/core";
import Appbar from "@/components/app-bar";
import AppFooter from "@/components/app-footer";
import {ListItem} from "@mantine/core/lib/List/ListItem/ListItem";
import {IconHome, IconLoader, IconPrompt, IconUser, IconWallet} from "@tabler/icons-react";
import Link from "next/link";

const useStyles = createStyles((theme) => (
    {
        siteLayout: {
            backgroundColor: theme.colors.dark[9],
        }
    }
))

const navs = [
    {
        label: "首页", icon: IconHome, href: "/",
    },
    {
        label: "钱包", icon: IconWallet, href: "/wallets",
    },
    {
        label: "三件套", icon: IconUser, href: "/sanjiantao",
    },
    {
        label: "生态", icon: IconPrompt, href: "/ecosystems",
    },
    {
        label: "总进度", icon: IconLoader, href: "/wallets",
    }
]

const SiteLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    const { classes } = useStyles();
    const [active, setActive] = useState(0);

    return (
        <AppShell
            className={classes.siteLayout}
            padding={"md"}
            header={<Header height={80} bg={"transparent"} withBorder={false}>
                <Appbar></Appbar>
            </Header>}
            navbar={
            <Navbar width={{base: 300}} height={"100vh"} p={"xs"}>
                <Box>
                    <NavLink
                        label={"钱包"}
                        icon={
                            <IconWallet></IconWallet>
                        }
                        component={Link} href={"/wallets"}>
                    </NavLink>
                </Box>
            </Navbar>
            }
            footer={<AppFooter></AppFooter>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0] },
            })}
        >
            {children}
        </AppShell>
    )
}

export const getLayout = (page: ReactElement) => (
    <SiteLayout>{page}</SiteLayout>
);

export default SiteLayout;
