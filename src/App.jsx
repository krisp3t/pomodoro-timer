import React, { useReducer } from "react";
import Session from "./Session/Session";
import History from "./History/History";

function App() {
	const pomodoroActionsReducer = (pomodoroActions, sessionAction) => {
		switch (sessionAction.type) {
			case "START":
			case "WORKING_END":
			case "BREAK_END":
			case "PAUSE_START":
			case "PAUSE_END":
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
