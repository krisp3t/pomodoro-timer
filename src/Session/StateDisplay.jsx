import React from "react";
import { Tag } from "@chakra-ui/tag";

const StateDisplay = (props) => {
	const capitalizeText =
		props.sessionState.charAt(0).toUpperCase() +
		props.sessionState.slice(1);
	return (
		<Tag letterSpacing="1.5px" mb={3}>
			{capitalizeText}
		</Tag>
	);
};

export default StateDisplay;
