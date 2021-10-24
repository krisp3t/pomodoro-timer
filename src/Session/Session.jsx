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
		before: "",
	},
	paused: {
		status: "paused",
		before: "",
	},
	break: {
		status: "break",
		before: "",
	},
	initial: {
		status: "initial",
		before: "",
	},
	reset: {
		status: "initial",
		before: "",
	},
};

const Session = (props) => {
	const [timestamp, setTimestamp] = useState(0);
	const [sessionStatus, setSessionStatus] = useState(SESSION_STATUS.initial);
	const pomodoroInterval = useRef();
	const settingsCtx = useContext(SettingsContext);
	const { onAction } = props;
	alarm.volume = settingsCtx.audioVolume;

	const startPomodoro = () => {
		setSessionStatus(
			sessionStatus.status === SESSION_STATUS.paused.status
				? {
						status: sessionStatus.before,
						before: SESSION_STATUS.paused.status,
				  }
				: SESSION_STATUS.working
		);
	};
	const pausePomodoro = () => {
		setSessionStatus({
			...SESSION_STATUS.paused,
			before: sessionStatus.status,
		});
	};
	const resetPomodoro = () => {
		setSessionStatus({
			...SESSION_STATUS.paused,
			before: SESSION_STATUS.working.status,
		});
		setTimestamp(0);
	};

	/* On load */
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

	/* On complete session */
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
			onAction(
				new SessionObject("WORKING_END", settingsCtx.pomodoroDuration)
			);
			alarm.play();
			setSessionStatus(SESSION_STATUS.break);
		} else if (
			timestamp === 0 &&
			sessionStatus.status === SESSION_STATUS.break.status
		) {
			/* Break completed */
			if (settingsCtx.isNotifications) {
				new Notification("Pomodoro Timer", {
					body: "Break is over - back to hustling! 💪",
					icon: tomatoLogo,
				});
			}
			onAction(new SessionObject("BREAK_END", settingsCtx.breakDuration));
			alarm.play();
			setSessionStatus(SESSION_STATUS.working);
		}
	}, [timestamp]); // eslint-disable-line react-hooks/exhaustive-deps

	/* On change sessionStatus */
	useEffect(() => {
		clearInterval(pomodoroInterval.current);
		switch (sessionStatus.status) {
			case SESSION_STATUS.working.status:
				pomodoroInterval.current = setInterval(
					() => setTimestamp((seconds) => seconds + 1),
					1000
				);
				onAction(new SessionObject("PAUSE_END", timestamp));
				break;
			case SESSION_STATUS.break.status:
				if (sessionStatus.before !== "paused")
					setTimestamp(settingsCtx.breakDuration);
				pomodoroInterval.current = setInterval(
					() => setTimestamp((seconds) => seconds - 1),
					1000
				);
				break;
			case SESSION_STATUS.paused.status:
				onAction(new SessionObject("PAUSE_START", timestamp));
				break;
			case SESSION_STATUS.initial.status:
				onAction({
					type: "INITIAL",
				});
				setTimestamp(0);
				break;
			case SESSION_STATUS.reset.status:
				onAction({
					type: "RESET",
				});
				setTimestamp(0);
				break;
			default:
				return;
		}
	}, [sessionStatus]); // eslint-disable-line react-hooks/exhaustive-deps

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
