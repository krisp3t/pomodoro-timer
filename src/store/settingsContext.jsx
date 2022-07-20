import React from "react";

const SettingsContext = React.createContext({
    pomodoroDuration: 1500000, // 25 min
    shortBreakDuration: 300000, // 5 min
    longBreakDuration: 1200000, // 20 min
    isStatistics: true,
    isLog: true,
    isNotifications: true,
    audioVolume: 0.6,

});

export default SettingsContext;
