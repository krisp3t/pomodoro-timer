import {Box, FormLabel, Switch} from "@chakra-ui/react";

export default function DarkModeToggle(props) {
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
                />
                <FormLabel fontSize="sm" m={0}>
                    Dark Mode
                </FormLabel>
            </Box>
        </Box>
    )
}