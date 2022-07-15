import React from "react";
import {Container, VStack} from "@chakra-ui/layout";

import Navbar from "./Navbar/Navbar";

export default function App() {
    return (
        <React.Fragment>
            <Navbar/>
            <Container maxW="container.lg" centerContent p={6}>
                <VStack w="100%">
                </VStack>
            </Container>
        </React.Fragment>
    );
}