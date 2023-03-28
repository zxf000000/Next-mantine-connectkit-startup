import React, {ReactElement, useEffect, useState} from "react";
import {AppShell, Box, createStyles, Header, List, Navbar, NavLink} from "@mantine/core";
import Appbar from "@/components/app-bar";
import AppFooter from "@/components/app-footer";
import {ListItem} from "@mantine/core/lib/List/ListItem/ListItem";
import {
    IconCategory,
    IconFileDescription,
    IconHome,
    IconLoader,
    IconPrompt,
    IconUser,
    IconWallet,
    IconWorld
} from "@tabler/icons-react";
import Link from "next/link";
import {useRouter} from "next/router";
import {IconNetwork} from "@tabler/icons-react";

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
        label: "生态", icon: IconWorld, href: "/ecosystems",
    },
    {
       label: "任务", icon:  IconFileDescription, href: "/jobs",
    },
    {
        label: "钱包", icon: IconWallet, href: "/wallets",
    },
    {
        label: "三件套", icon: IconUser, href: "/sanjiantao",
    },
    {
        label: "总进度", icon: IconLoader, href: "/progresses",
    },
    {
        label: "网络", icon: IconNetwork, href: "/chains"
    },
    {
        label: "类别管理", icon: IconCategory, href: "/categories"
    }
]

const SiteLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    const { classes } = useStyles();
    const [active, setActive] = useState(0);
    const router = useRouter();
    const pathName = router.pathname;
    useEffect(() => {
        const index = navs.findIndex((item) => {
            return item.href === pathName;
        })
        setActive(index);
    }, [pathName]);
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
                    {
                        navs.map((item, index) => {
                            return (
                                <NavLink
                                    key={index}
                                    label={item.label}
                                    active={active === index}
                                    icon={
                                        <item.icon></item.icon>
                                    }
                                    component={Link} href={item.href}>
                                </NavLink>
                            )
                        })
                    }
                </Box>
            </Navbar>
            }
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
