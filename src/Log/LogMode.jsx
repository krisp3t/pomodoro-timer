import React from "react";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Icon} from "@chakra-ui/react";

import LogItem from "./LogItem";

export default function LogMode(props) {
    const content = props.items.map(item => <LogItem key={item.originalStart} action={item}
                                                     colorScheme={props.colorScheme}/>).reverse();

    return (
        <Accordion allowToggle defaultIndex={0} w="100%">
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Icon as={props.icon} display="inline" mr={2}/>
                        <Box flex='1' textAlign='left' fontWeight={500}>
                            {props.mode.charAt(0) + props.mode.substring(1).toLowerCase()}
                        </Box>
                        <AccordionIcon/>
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {content}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>);
}

