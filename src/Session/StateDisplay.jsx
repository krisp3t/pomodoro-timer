import React from "react";
import { Tag, useColorModeValue } from "@chakra-ui/react";

const StateDisplay = (props) => {
	const bg = useColorModeValue("gray.200", "gray.800");
	const capitalizeText =
		props.sessionState.charAt(0).toUpperCase() +
		props.sessionState.slice(1);
	return (
		<Tag letterSpacing="1.5px" mb={3} shadow="sm" bgColor={bg}>
			{capitalizeText}
		</Tag>
	);
};

export default StateDisplay;
