import React, { useReducer } from "react";
import Session from "./Session/Session";
import History from "./History/History";

function App() {
	const pomodoroActionsReducer = (pomodoroActions, buttonAction) => {
		switch (buttonAction.type) {
			case "ADD":
				return [...pomodoroActions, buttonAction];
			case "PAUSE":
				return [...pomodoroActions, buttonAction];
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
