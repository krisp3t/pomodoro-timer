import React from "react";
import {Stat, StatLabel, StatNumber, StatHelpText} from "@chakra-ui/react";

export default function StatsItem(props) {
    return (
        <Stat textAlign="center">
            <StatLabel fontWeight={600} mb={1}>{props.label}</StatLabel>
            <StatNumber color={props.color}>{props.number}</StatNumber>
            <StatHelpText fontWeight={500}>minutes</StatHelpText>
        </Stat>
    );
};
