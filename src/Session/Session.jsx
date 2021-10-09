import React, { useState, useEffect, useRef } from "react";

import Interval from "./Interval";
import Button from "../UI/Button";
import { calculateMinSec } from "./Interval";

const Session = (props) => {
	const [timestamp, setTimestamp] = useState(0);
	const [startButtonDisabled, setStartButtonDisabled] = useState(false);
	const pomodoroInterval = useRef();
	const sessionStatus = useRef("working");

	const startPomodoro = (display = true) => {
		clearInterval(pomodoroInterval.current);
		pomodoroInterval.current = setInterval(
			() =>
				setTimestamp((seconds) =>
					sessionStatus.current === "working"
						? seconds + 1
						: seconds - 1
				),
			1000
		);
		setStartButtonDisabled(true);
		if (display) {
			props.onAction({
				type: "START",
				pomodoroTime: calculateMinSec(timestamp),
				realTime: new Date().toTimeString().slice(0, 5),
				key: "S" + Date.now(),
			});
		}
	};

	const pausePomodoro = () => {
		clearInterval(pomodoroInterval.current);
		setStartButtonDisabled(false);
		props.onAction({
			type: "PAUSE",
			pomodoroTime: calculateMinSec(timestamp),
			realTime: new Date().toTimeString().slice(0, 5),
			key: "P" + Date.now(),
		});
	};

	const resetPomodoro = () => {
		pausePomodoro();
		setTimestamp(0);
		setStartButtonDisabled(false);
		props.onAction({
			type: "RESET",
			pomodoroTime: calculateMinSec(timestamp),
			realTime: new Date().toTimeString().slice(0, 5),
			key: "R" + Date.now(),
		});
	};

	useEffect(() => {
		return () => clearInterval(pomodoroInterval.current);
	}, []);

	useEffect(() => {
		if (timestamp === 1500) {
			props.onAction({
				type: "COMPLETE_WORKING",
				pomodoroTime: {
					minutes: "25",
					seconds: "0",
				},
				realTime: new Date().toTimeString().slice(0, 5),
				key: "C" + Date.now(),
			});
			sessionStatus.current = "break";
			setTimestamp(300);
			startPomodoro(false);
		} else if (timestamp === 0 && sessionStatus.current === "break") {
			alert("Your break is over");
			props.onAction({
				type: "COMPLETE_BREAK",
				pomodoroTime: {
					minutes: "5",
					seconds: "0",
				},
				realTime: new Date().toTimeString().slice(0, 5),
				key: "C" + Date.now(),
			});
			sessionStatus.current = "working";
			setTimestamp(0);
			startPomodoro(false);
		}
	}, [timestamp]);

	console.log(sessionStatus.current);

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
