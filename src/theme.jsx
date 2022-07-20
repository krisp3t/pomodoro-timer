import {extendTheme} from "@chakra-ui/react";
import {mode} from '@chakra-ui/theme-tools'

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    colors: {
        black: {
            50: "#f2f2f2",
            100: "#d9d9d9",
            200: "#bfbfbf",
            300: "#a6a6a6",
            400: "#8c8c8c",
            500: "#737373",
            600: "#595959",
            700: "#404040",
            800: "#262626",
            900: "#0d0d0d",
        },
    },
    fonts: {
        heading: "Montserrat, sans-serif",
        body: "Montserrat, sans-serif",
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode('gray.100', 'gray.800')(props)
            }
        })
    }
});

export default theme;
