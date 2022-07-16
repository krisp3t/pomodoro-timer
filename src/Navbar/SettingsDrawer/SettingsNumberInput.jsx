import React from "react";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";


export default function SettingsNumberInput() {
    return (

        <NumberInput
            defaultValue={
                30000
            } // TODO: settingsCtx
            min={5}
            max={60}
            step={1}
        >
            <NumberInputField/>
            <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
            </NumberInputStepper>
        </NumberInput>
    )

}