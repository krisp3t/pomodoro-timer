import React from "react";
import { Box, Heading, Text, Badge } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { VscCheck, VscDebugPause } from "react-icons/vsc";
import { IoMdClock } from "react-icons/io";

import { calculateMinSec } from "../Session/Interval";

const ActionCompleted = (props) => {
	return (
		<React.Fragment>
			<Box d="flex" alignItems="center" mb={2}>
				<Badge d="flex" alignItems="center" textTransform="lowercase">
					<Text>At {props.action.timeDisplay}</Text>
				</Badge>
				<Box d="flex" alignItems="center" m="auto">
					<Icon as={props.icon} d="inline" h={6} w={6} mr={1} />
					<Heading as="h3" fontSize="xl" d="inline" fontWeight="500">
						{props.title}
					</Heading>
				</Box>
				<Badge d="flex" alignItems="center">
					<Icon as={IoMdClock} d="inline" mr={1} />
					{props.pauseLength || props.action.pomodoroTime}
				</Badge>
			</Box>
		</React.Fragment>
	);
};

const HistoryItem = (props) => {
	let content;
	switch (props.action.type) {
		case "WORKING_END":
			content = (
				<ActionCompleted
					title="Completed"
					icon={VscCheck}
					action={props.action}
				/>
			);
			break;
		case "PAUSE_END":
			content = (
				<ActionCompleted
					title="Pause"
					icon={VscDebugPause}
					action={props.action}
					pauseLength={calculateMinSec(props.action.pauseLength)}
				/>
			);
			break;
		default:
			break;
	}
	return (
		<Box
			m="auto"
			w="50%"
			mb={4}
			px={4}
			py={2}
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			bgColor={props.bgColor}
			shadow="md"
		>
			{content}
		</Box>
	);
};

export default HistoryItem;
