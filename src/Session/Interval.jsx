import React from "react";

export const formatTime = (input) => input.toString().padStart(2, 0);
export const calculateMinSec = (timestamp) => {
	const minutes = Math.floor(timestamp / 60);
	const seconds = timestamp % 60;
	return `${formatTime(minutes)}:${formatTime(seconds)}`;
};

const Interval = (props) => {
	return <React.Fragment>{calculateMinSec(props.timestamp)}</React.Fragment>;
};

export default Interval;
