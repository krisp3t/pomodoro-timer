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
import SettingsProvider from "./store/SettingsProvider";
import { timestampToOutput } from "./Session/Interval";

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

function App() {
	const settingsCtx = useContext(SettingsContext);
	const storedLog = JSON.parse(localStorage.getItem("log")) || [];

	const [timestamp, setTimestamp] = useState(0);
	const timerRef = useRef();
	const timestampStartPoint = useRef();

	const [sessionState, setSessionState] = useState(SESSION_STATE.initial);

	console.log("timestamp =", timestamp, "sessionState =", sessionState);

	const startButtonHandler = () => {
		if (sessionState.before) {
			setSessionState(sessionState.before);
			setTimestamp(sessionState.beforeTimestamp);
			return;
		}
		setSessionState(SESSION_STATE.working);
	};

	const pauseButtonHandler = () => {
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
	};

	if (
		sessionState.status === SESSION_STATE.working.status &&
		timestamp > settingsCtx.pomodoroDuration
	) {
		console.log("Work completed");
		setSessionState(SESSION_STATE.break);
		setTimestamp(settingsCtx.breakDuration);
	} else if (
		sessionState.status === SESSION_STATE.break.status &&
		timestamp === 0
	) {
		console.log("Break completed");
		setSessionState(SESSION_STATE.working);
	}

	useEffect(() => {
		clearInterval(timerRef.current);
		switch (sessionState.status) {
			case SESSION_STATE.working.status:
				timestampStartPoint.current = Date.now();
				timerRef.current = setInterval(() => {
					// setTimestamp(Date.now() - timestampStartPoint.current);
					setTimestamp((prev) => prev + 100000);
				}, 1000);
				break;
			case SESSION_STATE.break.status:
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
	}, [timestamp, settingsCtx, sessionState]);
	/* Get action */
	const pomodoroActionsReducer = (pomodoroActions, sessionAction) => {
		console.log(pomodoroActions);
		switch (sessionAction.type) {
			case "WORKING_END":
				return [sessionAction, ...pomodoroActions];
			case "BREAK_END":
				pomodoroActions[0].break = true;
				return [sessionAction, ...pomodoroActions];
			case "PAUSE_START":
				return [sessionAction, ...pomodoroActions];
			case "PAUSE_END":
				if (pomodoroActions[0]) {
					sessionAction.pauseLength = Math.floor(
						(sessionAction.realTime - pomodoroActions[0].realTime) /
							1000
					);
				}
				return [sessionAction, ...pomodoroActions];
			case "INITIAL":
				return storedLog;
			case "RESET":
				return [];
			default:
				throw new Error();
		}
	};
	const [pomodoroActionItems, updatePomodoroActionItems] = useReducer(
		pomodoroActionsReducer,
		storedLog
	);

	return (
		<SettingsProvider value={SettingsContext}>
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
					/>
					<Divider borderColor="gray.200" />
					{settingsCtx.isStatistics && (
						<React.Fragment>
							<SessionStats
								newAction={pomodoroActionItems[0]}
								actionsList={pomodoroActionItems}
							/>
							<Divider borderColor="gray.200" />
						</React.Fragment>
					)}
					{settingsCtx.isLog && (
						<Log
							items={pomodoroActionItems}
							clear={clearLogHandler}
						/>
					)}
				</VStack>
			</Container>
		</SettingsProvider>
	);
}

export default App;
