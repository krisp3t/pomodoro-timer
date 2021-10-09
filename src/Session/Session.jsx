import React, { useState, useEffect, useRef } from "react";

import Interval from "./Interval";
import Button from "../UI/Button";

const Session = () => {
	const [timestamp, setTimestamp] = useState(0);
	const [startButtonDisabled, setStartButtonDisabled] = useState(false);
	const pomodoroInterval = useRef();

	useEffect(() => {
		return () => clearInterval(pomodoroInterval.current);
	}, []);

	const startPomodoro = () => {
		pomodoroInterval.current = setInterval(
			() => setTimestamp((seconds) => seconds + 1),
			1000
		);
		setStartButtonDisabled(true);
	};

	const pausePomodoro = () => {
		clearInterval(pomodoroInterval.current);
		setStartButtonDisabled(false);
	};

	const resetPomodoro = () => {
		pausePomodoro();
		setTimestamp(0);
		setStartButtonDisabled(false);
	};

	return (
		<div className="session">
			<div className="interval">
				<Interval timestamp={timestamp} />
			</div>
			<div className="button-list">
				<Button
					text="Start"
					onClick={startPomodoro}
					disabled={startButtonDisabled}
				/>
				<Button text="Pause" onClick={pausePomodoro} />
				<Button text="Reset" onClick={resetPomodoro} />
			</div>
		</div>
	);
};

export default Session;
