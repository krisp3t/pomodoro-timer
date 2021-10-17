import React, { useState } from "react";

const PomodoroContext = React.createContext();

const PomodoroProvider = (props) => {
	const [test, setTest] = useState(0);

	function toggleTheme() {
		setTest((prev) => prev + 1);
	}

	return (
		<PomodoroContext.Provider
			value={{
				test: test,
				clickzaba: toggleTheme,
			}}
		>
			{props.children}
		</PomodoroContext.Provider>
	);
};

export default PomodoroProvider;
