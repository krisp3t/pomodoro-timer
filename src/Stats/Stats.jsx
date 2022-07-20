import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";

import StatsItem from "./StatsItem";

const Stats = (props) => {
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
				.filter(
					(item) =>
						item.type === "PAUSE_END" && item.diffTimestamp > 30000
				)
				.reduce((sum, current) => sum + current["diffTimestamp"], 0)
		);
	}, [props.actionsList]);

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

export default Stats;
