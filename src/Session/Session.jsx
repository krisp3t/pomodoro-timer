import React, {useContext, useEffect, useReducer, useRef, useState} from "react";
import {Box, Heading} from "@chakra-ui/react";

import Interval from "./Interval";
import StateDisplay from "./StateDisplay";
import SessionButtons from "./SessionButtons";
import settingsContext from "../store/settingsContext";
import alarmSound from "../assets/alarm.mp3"
import tomatoLogo from "../assets/tomato.png";

const alarm = new Audio(alarmSound);

export const SESSION_MODES = {
    working: {
        status: "WORKING",
        originalStart: 0,
        currentStart: 0,
        accumulated: 0,
        sessionLength: 0
    },
    breaking: {
        status: "RESTING",
    },
    shortBreak: {
        status: "RESTING",
        length: "SHORT_BREAK",
        originalStart: 0,
        currentStart: 0,
        accumulated: 0,
        sessionLength: 0
    },
    longBreak: {
        status: "RESTING",
        length: "LONG_BREAK",
        originalStart: 0,
        currentStart: 0,
        accumulated: 0,
        sessionLength: 0
    },
    paused: {
        status: "PAUSED",
        originalStart: 0,
        previousState: null
    },
    initial: {
        status: "INITIAL"
    }
}

export default function Session(props) {
    const [timestamp, setTimestamp] = useState(0);
    const [sessionMode, dispatchMode] = useReducer(reducer, SESSION_MODES.initial)
    const intervalRef = useRef();
    const settingsCtx = useContext(settingsContext);
    const numBreaks = useRef(0);

    function startAlarm(volume) {
        alarm.volume = volume;
        alarm.play();
    }

    function displayNotification(status) {
        const text = status === SESSION_MODES.breaking.status ? "Work session completed! Good work, now take a break 😉🔥" : "Break is over - back to grinding! 💪"
        new Notification("Pomodoro Timer", {
            body: text,
            icon: tomatoLogo,
        });
    }

    function reducer(state, action) {
        const start = {originalStart: Date.now(), currentStart: Date.now()}
        switch (action.type) {
            case "START":
                if (state.status === SESSION_MODES.paused.status) {
                    setTimeout(() => props.addItem({
                        ...state,
                        sessionLength: Date.now() - state.originalStart,
                        end: Date.now()
                    }), 0);
                    return {
                        ...state.previousState,
                        currentStart: Date.now(),
                        accumulated: state.originalStart - state.previousState.currentStart + state.previousState.accumulated,
                    };
                }
                return {...SESSION_MODES.working, ...start, sessionLength: action.settingsCtx.pomodoroDuration};
            case "PAUSE":
                return {
                    ...SESSION_MODES.paused, ...start,
                    previousState: state,
                };
            case "RESET":
                setTimestamp(0);
                return SESSION_MODES.initial;
            case "SKIP":
                setTimestamp(0);
                setTimeout(() => props.addItem({
                    ...state,
                    sessionLength: Date.now() - state.originalStart,
                    end: Date.now()
                }, 0));
                return {...SESSION_MODES.working, ...start, sessionLength: action.settingsCtx.pomodoroDuration};
            case "COMPLETED":
                startAlarm(action.settingsCtx.audioVolume);
                if (state.status === SESSION_MODES.working.status) {
                    setTimeout(() => props.addItem({...state, end: Date.now()}), 0);
                    if (action.settingsCtx.isNotifications)
                        displayNotification(SESSION_MODES.breaking.status);
                    if (action.numBreaks % 3 === 0) {
                        return {
                            ...SESSION_MODES.longBreak, ...start,
                            sessionLength: action.settingsCtx.longBreakDuration
                        };
                    } else {
                        return {
                            ...SESSION_MODES.shortBreak, ...start,
                            sessionLength: action.settingsCtx.shortBreakDuration
                        };
                    }
                } else {
                    setTimeout(() => props.addItem({...state, end: Date.now()}), 0);
                    if (action.settingsCtx.isNotifications)
                        displayNotification(SESSION_MODES.working.status);
                    return {...SESSION_MODES.working, ...start, sessionLength: action.settingsCtx.pomodoroDuration};
                }
            default:
                return state;
        }
    }


    useEffect(() => {
        let id = intervalRef.current;
        if (SESSION_MODES.working.status === sessionMode.status) {
            id = setInterval(() => {
                const passedTime = Date.now() - sessionMode.currentStart + sessionMode.accumulated;
                if (passedTime >= settingsCtx.pomodoroDuration) {
                    numBreaks.current++;
                    dispatchMode({type: "COMPLETED", numBreaks: numBreaks.current, settingsCtx: settingsCtx});
                } else {
                    setTimestamp(passedTime);
                }
            }, 250);
        } else if (SESSION_MODES.breaking.status === sessionMode.status) {
            const breakTime = sessionMode.length === SESSION_MODES.shortBreak.length ? settingsCtx.shortBreakDuration : settingsCtx.longBreakDuration;
            id = setInterval(() => {
                const passedTime = Date.now() - sessionMode.currentStart + sessionMode.accumulated;
                const remainingTime = breakTime - passedTime;
                if (passedTime >= breakTime) {
                    dispatchMode({type: "COMPLETED", settingsCtx: settingsCtx});
                } else {
                    setTimestamp(remainingTime);
                }
            }, 250);
        }

        return function cleanup() {
            clearInterval(id);
        }
    }, [sessionMode, settingsCtx])

    return (
        <Box pb={10} textAlign="center">
            <Box pb={5}>
                {sessionMode.status !== SESSION_MODES.initial.status && (<StateDisplay mode={sessionMode.status}/>)}
                <Heading>
                    <Interval timestamp={timestamp}/>
                </Heading>
            </Box>
            <SessionButtons mode={sessionMode} dispatch={dispatchMode}/>
        </Box>
    );
};
