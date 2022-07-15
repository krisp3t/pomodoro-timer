import React from "react";
import {Button} from "@chakra-ui/react";
import {VscSettingsGear} from "react-icons/all";

export default function SettingsButton(props) {
    return (
        <Button
            leftIcon={<VscSettingsGear/>}
            variant="solid"
            colorScheme="black"
            fontWeight="500"
            shadow="md"
            onClick={props.onClick}
        >
            Settings
        </Button>
    )
}