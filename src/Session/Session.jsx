import React, { useState, useEffect, useRef } from "react";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { VscDebugStart, VscDebugPause, VscDebugRestart } from "react-icons/vsc";

import Interval from "./Interval";
import SessionObject from "./SessionObject";
import StateDisplay from "./StateDisplay";

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
		<Box pb={10} textAlign="center">
			{sessionStatus.status !== SESSION_STATUS_INITIAL.status && (
				<StateDisplay sessionState={sessionStatus.status} />
			)}
			<Box pb={5}>
				<Heading>
					<Interval timestamp={timestamp} />
				</Heading>
			</Box>
			<ButtonGroup spacing="6">
				<Button
					colorScheme="green"
					onClick={startPomodoro}
					isDisabled={[
						SESSION_STATUS_WORKING.status,
						SESSION_STATUS_BREAK.status,
					].includes(sessionStatus.status)}
					leftIcon={<VscDebugStart />}
					shadow="md"
				>
					Start
				</Button>
				<Button
					colorScheme="red"
					onClick={pausePomodoro}
					isDisabled={[
						SESSION_STATUS_PAUSED.status,
						SESSION_STATUS_INITIAL.status,
					].includes(sessionStatus.status)}
					leftIcon={<VscDebugPause />}
					shadow="md"
				>
					Pause
				</Button>
				<Button
					colorScheme="blue"
					text="Reset"
					onClick={resetPomodoro}
					leftIcon={<VscDebugRestart />}
					shadow="md"
				>
					Reset
				</Button>
			</ButtonGroup>
		</Box>
	);
};

export default Session;
