import React, { useState, useEffect } from "react";

const formatDate = (input) => input.toString().padStart(2, 0);

const Interval = () => {
	const [timestamp, setTimestamp] = useState(0);
	let minutes = Math.floor(timestamp / 60);
	let seconds = timestamp % 60;

	useEffect(() => {
		const pomodoroInterval = setInterval(() => {
			setTimestamp((seconds) => seconds + 1);
		}, 1000);
		return () => clearInterval(pomodoroInterval);
	}, []);

	return (
		<React.Fragment>
			{formatDate(minutes)}:{formatDate(seconds)}
		</React.Fragment>
	);
};

export default Interval;
