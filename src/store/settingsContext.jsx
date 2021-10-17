import React from "react";

const SettingsContext = React.createContext({
	pomodoroDuration: 1500,
	breakDuration: 300,
	isStatistics: true,
	isLog: true,
	isNotifications: true,
	audioVolume: 3,
});

export default SettingsContext;
