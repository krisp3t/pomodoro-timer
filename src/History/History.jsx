import React from "react";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { VscClearAll } from "react-icons/vsc";

import HistoryItem from "./HistoryItem";

const History = (props) => {
	const actionItems = props.items
		.filter((action) => {
			return ["WORKING_END", "PAUSE_END"].includes(action.type);
		})
		.filter((action) => {
			return action.type !== "PAUSE_END" || action.pauseLength > 0;
		})
		.map((action) => (
			<HistoryItem
				key={action.key}
				action={action}
				bgColor={
					action.type === "WORKING_END" ? "green.100" : "red.100"
				}
			/>
		));

	return (
		<Box w="100%" mb={5}>
			<Box textAlign="right" mb={5}>
				<Button
					size="sm"
					colorScheme="black"
					onClick={props.clear}
					leftIcon={<VscClearAll />}
				>
					Clear Log
				</Button>
			</Box>
			<Box display="flex" flexDirection="column">
				{actionItems}
			</Box>
		</Box>
	);
};

export default History;
