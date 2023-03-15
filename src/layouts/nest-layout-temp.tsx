import {PropsWithChildren, ReactElement} from "react";
import {getLayout as GetGlobalLayout} from "@/layouts/site-layout";
import {Box} from "@mantine/core";

const NestLayoutTemp = ({children}: PropsWithChildren) => {
    return (
        <Box>
            Nested layout
            {children}
        </Box>
    )
}

export const getLayout = (page: ReactElement) =>
    GetGlobalLayout(<NestLayoutTemp>{page}</NestLayoutTemp>);


export default NestLayoutTemp;
