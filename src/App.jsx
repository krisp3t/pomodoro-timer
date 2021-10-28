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
import SessionObject from "./Session/SessionObject";
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
	const sessionStartTime = useRef({
		working: 10,
		break: 10,
		pause: 10,
	});

	const [sessionState, setSessionState] = useState(SESSION_STATE.initial);

	console.log(
		"timestamp =",
		timestamp,
		"sessionState =",
		sessionState,
		"sessionStartTime =",
		sessionStartTime.current
	);

	const startButtonHandler = () => {
		if (sessionState.before) {
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

	if (
		sessionState.status === SESSION_STATE.working.status &&
		timestamp > settingsCtx.pomodoroDuration
	) {
		console.log("Work completed");
		const startTime = +sessionStartTime.current.working;
		updateActionItems(new SessionObject("WORKING_END", startTime));
		setSessionState(SESSION_STATE.break);
		setTimestamp(settingsCtx.breakDuration);
	} else if (
		sessionState.status === SESSION_STATE.break.status &&
		timestamp === 0
	) {
		console.log("Break completed");
		const startTime = +sessionStartTime.current.break;
		updateActionItems(new SessionObject("BREAK_END", startTime));
		setSessionState(SESSION_STATE.working);
	}

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
	}, [timestamp]);

	console.log("actionsArray = ", actionItems);

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
		</SettingsProvider>
	);
}

export default App;
