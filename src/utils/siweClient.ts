import {configureClientSIWE} from "connectkit-next-siwe";

export const siweClient = configureClientSIWE({
    apiRoutePrefix: "/api/siwe",
    statement: "Sign in With Ethereum to prove you control this wallet.",
})
