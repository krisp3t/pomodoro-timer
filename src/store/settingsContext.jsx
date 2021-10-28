import React from "react";

const SettingsContext = React.createContext({
	pomodoroDuration: 1500000,
	breakDuration: 300000,
	isStatistics: true,
	isLog: true,
	isNotifications: true,
	audioVolume: 0.6,
});

export default SettingsContext;
