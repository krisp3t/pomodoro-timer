import React from "react";

const SettingsContext = React.createContext({
	pomodoroDuration: 1500,
	breakDuration: 300,
	isStatistics: true,
	isLog: true,
	isNotifications: true,
	audioVolume: 0.6,
});

export default SettingsContext;
