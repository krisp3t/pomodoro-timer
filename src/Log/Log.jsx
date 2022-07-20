import React from "react";
import {Box, Button} from "@chakra-ui/react";
import {VscClearAll} from "react-icons/vsc";
import {VscCheck, VscDebugPause} from "react-icons/vsc";
import {GiNightSleep} from "react-icons/gi";

import {SESSION_MODES} from "../Session/Session";
import LogMode from "./LogMode";

export default function Log(props) {
    return (
        <Box w="100%">
            <Box textAlign="right" mb={5}>
                <Button
                    size="sm"
                    colorScheme="gray"
                    onClick={props.clear}
                    leftIcon={<VscClearAll/>}
                >
                    Clear Log
                </Button>
            </Box>
            <Box display="flex" flexDirection="row" w="100%" gap={10}>
                <LogMode mode={SESSION_MODES.working.status} items={props.items.work} colorScheme={"green"}
                         icon={VscCheck}/>
                <LogMode mode={SESSION_MODES.breaking.status} items={props.items.breaks} colorScheme={"blue"}
                         icon={GiNightSleep}/>
                <LogMode mode={SESSION_MODES.paused.status} items={props.items.pauses} colorScheme={"red"}
                         icon={VscDebugPause}/>
            </Box>
        </Box>
    );
};
