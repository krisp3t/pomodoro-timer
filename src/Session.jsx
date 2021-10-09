import React, { useState, useEffect } from "react";

import Interval from "./Interval";
import Button from "./Button";

const Session = () => {
	const [timestamp, setTimestamp] = useState(0);
	useEffect(() => {
		const pomodoroInterval = setInterval(() => {
			setTimestamp((seconds) => seconds + 1);
		}, 1000);
		return () => clearInterval(pomodoroInterval);
	}, []);

	return (
		<div className="session">
			<div className="interval">
				<Interval timestamp={timestamp} />
			</div>
			<div className="button-list">
				<Button text="Start" />
				<Button text="Pause" />
				<Button text="Reset" />
			</div>
		</div>
	);
};

export default Session;
