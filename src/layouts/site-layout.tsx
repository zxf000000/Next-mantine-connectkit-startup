import React, {ReactElement} from "react";
import {AppShell, Box, createStyles, Header, Navbar} from "@mantine/core";
import Appbar from "@/components/app-bar";
import AppFooter from "@/components/app-footer";

const useStyles = createStyles((theme) => (
    {
        siteLayout: {
            backgroundColor: theme.colors.dark[9],
        }
    }
))

const SiteLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    const { classes } = useStyles();

    return (
        <AppShell
            className={classes.siteLayout}
            padding={"md"}
            header={<Header height={80} bg={"transparent"} withBorder={false}>
                <Appbar></Appbar>
            </Header>}
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
