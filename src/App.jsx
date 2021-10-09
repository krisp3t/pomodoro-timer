import React, { useReducer } from "react";
import Session from "./Session/Session";
import History from "./History/History";

function App() {
	const pomodoroActionsReducer = (pomodoroActions, sessionAction) => {
		switch (sessionAction.type) {
			case "COMPLETE_WORKING":
			case "COMPLETE_BREAK":
			case "START":
			case "PAUSE":
				return [...pomodoroActions, sessionAction];
			case "RESET":
				return [];
			default:
				throw new Error();
		}
	};

	const [pomodoroActionItems, updatePomodoroActionItems] = useReducer(
		pomodoroActionsReducer,
		[]
	);

	return (
		<React.Fragment>
			<Session onAction={updatePomodoroActionItems} />
			<History items={pomodoroActionItems} />
		</React.Fragment>
	);
}

export default App;
