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

export const SESSION_STATE = {
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
	const [sessionState, setSessionState] = useState(SESSION_STATE.initial);
	const timerRef = useRef();

	/* Not counting pauses during session */
	const sessionOriginalStartTimestamp = useRef({
		working: 0,
		break: 0,
		pause: 0,
	});
	/* Time since last pause */
	const sessionCurrentStartTimestamp = useRef(0);

	const startButtonHandler = () => {
		/* Starting from paused state */
		if (sessionState.before) {
			updateActionItems(
				new SessionObject(
					"PAUSE_END",
					sessionOriginalStartTimestamp.current.pause
				)
			);
			setSessionState(sessionState.before);
			sessionCurrentStartTimestamp.current =
				Date.now() - sessionState.beforeTimestamp;
			return;
		}
		/* Starting from initial state */
		sessionOriginalStartTimestamp.current.working = Date.now();
		sessionCurrentStartTimestamp.current =
			sessionOriginalStartTimestamp.current.working;
		setSessionState(SESSION_STATE.working);
	};

	const pauseButtonHandler = () => {
		sessionOriginalStartTimestamp.current.pause = Date.now();
		setSessionState({
			...SESSION_STATE.paused,
			before: sessionState,
			beforeTimestamp: timestamp /* how much ms have elapsed */,
		});
	};

	const resetButtonHandler = () => {
		setSessionState(SESSION_STATE.initial);
	};

	const skipButtonHandler = () => {
		setTimestamp(0);
	};

	const clearLogHandler = () => {
		localStorage.removeItem("log");
		updateActionItems({ type: "RESET" });
	};

	/* Get action and put it into array for logging */
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

	/* Check if session completed */
	if (
		sessionState.status === SESSION_STATE.working.status &&
		timestamp >= settingsCtx.pomodoroDuration
	) {
		/* Work session completed */
		updateActionItems(
			new SessionObject(
				"WORKING_END",
				sessionOriginalStartTimestamp.current.working
			)
		);
		sessionOriginalStartTimestamp.current.break = Date.now();
		sessionCurrentStartTimestamp.current =
			sessionOriginalStartTimestamp.current.break;
		setTimestamp(settingsCtx.breakDuration);
		setSessionState(SESSION_STATE.break);
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
			new SessionObject(
				"BREAK_END",
				sessionOriginalStartTimestamp.current.break
			)
		);
		sessionOriginalStartTimestamp.current.working = Date.now();
		sessionCurrentStartTimestamp.current =
			sessionOriginalStartTimestamp.current.working;
		setSessionState(SESSION_STATE.working);
		settingsCtx.isNotifications &&
			new Notification("Pomodoro Timer", {
				body: "Break is over - back to hustling! 💪",
				icon: tomatoLogo,
			});
		alarm.play();
	}

	/* On load */
	useEffect(() => {
		/* Request notification permission */
		if (!("Notification" in window)) {
			console.log("This browser does not support desktop notifications");
		} else {
			Notification.requestPermission();
		}
		/* Cleanup */
		return () => clearInterval(timerRef.current);
	}, []);

	/* On state change */
	useEffect(() => {
		clearInterval(timerRef.current);
		switch (sessionState.status) {
			case SESSION_STATE.working.status:
				timerRef.current = setInterval(() => {
					/* time elapsed is from last start (+ time before pause, added by start button) till now */
					setTimestamp(
						Date.now() - sessionCurrentStartTimestamp.current
					);
				}, 1000);
				break;
			case SESSION_STATE.break.status:
				timerRef.current = setInterval(() => {
					setTimestamp(
						sessionCurrentStartTimestamp.current +
							settingsCtx.breakDuration -
							Date.now()
					);
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
	}, [timestamp]);

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
							onSkip: skipButtonHandler,
						}}
						timestamp={timestamp}
						sessionState={sessionState.status}
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
