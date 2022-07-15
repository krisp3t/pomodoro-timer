import React from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay
} from "@chakra-ui/react";
import {VStack} from "@chakra-ui/layout";

export default function SettingsDrawer(props) {
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

                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme="black"
                        onClick={() => {
                            props.updateSettings();
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