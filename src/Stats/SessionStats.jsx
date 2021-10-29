import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";

import StatsItem from "./StatsItem";

const SessionStats = (props) => {
	const [workingLength, setWorkingLength] = useState(0);
	const [restingLength, setRestingLength] = useState(0);
	const [pausedLength, setPausedLength] = useState(0);

	useEffect(() => {
		setWorkingLength(
			props.actionsList
				.filter((item) => item.type === "WORKING_END")
				.reduce((sum, current) => sum + current["diffTimestamp"], 0)
		);
		setRestingLength(
			props.actionsList
				.filter((item) => item.type === "BREAK_END")
				.reduce((sum, current) => sum + current["diffTimestamp"], 0)
		);
		setPausedLength(
			props.actionsList
				.filter((item) => item.type === "PAUSE_END")
				.reduce((sum, current) => sum + current["diffTimestamp"], 0)
		);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (props.newAction) {
			switch (props.newAction.type) {
				case "WORKING_END":
					setWorkingLength(
						(prev) => prev + props.newAction.diffTimestamp
					);
					break;
				case "BREAK_END":
					setRestingLength(
						(prev) => prev + props.newAction.diffTimestamp
					);
					break;
				case "PAUSE_END":
					setPausedLength(
						(prev) => prev + props.newAction.diffTimestamp
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
				number={Math.floor(workingLength / 60000)}
			/>
			<StatsItem
				label="Resting"
				number={Math.floor(restingLength / 60000)}
			/>
			<StatsItem
				label="Paused"
				number={Math.floor(pausedLength / 60000)}
			/>
		</Box>
	);
};

export default SessionStats;
