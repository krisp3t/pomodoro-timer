import React from "react";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";

const StatsItem = (props) => {
	return (
		<Stat textAlign="center">
			<StatLabel>{props.label}</StatLabel>
			<StatNumber>{props.number}</StatNumber>
			<StatHelpText>minutes</StatHelpText>
		</Stat>
	);
};

export default StatsItem;
