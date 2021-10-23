import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { VscClearAll } from "react-icons/vsc";

import HistoryItem from "./HistoryItem";

const History = (props) => {
	const actionItems = props.items
		.filter((action) => {
			return ["WORKING_END", "PAUSE_END", "BREAK_END"].includes(
				action.type
			);
		})
		.filter((action) => {
			return action.type !== "PAUSE_END" || action.pauseLength > 30;
		})
		.map((action) => <HistoryItem key={action.key} action={action} />);

	return (
		<Box w="100%">
			<Box textAlign="right" mb={5}>
				<Button
					size="sm"
					colorScheme="gray"
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
