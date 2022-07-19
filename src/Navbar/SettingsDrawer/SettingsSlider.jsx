import React from "react";
import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack} from "@chakra-ui/react";


export default function SettingsSlider(props) {
    return (
        <Slider
            min={0}
            max={1}
            step={0.2}
            defaultValue={props.value}
            value={props.value}
            onChange={props.onChange}
        >
            <SliderTrack bg="gray.200">
                <Box position="relative" right={10}/>
                <SliderFilledTrack bg="blue.500"/>
            </SliderTrack>
            <SliderThumb
                boxSize={6}
                borderColor="gray.200"
            />
        </Slider>
    );
}