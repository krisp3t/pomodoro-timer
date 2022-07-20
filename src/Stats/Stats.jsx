import React from "react";
import {Box} from "@chakra-ui/layout";

import StatsItem from "./StatsItem";
import {useColorModeValue} from "@chakra-ui/react";

export default function Stats(props) {
    const workingLength = props.actions.work.reduce(
        (prev, currentValue) => prev + currentValue.sessionLength,
        0
    );
    const restingLength = props.actions.breaks.reduce(
        (prev, currentValue) => prev + currentValue.sessionLength,
        0
    );
    const pausedLength = props.actions.pauses.reduce(
        (prev, currentValue) => prev + currentValue.sessionLength,
        0
    );

    return (
        <Box display="flex" w="100%" py={5}>
            <StatsItem
                label="Working"
                number={Math.floor(workingLength / 60000)}
                color={useColorModeValue("green.400", "green.200")}
            />
            <StatsItem
                label="Resting"
                number={Math.floor(restingLength / 60000)}
                color={useColorModeValue("blue.400", "blue.200")}
            />
            <StatsItem
                label="Paused"
                number={Math.floor(pausedLength / 60000)}
                color={useColorModeValue("red.400", "red.200")}
            />
        </Box>
    );
};
