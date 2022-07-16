import React from "react";
import {Switch} from "@chakra-ui/react";


export default function SettingsSwitch(props) {
    return (
        <Switch
            id={props.id}
            defaultChecked={props.value}
        />
    )
}