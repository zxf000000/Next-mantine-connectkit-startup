import {configureServerSideSIWE} from "./serverConfig";
export const siweServer = configureServerSideSIWE({
    session: {
        cookieName: "Lumao",
        password: process.env.NEXTAUTH_SECRET,
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        }
    }
})
