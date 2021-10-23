import React, { useState, useEffect, useRef, useContext } from "react";

import { Button, ButtonGroup, Box, Heading } from "@chakra-ui/react";
import { VscDebugStart, VscDebugPause, VscDebugRestart } from "react-icons/vsc";

import tomatoLogo from "../assets/tomato.png";
import alarmSound from "../assets/alarm.mp3";
import Interval from "./Interval";
import { calculateMinSec } from "./Interval";
import SessionObject from "./SessionObject";
import StateDisplay from "./StateDisplay";
import SettingsContext from "../store/settingsContext";

const alarm = new Audio(alarmSound);
const SESSION_STATUS = {
	working: {
		status: "working",
	},
	paused: {
		status: "paused",
	},
	break: {
		status: "break",
	},
	initial: {
		status: "initial",
	},
};

const Session = (props) => {
	const [timestamp, setTimestamp] = useState(0);
	const [sessionStatus, setSessionStatus] = useState(SESSION_STATUS.initial);
	const pomodoroInterval = useRef();
	const settingsCtx = useContext(SettingsContext);
	alarm.volume = settingsCtx.audioVolume;

	const startPomodoro = () => {
		setSessionStatus(
			sessionStatus.status === "paused"
				? sessionStatus.beforePause
				: SESSION_STATUS.working
		);
	};
	const pausePomodoro = () => {
		setSessionStatus({
			...SESSION_STATUS.paused,
			beforePause: sessionStatus,
		});
	};
	const resetPomodoro = () => {
		setSessionStatus(SESSION_STATUS.initial);
		props.reset();
	};

	useEffect(() => {
		/* Notifications API */
		if (!("Notification" in window)) {
			console.log("This browser does not support desktop notifications");
		} else {
			Notification.requestPermission();
		}
		/* Cleanup */
		return () => clearInterval(pomodoroInterval.current);
	}, []);

	useEffect(() => {
		document.title = `(${calculateMinSec(timestamp)}) Pomodoro Timer`;

		if (timestamp === settingsCtx.pomodoroDuration) {
			/* Work session completed */
			if (settingsCtx.isNotifications) {
				new Notification("Pomodoro Timer", {
					body: "Work session completed! Good work, now take a break 😉🔥",
					icon: tomatoLogo,
				});
			}
			props.onAction(
				new SessionObject("WORKING_END", settingsCtx.pomodoroDuration)
			);
			alarm.play();
			setSessionStatus(SESSION_STATUS.break);
		} else if (timestamp === 0 && sessionStatus === SESSION_STATUS.break) {
			/* Break completed */
			if (settingsCtx.isNotifications) {
				new Notification("Pomodoro Timer", {
					body: "Break is over - back to hustling! 💪",
					icon: tomatoLogo,
				});
			}
			props.onAction(
				new SessionObject("BREAK_END", settingsCtx.breakDuration)
			);
			alarm.play();
			setSessionStatus(SESSION_STATUS.working);
		}
	}, [timestamp]);

	useEffect(() => {
		clearInterval(pomodoroInterval.current);
		switch (sessionStatus) {
			case SESSION_STATUS.working:
				pomodoroInterval.current = setInterval(
					() => setTimestamp((seconds) => seconds + 1),
					5
				);
				props.onAction(new SessionObject("PAUSE_END", timestamp));
				break;
			case SESSION_STATUS.break:
				setTimestamp(settingsCtx.breakDuration);
				pomodoroInterval.current = setInterval(
					() => setTimestamp((seconds) => seconds - 1),
					5
				);
				break;
			case SESSION_STATUS.paused:
				props.onAction(new SessionObject("PAUSE_START", timestamp));
				break;
			case SESSION_STATUS.initial:
				props.onAction({
					type: "RESET",
				});
				setTimestamp(0);
				break;
			default:
				return;
		}
	}, [sessionStatus]);

	return (
		<Box pb={10} textAlign="center">
			{sessionStatus.status !== SESSION_STATUS.initial.status && (
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
						SESSION_STATUS.working.status,
						SESSION_STATUS.break.status,
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
						SESSION_STATUS.paused.status,
						SESSION_STATUS.initial.status,
					].includes(sessionStatus.status)}
					leftIcon={<VscDebugPause />}
					shadow="md"
				>
					Pause
				</Button>
				<Button
					colorScheme="gray"
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
