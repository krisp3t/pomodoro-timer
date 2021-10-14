import React, { useReducer } from "react";
import { Container, Divider, VStack } from "@chakra-ui/layout";

import Navbar from "./UI/Navbar";
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
			<Navbar />
			<Container maxW="container.lg" centerContent p={6}>
				<VStack w="100%">
					<Session
						onAction={updatePomodoroActionItems}
						reset={resetActionsList}
					/>
					<Divider borderColor="gray.200" />
					<History
						items={pomodoroActionItems}
						clear={resetActionsList}
					/>
				</VStack>
			</Container>
		</React.Fragment>
	);
}

export default App;
