import React from "react";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";

export default function SettingsNumberInput(props) {
    return (
        <NumberInput
            defaultValue={
                props.value / 60000
            }
            min={props.min}
            max={props.max}
            step={1}
            value={props.value / 60000}
            onChange={props.onChange}
        >
            <NumberInputField/>
            <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
            </NumberInputStepper>
        </NumberInput>
    )

}