import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    VStack
} from "@chakra-ui/react";
import SettingsNumberInput from "./SettingsNumberInput";
import SettingsSlider from "./SettingsSlider";
import SettingsSwitch from "./SettingsSwitch";
import SettingsContext from "../../store/settingsContext";

export default function SettingsDrawer(props) {
    const settingsCtx = useContext(SettingsContext);
    const [settingsCandidate, setSettingsCandidate] = useState(settingsCtx);

    console.log("ctx", settingsCtx); // TODO: remove

    function updateSettings() {
        settingsCtx.updateInputs(settingsCandidate);
    }

    function onChangeCandidate(val) {
        setSettingsCandidate({
            ...settingsCandidate,
            ...val
        })
    }

    useEffect(() => {
        setSettingsCandidate(settingsCtx)
    }, [props.isOpen, settingsCtx])

    return (
        <Drawer
            placement="right"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>Configure Pomodoro</DrawerHeader>

                <DrawerBody>
                    <VStack spacing={4} align="left">
                        <FormControl>
                            <FormLabel>Pomodoro length (minutes)</FormLabel>
                            <SettingsNumberInput value={settingsCandidate.pomodoroDuration} min="5" max="120"
                                                 onChange={(val) => onChangeCandidate({pomodoroDuration: +val * 60000})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Short break length (minutes)</FormLabel>
                            <SettingsNumberInput value={settingsCandidate.shortBreakDuration} min="1" max="15"
                                                 onChange={(val) => onChangeCandidate({shortBreakDuration: +val * 60000})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Long break length (minutes)</FormLabel>
                            <SettingsNumberInput value={settingsCandidate.longBreakDuration} min="1" max="60"
                                                 onChange={(val) => onChangeCandidate({longBreakDuration: +val * 60000})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Display statistics</FormLabel>
                            <SettingsSwitch value={settingsCandidate.isStatistics}
                                            onChange={(e) => onChangeCandidate({isStatistics: e.target.checked})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Display log</FormLabel>
                            <SettingsSwitch value={settingsCandidate.isLog}
                                            onChange={(e) => onChangeCandidate({isStatistics: e.target.checked})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Display notifications</FormLabel>
                            <SettingsSwitch value={settingsCandidate.isNotifications}
                                            onChange={(e) => onChangeCandidate({isStatistics: e.target.checked})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Alarm volume</FormLabel>
                            <SettingsSlider value={settingsCandidate.audioVolume}
                                            onChange={(val) => onChangeCandidate({audioVolume: val})}/>
                        </FormControl>
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme="black"
                        onClick={() => {
                            updateSettings();
                            props.onClose();
                        }}
                    >
                        Save
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}