import React, { useState, useEffect, useRef } from "react";

import Interval from "./Interval";
import Button from "../UI/Button";
import SessionObject from "./SessionObject";

const SESSION_STATUS_WORKING = { status: "working" };
const SESSION_STATUS_PAUSED = { status: "paused" };
const SESSION_STATUS_BREAK = { status: "break" };
const SESSION_STATUS_INITIAL = { status: "initial" };
const POMODORO_DURATION = 1500;
const BREAK_DURATION = 300;

const Session = (props) => {
	const [timestamp, setTimestamp] = useState(0);
	const [sessionStatus, setSessionStatus] = useState(SESSION_STATUS_INITIAL);
	const pomodoroInterval = useRef();

	const startPomodoro = () => {
		if (sessionStatus.status === "paused") {
			setSessionStatus(sessionStatus.beforePause);
			return;
		}
		setSessionStatus(SESSION_STATUS_WORKING);
	};

	const pausePomodoro = () => {
		setSessionStatus({
			...SESSION_STATUS_PAUSED,
			beforePause: sessionStatus,
		});
	};

	const resetPomodoro = () => {
		setSessionStatus(SESSION_STATUS_INITIAL);
		setTimestamp(0);
		props.reset();
	};

	useEffect(() => {
		if (timestamp === POMODORO_DURATION) {
			props.onAction(new SessionObject("WORKING_END", POMODORO_DURATION));
			setTimestamp(BREAK_DURATION);
			setSessionStatus(SESSION_STATUS_BREAK);
		} else if (timestamp === 0 && sessionStatus === SESSION_STATUS_BREAK) {
			props.onAction(new SessionObject("BREAK_END", timestamp));
			setSessionStatus(SESSION_STATUS_WORKING);
		}
	}, [timestamp]);

	useEffect(() => {
		clearInterval(pomodoroInterval.current);
		switch (sessionStatus) {
			case SESSION_STATUS_WORKING:
				pomodoroInterval.current = setInterval(
					() => setTimestamp((seconds) => seconds + 1),
					5
				);
				props.onAction(new SessionObject("PAUSE_END", timestamp));
				break;
			case SESSION_STATUS_BREAK:
				pomodoroInterval.current = setInterval(
					() => setTimestamp((seconds) => seconds - 1),
					5
				);
				break;
			case SESSION_STATUS_PAUSED:
				props.onAction(new SessionObject("PAUSE_START", timestamp));
				break;
			case SESSION_STATUS_INITIAL:
				setTimestamp(0);
				break;
			default:
				return;
		}
	}, [sessionStatus]);

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
					disabled={
						sessionStatus.status === SESSION_STATUS_WORKING ||
						sessionStatus.status === SESSION_STATUS_BREAK
					}
				/>
				<Button
					text="Pause"
					onClick={pausePomodoro}
					disabled={
						sessionStatus.status === SESSION_STATUS_PAUSED ||
						sessionStatus.status === SESSION_STATUS_INITIAL
					}
				/>
				<Button text="Reset" onClick={resetPomodoro} />
			</div>
		</div>
	);
};

export default Session;