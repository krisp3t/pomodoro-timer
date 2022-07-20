import React from "react";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";

import LogItem from "./LogItem";

export default function LogMode(props) {
    return (
        <Accordion allowToggle defaultIndex={0} w="100%">
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            {props.mode}
                        </Box>
                        <AccordionIcon/>
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <LogItem/>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>);
}

