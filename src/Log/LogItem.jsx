import React from "react";
import { Box, Heading, Text, Badge, Icon } from "@chakra-ui/react";
import { VscCheck, VscDebugPause } from "react-icons/vsc";
import { IoMdClock } from "react-icons/io";
import { GiNightSleep } from "react-icons/gi";

import { calculateMinSec } from "../Session/Interval";

const ActionCompleted = (props) => {
	return (
		<React.Fragment>
			<Box d="flex" alignItems="center" mb={2}>
				<Badge
					d="flex"
					alignItems="center"
					textTransform="lowercase"
					borderWidth="1px"
					borderRadius="lg"
					borderColor="blackAlpha.400"
					color="gray.800"
				>
					<Text>
						{props.action.startedTime} -{" "}
						{props.action.completedTime}
					</Text>
				</Badge>
				<Box d="flex" alignItems="center" m="auto">
					<Icon
						as={props.icon}
						d="inline"
						h={6}
						w={6}
						mr={2}
						color="gray.800"
					/>
					<Heading
						as="h3"
						fontSize="xl"
						d="inline"
						fontWeight="500"
						color="gray.800"
					>
						{props.title}
					</Heading>
				</Box>
				<Badge
					d="flex"
					alignItems="center"
					borderWidth="1px"
					borderRadius="lg"
					borderColor="blackAlpha.400"
					color="gray.800"
				>
					<Icon as={IoMdClock} d="inline" mr={1} />
					{props.action.sessionLength}
				</Badge>
			</Box>
		</React.Fragment>
	);
};

const LogItem = (props) => {
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
		case "BREAK_END":
			content = (
				<ActionCompleted
					title="Break"
					icon={GiNightSleep}
					action={props.action}
				/>
			);
			break;
		default:
			break;
	}
	return (
		<Box
			m="auto"
			w="60%"
			mb={5}
			px={4}
			py={2}
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			bgColor={props.action.bgColor}
			shadow="md"
		>
			{content}
		</Box>
	);
};

export default LogItem;
