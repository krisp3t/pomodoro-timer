import React from "react";

export const formatTime = (input) => input.toString().padStart(2, 0);
export const calculateMinSec = (timestamp) => {
	const minutes = Math.floor(timestamp / 60);
	const seconds = timestamp % 60;
	return `${formatTime(minutes)}:${formatTime(seconds)}`;
};
export const timestampToOutput = (timestamp) => {
	return calculateMinSec(Math.floor(timestamp / 1000));
};

const Interval = (props) => {
	return (
		<React.Fragment>{timestampToOutput(props.timestamp)}</React.Fragment>
	);
};

export default Interval;
