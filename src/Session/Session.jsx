import React, { useState, useEffect, useRef } from "react";

import Interval from "./Interval";
import Button from "../UI/Button";
import SessionObject from "./SessionObject";

const SESSION_STATUS_WORKING = "working";
const SESSION_STATUS_PAUSED = "paused";
const SESSION_STATUS_BREAK = "break";

const Session = (props) => {
	const [timestamp, setTimestamp] = useState(0);
	const [buttonsDisabled, setButtonsDisabled] = useState({
		start: false,
		pause: true,
	});
	const pomodoroInterval = useRef();
	const sessionStatus = useRef(SESSION_STATUS_WORKING);

	const startPomodoro = (display = true) => {
		clearInterval(pomodoroInterval.current);
		pomodoroInterval.current = setInterval(
			() =>
				setTimestamp((seconds) =>
					sessionStatus.current === SESSION_STATUS_WORKING
						? seconds + 1
						: seconds - 1
				),
			1000
		);
		setButtonsDisabled({
			start: true,
			pause: false,
		});
		if (display) {
			const type =
				sessionStatus.current === SESSION_STATUS_PAUSED
					? "PAUSE_END"
					: "START";
			props.onAction(new SessionObject(type, timestamp));
		}
		sessionStatus.current = SESSION_STATUS_WORKING;
	};

	const pausePomodoro = () => {
		clearInterval(pomodoroInterval.current);
		sessionStatus.current = SESSION_STATUS_PAUSED;
		setButtonsDisabled({
			start: false,
			pause: true,
		});
		props.onAction(new SessionObject("PAUSE_START", timestamp));
	};

	const resetPomodoro = () => {
		pausePomodoro();
		setTimestamp(0);
		setButtonsDisabled({
			start: false,
			pause: true,
		});
		props.reset();
	};

	useEffect(() => {
		if (timestamp === 1500) {
			props.onAction(new SessionObject("WORKING_END", 1500));
			sessionStatus.current = SESSION_STATUS_BREAK;
			setTimestamp(300);
			startPomodoro(false);
		} else if (
			timestamp === 0 &&
			sessionStatus.current === SESSION_STATUS_BREAK
		) {
			alert("Your break is over");
			props.onAction(new SessionObject("BREAK_END", timestamp));
			sessionStatus.current = SESSION_STATUS_WORKING;
			setTimestamp(0);
			startPomodoro(false);
		}
	}, [timestamp]);

	/* Cleanup */
	useEffect(() => {
		return () => clearInterval(pomodoroInterval.current);
	}, []);

	return (
		<div className="session">
			<div className="interval">
				<Interval timestamp={timestamp} />
			</div>
			<div className="button-list">
				<Button
					text="Start"
					onClick={startPomodoro}
					disabled={buttonsDisabled.start}
				/>
				<Button
					text="Pause"
					disabled={buttonsDisabled.pause}
					onClick={pausePomodoro}
				/>
				<Button text="Reset" onClick={resetPomodoro} />
			</div>
		</div>
	);
};

export default Session;
