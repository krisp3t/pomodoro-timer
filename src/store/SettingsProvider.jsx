import React, { useState } from "react";

import SettingsContext from "./settingsContext";

const SettingsProvider = (props) => {
	const [statistics, setStatistics] = useState(true);
	const [log, setLog] = useState(true);
	const [notifications, setNotifications] = useState(true);

	const settingsContext = {
		pomodoroDuration: 1500,
		breakDuration: 300,
		audioVolume: 3,
		isStatistics: statistics,
		isLog: log,
		isNotifications: notifications,
		updateToggles: (statistics, log, notifications) => {
			setStatistics(statistics);
			setLog(log);
			setNotifications(notifications);
		},
	};

	return (
		<SettingsContext.Provider value={settingsContext}>
			{props.children}
		</SettingsContext.Provider>
	);
};

export default SettingsProvider;
