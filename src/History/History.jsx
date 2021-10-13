import React from "react";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import HistoryItem from "./HistoryItem";

const History = (props) => {
	const actionItems = props.items
		.filter((action) => {
			return ["WORKING_END", "PAUSE_END"].includes(action.type);
		})
		.filter((action) => {
			return action.type !== "PAUSE_END" || action.pauseLength > 0;
		})
		.map((action) => <HistoryItem key={action.key} action={action} />);
	return (
		<Box>
			<Button onClick={props.clear}>Clear</Button>
			{actionItems}
		</Box>
	);
};

export default History;
