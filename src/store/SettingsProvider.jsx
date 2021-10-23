import React, { useState } from "react";

import SettingsContext from "./settingsContext";

const SettingsProvider = (props) => {
	const [statistics, setStatistics] = useState(true);
	const [log, setLog] = useState(true);
	const [notifications, setNotifications] = useState(true);
	const [audioVolume, setAudioVolume] = useState(0.6);
	const [pomodoroDuration, setPomodoroDuration] = useState(1500);
	const [breakDuration, setBreakDuration] = useState(300);

	const settingsContext = {
		pomodoroDuration: pomodoroDuration,
		breakDuration: breakDuration,
		audioVolume: audioVolume,
		isStatistics: statistics,
		isLog: log,
		isNotifications: notifications,
		updateToggles: (obj) => {
			setStatistics(obj.isStatistics);
			setLog(obj.isLog);
			setNotifications(obj.isNotifications);
			setAudioVolume(obj.audioVolume);
			setPomodoroDuration(obj.pomodoroDuration);
			setBreakDuration(obj.breakDuration);
		},
	};

	return (
		<SettingsContext.Provider value={settingsContext}>
			{props.children}
		</SettingsContext.Provider>
	);
};

export default SettingsProvider;
