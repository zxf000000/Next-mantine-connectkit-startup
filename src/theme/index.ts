import {MantineThemeOverride} from "@mantine/core";
import {withTheme} from "@emotion/react";

const Theme: MantineThemeOverride = {
    /** Put your mantine theme override here */
    colorScheme: 'dark',
    white: "#FFF",
    black: "#000",
    defaultRadius: "md",
    globalStyles: (theme) => ({
        '*, *::before, *::after': {
            boxSizing: 'border-box',
            fontFamily: "Poppins"
        },
    }),
    components: {
    }
}

export default Theme;
