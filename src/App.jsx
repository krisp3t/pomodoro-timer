import React from "react";
import {Container, VStack} from "@chakra-ui/layout";

import Navbar from "./Navbar/Navbar";
import Session from "./Session/Session";
import {Divider} from "@chakra-ui/react";

export default function App() {
    return (
        <React.Fragment>
            <Navbar/>
            <Container maxW="container.lg" centerContent p={6}>
                <VStack w="100%">
                    <Session/>
                    <Divider borderColor="gray.200"/>
                    <Divider borderColor="gray.200"/>
                </VStack>
            </Container>
        </React.Fragment>
    )
}