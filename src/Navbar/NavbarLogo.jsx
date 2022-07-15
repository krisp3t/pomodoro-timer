import React from "react";
import {GiTomato} from "react-icons/gi";
import {Box, Flex, Heading, Icon} from "@chakra-ui/react";

export default function NavbarLogo() {
    return (
        <Flex
            align="flex-start"
            justifyContent="center"
            mr={5}
            pb={{base: 4, md: 0}}
            w={{base: "100%", md: "auto"}}
        >
            <Icon
                as={GiTomato}
                w={10}
                h={10}
                mr={3}
                color="red.500"
                cursor="pointer"
            />
            <Box>
                <Heading
                    as="h1"
                    size="lg"
                    lineHeight="1.5"
                    display="inline-block"
                    verticalAlign="-15px"
                    h={10}
                    bgGradient="linear(to-l, #7928CA, red.500)"
                    bgClip="text"
                    cursor="pointer"
                >
                    Pomodoro Timer
                </Heading>
            </Box>
        </Flex>
    )
}