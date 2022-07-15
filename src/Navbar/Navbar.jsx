import React from "react";
import {
    Box,
    Flex,
    useColorModeValue,
} from "@chakra-ui/react";
import NavbarLogo from "./NavbarLogo";
import DarkModeToggle from "./DarkModeToggle";
import SettingsButton from "./Settings";


export default function Navbar() {
    const bgColor = useColorModeValue("gray.200", "gray.800");

    return (
        <Flex
            as="nav"
            justify="space-between"
            wrap="wrap"
            p={{base: 4, md: 6}}
            pt={{base: 2, md: 6}}
            bg={bgColor}
        >
            <NavbarLogo/>

            <Box
                display="flex"
                w={{base: "100%", md: "auto"}}
                px={{base: 6, md: 0}}
                justifyContent={{base: "space-between", md: "inherit"}}
            >
                <DarkModeToggle/>
                <SettingsButton/>
            </Box>
        </Flex>
    );
};

