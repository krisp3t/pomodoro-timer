import React, {useState, useEffect, useMemo} from "react";

import SettingsContext from "./settingsContext";


const SettingsProvider = (props) => {
    const userPreferences = JSON.parse(localStorage.getItem("userPreferences"));

    const [statistics, setStatistics] = useState(true);
    const [log, setLog] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [audioVolume, setAudioVolume] = useState(0.6);
    const [pomodoroDuration, setPomodoroDuration] = useState(1500000);
    const [shortBreakDuration, setShortBreakDuration] = useState(300000);
    const [longBreakDuration, setLongBreakDuration] = useState(1200000);
    const [ignoreShorter, setIgnoreShorter] = useState(60000);

    const settingsContext = useMemo(() => {
        return {
            pomodoroDuration: pomodoroDuration,
            shortBreakDuration: shortBreakDuration,
            longBreakDuration: longBreakDuration,
            ignoreShorter: ignoreShorter,
            audioVolume: audioVolume,
            isStatistics: statistics,
            isLog: log,
            isNotifications: notifications,
            updateInputs: (obj) => {
                setStatistics(obj.isStatistics);
                setLog(obj.isLog);
                setNotifications(obj.isNotifications);
                setAudioVolume(obj.audioVolume);
                setPomodoroDuration(obj.pomodoroDuration);
                setShortBreakDuration(obj.shortBreakDuration);
                setLongBreakDuration(obj.longBreakDuration);
                setIgnoreShorter(obj.ignoreShorter)
                localStorage.setItem("userPreferences", JSON.stringify(obj));
            },
        };
    }, [
        pomodoroDuration,
        shortBreakDuration,
        longBreakDuration,
        audioVolume,
        statistics,
        log,
        notifications,
        ignoreShorter
    ]);


    useEffect(() => {
        if (userPreferences) {
            // Validate localStorage JSON
            const settingsKeys = Object.keys(settingsContext).filter(key => typeof settingsContext[key] !== "function");
            if (settingsKeys.every((k) => userPreferences.hasOwnProperty(k))) {
                settingsContext.updateInputs(userPreferences);
            } else {
                localStorage.removeItem("userPreferences");
            }
        }
    }, [settingsContext, userPreferences]);

    return (
        <SettingsContext.Provider value={settingsContext}>
            {props.children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
