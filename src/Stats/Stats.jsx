import React from "react";
import {Box} from "@chakra-ui/layout";

import StatsItem from "./StatsItem";

export default function Stats(props) {
    console.log(props);

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

// TODO: / 60000
    return (
        <Box display="flex" w="100%" py={5}>
            <StatsItem
                label="Working"
                number={Math.floor(workingLength)}
            />
            <StatsItem
                label="Resting"
                number={Math.floor(restingLength)}
            />
            <StatsItem
                label="Paused"
                number={Math.floor(pausedLength)}
            />
        </Box>
    );
};
