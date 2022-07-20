import React from "react";
import {Tag, useColorModeValue} from "@chakra-ui/react";

export default function StateDisplay(props) {
    const bg = useColorModeValue("gray.200", "gray.800");
    const capitalizeText =
        props.mode.charAt(0).toUpperCase() +
        props.mode.slice(1).toLowerCase().replaceAll("_", " ");
    return (
        <Tag letterSpacing="1.5px" mb={3} shadow="sm" bgColor={bg}>
            {capitalizeText}
        </Tag>
    );
};
