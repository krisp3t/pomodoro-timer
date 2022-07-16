import React from "react";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay, Text
} from "@chakra-ui/react";
import {VStack} from "@chakra-ui/layout";
import SettingsNumberInput from "./SettingsNumberInput";
import SettingsSlider from "./SettingsSlider";
import SettingsSwitch from "./SettingsSwitch";

export default function SettingsDrawer(props) {
    function updateSettings() {
        console.log("// TODO");
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
                        <Box>
                            <Text>Pomodoro length (minutes)</Text>
                            <SettingsNumberInput/>
                        </Box>
                        <Box>
                            <Text>Break length (minutes)</Text>
                            <SettingsNumberInput/>
                        </Box>
                        <Box>
                            <Text>Display statistics</Text>
                            <SettingsSwitch/>
                        </Box>
                        <Box>
                            <Text>Display log</Text>
                            <SettingsSwitch/>
                        </Box>
                        <Box>
                            <Text>Display notifications</Text>
                            <SettingsSwitch/>
                        </Box>
                        <Box>
                            <Text>Alarm volume</Text>
                            <SettingsSlider/>
                        </Box>
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