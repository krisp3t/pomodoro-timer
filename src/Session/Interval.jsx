import React from "react";

export const formatTime = (input) => input.toString().padStart(2, 0);
export const calculateMinSec = (timestamp) => {
	const minutes = Math.floor(timestamp / 60);
	const seconds = timestamp % 60;

	return {
		minutes: formatTime(minutes),
		seconds: formatTime(seconds),
	};
};

const Interval = (props) => {
	const time = calculateMinSec(props.timestamp);

	return (
		<React.Fragment>
			{formatTime(time.minutes)}:{formatTime(time.seconds)}
		</React.Fragment>
	);
};

export default Interval;
