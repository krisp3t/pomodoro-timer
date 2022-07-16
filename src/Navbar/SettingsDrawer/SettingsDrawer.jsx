import React, {useContext, useState} from "react";
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

    console.log(settingsCtx); // TODO: remove

    function updateSettings() {
        // TODO
    }

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
                            <SettingsNumberInput value={settingsCandidate.pomodoroDuration} min="5" max="120"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Short break length (minutes)</FormLabel>
                            <SettingsNumberInput value={settingsCandidate.breakDuration} min="1" max="15"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Long break length (minutes)</FormLabel>
                            <SettingsNumberInput value={settingsCandidate.breakDuration} min="1" max="15"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Display statistics</FormLabel>
                            <SettingsSwitch value={settingsCandidate.isStatistics}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Display log</FormLabel>
                            <SettingsSwitch value={settingsCandidate.isLog}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Display notifications</FormLabel>
                            <SettingsSwitch value={settingsCandidate.isNotifications}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Alarm volume</FormLabel>
                            <SettingsSlider value={settingsCandidate.audioVolume}/>
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