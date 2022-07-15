import {Box, FormLabel, Switch, useColorMode} from "@chakra-ui/react";

export default function DarkModeToggle() {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Box
            display="flex"
            w={{base: "100%", md: "auto"}}
            px={{base: 6, md: 0}}
            justifyContent={{base: "space-between", md: "inherit"}}
        >
            <Box display="flex" flexDir="column" alignItems="center" mr={10}>
                <Switch
                    id="colorModeSwitch"
                    size="md"
                    isChecked={colorMode === "dark"}
                    onChange={toggleColorMode}
                />
                <FormLabel fontSize="sm" m={0}>
                    Dark Mode
                </FormLabel>
            </Box>
        </Box>
    )
}