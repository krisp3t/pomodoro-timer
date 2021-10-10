import React, { useReducer } from "react";
import Session from "./Session/Session";
import History from "./History/History";

function App() {
	const pomodoroActionsReducer = (pomodoroActions, sessionAction) => {
		console.log(pomodoroActions);
		switch (sessionAction.type) {
			case "WORKING_END":
				return [sessionAction, ...pomodoroActions];
			case "BREAK_END":
				pomodoroActions[0].break = true;
				return [...pomodoroActions];
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
			case "RESET":
				return [];
			default:
				throw new Error();
		}
	};

	const resetActionsList = () => {
		updatePomodoroActionItems({
			type: "RESET",
		});
	};

	const [pomodoroActionItems, updatePomodoroActionItems] = useReducer(
		pomodoroActionsReducer,
		[]
	);

	return (
		<React.Fragment>
			<Session
				onAction={updatePomodoroActionItems}
				reset={resetActionsList}
			/>
			<History items={pomodoroActionItems} clear={resetActionsList} />
		</React.Fragment>
	);
}

export default App;
