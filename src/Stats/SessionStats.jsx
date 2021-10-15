import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";

import StatsItem from "./StatsItem";

const SessionStats = (props) => {
	const [workingLength, setWorkingLength] = useState(0);
	const [restingLength, setRestingLength] = useState(0);
	const [pausedLength, setPausedLength] = useState(0);

	useEffect(() => {
		if (props.newAction) {
			switch (props.newAction.type) {
				case "WORKING_END":
					setWorkingLength(
						(prev) => prev + +props.newAction.timestamp
					);
					break;
				case "BREAK_END":
					setRestingLength(
						(prev) => prev + +props.newAction.timestamp
					);
					break;
				case "PAUSE_END":
					if (!props.newAction.pauseLength) return;
					setPausedLength(
						(prev) => prev + +props.newAction.pauseLength
					);
					break;
				default:
					break;
			}
		} else {
			setWorkingLength(0);
			setRestingLength(0);
			setPausedLength(0);
		}
	}, [props.newAction]);

	return (
		<Box d="flex" w="100%" py={5}>
			<StatsItem
				label="Working"
				number={Math.floor(workingLength / 60)}
			/>
			<StatsItem
				label="Resting"
				number={Math.floor(restingLength / 60)}
			/>
			<StatsItem label="Paused" number={Math.floor(pausedLength / 60)} />
		</Box>
	);
};

export default SessionStats;
