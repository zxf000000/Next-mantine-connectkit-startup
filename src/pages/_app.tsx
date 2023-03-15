import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {MantineProvider} from '@mantine/core';
import {appWithTranslation} from 'next-i18next'
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import {bscTestnet} from "wagmi/chains";
import {createClient, WagmiConfig} from "wagmi";
import {ConnectKitProvider, getDefaultClient} from "connectkit";
import process from "process";
import NextNProgress from 'nextjs-progressbar';
import Theme from "@/theme/index";
import { Notifications } from '@mantine/notifications';

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export const SupportChains = [bscTestnet];

const client = createClient(
    getDefaultClient({
        appName: "IL Market",
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
        chains: SupportChains,
    })
)


function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <NextNProgress color={"#7a59f5"}/>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={Theme}
            >
                <Notifications></Notifications>
                <WagmiConfig client={client}>
                    <ConnectKitProvider theme={"auto"} mode={"dark"}>
                        {getLayout(<Component {...pageProps}></Component>)}
                    </ConnectKitProvider>
                </WagmiConfig>
            </MantineProvider>
        </>
    );
}

export default appWithTranslation(App);
