import React, {
	useReducer,
	useContext,
	useRef,
	useState,
	useEffect,
} from "react";
import { Container, Divider, VStack } from "@chakra-ui/layout";

import Navbar from "./UI/Navbar";
import Session from "./Session/Session";
import SessionStats from "./Stats/SessionStats";
import Log from "./Log/Log";
import SettingsContext from "./store/settingsContext";
import SessionObject from "./Session/SessionObject";
import { timestampToOutput } from "./Session/Interval";
import alarmSound from "./assets/alarm.mp3";
import tomatoLogo from "./assets/tomato.png";

const SESSION_STATE = {
	working: {
		status: "WORKING",
	},
	break: {
		status: "BREAK",
	},
	paused: {
		status: "PAUSED",
		before: "",
		beforeTimestamp: 0,
	},
	initial: {
		status: "INITIAL",
	},
};
const alarm = new Audio(alarmSound);

function App() {
	const settingsCtx = useContext(SettingsContext);
	const storedLog = JSON.parse(localStorage.getItem("log")) || [];
	alarm.volume = settingsCtx.audioVolume;

	const [timestamp, setTimestamp] = useState(0);
	const timerRef = useRef();
	const timestampStartPoint = useRef();
	const sessionStartTime = useRef({
		working: 0,
		break: 0,
		pause: 0,
	});

	const [sessionState, setSessionState] = useState(SESSION_STATE.initial);

	console.log(
		"timestamp =",
		timestamp,
		"sessionState =",
		sessionState,
		"sessionStartTime =",
		sessionStartTime.current,
		"settingsCtx =",
		settingsCtx
	);

	const startButtonHandler = () => {
		if (sessionState.before) {
			updateActionItems(
				new SessionObject("PAUSE_END", sessionStartTime.current.pause)
			);
			setSessionState(sessionState.before);
			setTimestamp(sessionState.beforeTimestamp);
			return;
		}
		setSessionState(SESSION_STATE.working);
	};

	const pauseButtonHandler = () => {
		sessionStartTime.current.pause = Date.now();
		setSessionState({
			...SESSION_STATE.paused,
			before: sessionState,
			beforeTimestamp: timestamp,
		});
	};

	const resetButtonHandler = () => {
		setSessionState(SESSION_STATE.initial);
	};

	const clearLogHandler = () => {
		localStorage.removeItem("log");
		updateActionItems({ type: "RESET" });
	};

	/* Get action */
	const actionsReducer = (actionsArray, newAction) => {
		switch (newAction.type) {
			case "WORKING_END":
			case "BREAK_END":
			case "PAUSE_END":
				return [newAction, ...actionsArray];
			case "RESET":
				return [];
			default:
				throw new Error();
		}
	};
	const [actionItems, updateActionItems] = useReducer(
		actionsReducer,
		storedLog
	);

	/* On load */
	useEffect(() => {
		/* Notifications API */
		if (!("Notification" in window)) {
			console.log("This browser does not support desktop notifications");
		} else {
			Notification.requestPermission();
		}
		/* Cleanup */
		return () => clearInterval(timerRef.current);
	}, []);

	useEffect(() => {
		clearInterval(timerRef.current);
		switch (sessionState.status) {
			case SESSION_STATE.working.status:
				timestampStartPoint.current = Date.now();
				sessionStartTime.current.working = timestampStartPoint.current;
				timerRef.current = setInterval(() => {
					// setTimestamp(Date.now() - timestampStartPoint.current);
					setTimestamp((prev) => prev + 100000);
				}, 1000);

				break;
			case SESSION_STATE.break.status:
				sessionStartTime.current.break = Date.now();
				timestampStartPoint.current =
					Date.now() + settingsCtx.breakDuration;
				timerRef.current = setInterval(() => {
					// setTimestamp(timestampStartPoint.current - Date.now());
					setTimestamp((prev) => prev - 100000);
				}, 1000);
				break;
			case SESSION_STATE.initial.status:
				setTimestamp(0);
				break;
			default:
				return;
		}
	}, [sessionState, settingsCtx]);

	useEffect(() => {
		document.title = `(${timestampToOutput(timestamp)}) Pomodoro Timer`;
		if (
			sessionState.status === SESSION_STATE.working.status &&
			timestamp > settingsCtx.pomodoroDuration
		) {
			/* Work session completed */
			updateActionItems(
				new SessionObject(
					"WORKING_END",
					sessionStartTime.current.working
				)
			);
			setSessionState(SESSION_STATE.break);
			setTimestamp(settingsCtx.breakDuration);
			console.log("Work session completed");
			settingsCtx.isNotifications &&
				new Notification("Pomodoro Timer", {
					body: "Work session completed! Good work, now take a break 😉🔥",
					icon: tomatoLogo,
				});
			alarm.play();
		} else if (
			sessionState.status === SESSION_STATE.break.status &&
			timestamp === 0
		) {
			/* Break completed */
			updateActionItems(
				new SessionObject("BREAK_END", sessionStartTime.current.break)
			);
			setSessionState(SESSION_STATE.working);
			settingsCtx.isNotifications &&
				new Notification("Pomodoro Timer", {
					body: "Break is over - back to hustling! 💪",
					icon: tomatoLogo,
				});
			alarm.play();
		}
	}, [timestamp]);

	console.log("actionsArray = ", actionItems);

	return (
		<React.Fragment>
			<Navbar />
			<Container maxW="container.lg" centerContent p={6}>
				<VStack w="100%">
					<Session
						onButton={{
							onStart: startButtonHandler,
							onPause: pauseButtonHandler,
							onReset: resetButtonHandler,
						}}
						timestamp={timestamp}
						sessionState={sessionState}
					/>
					<Divider borderColor="gray.200" />
					{settingsCtx.isStatistics && (
						<React.Fragment>
							<SessionStats
								newAction={actionItems[0]}
								actionsList={actionItems}
							/>
							<Divider borderColor="gray.200" />
						</React.Fragment>
					)}
					{settingsCtx.isLog && (
						<Log items={actionItems} clear={clearLogHandler} />
					)}
				</VStack>
			</Container>
		</React.Fragment>
	);
}

export default App;
