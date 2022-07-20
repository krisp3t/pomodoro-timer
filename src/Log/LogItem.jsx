import React from "react";
import {Box, Text, Badge, Icon} from "@chakra-ui/react";
import {IoMdClock} from "react-icons/io";
import {BsHourglassSplit} from "react-icons/bs"

import {timestampToOutput} from "../Session/Interval";
import {formatHours, formatMinutes} from "../Session/Interval";

export default function LogItem(props) {
    const originalStart = new Date(props.action.originalStart);
    const end = new Date(props.action.end);
    return (
        <>
            <Box display="flex" alignItems="center" mb={2} justifyContent="space-between">
                <Badge
                    display="flex"
                    alignItems="center"
                    textTransform="none"
                    borderWidth="1px"
                    borderRadius="lg"
                    colorScheme={props.colorScheme}
                >
                    <Icon as={IoMdClock} display="inline" mr={1}/>
                    <Text>
                        {formatHours(originalStart)}:{formatMinutes(originalStart)} - {formatHours(end)}:{formatMinutes(end)}
                    </Text>
                </Badge>
                <Badge
                    display="flex"
                    alignItems="center"
                    borderWidth="1px"
                    borderRadius="lg"
                    colorScheme={props.colorScheme}
                >
                    <Icon as={BsHourglassSplit} display="inline" mr={1}/>
                    {timestampToOutput(props.action.sessionLength)}
                </Badge>
            </Box>
        </>
    );
};
