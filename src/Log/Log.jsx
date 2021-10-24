import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { VscClearAll } from "react-icons/vsc";

import LogItem from "./LogItem";

const Log = (props) => {
	const actionArray = props.items
		.filter((action) => {
			return ["WORKING_END", "PAUSE_END", "BREAK_END"].includes(
				action.type
			);
		})
		.filter((action) => {
			return action.type !== "PAUSE_END" || action.pauseLength > 30;
		});
	if (actionArray.length !== 0) {
		localStorage.setItem("log", JSON.stringify(actionArray));
	}

	const logItems = actionArray.map((action) => (
		<LogItem key={action.key} action={action} />
	));

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
				{logItems}
			</Box>
		</Box>
	);
};

export default Log;
