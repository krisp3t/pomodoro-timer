import React from "react";
import {Box, Button} from "@chakra-ui/react";
import {VscClearAll} from "react-icons/vsc";

import {SESSION_MODES} from "../Session/Session";
import LogMode from "./LogMode";

export default function Log(props) {
    // const actionArray = props.items.filter((action) => {
    //     return action.type !== "PAUSE_END" || action.diffTimestamp > 30000;
    // });
    // if (actionArray.length !== 0) {
    //     localStorage.setItem("log", JSON.stringify(actionArray));
    // }
    //
    // const logItems = actionArray.map((action) => (
    //     <LogItem key={action.key} action={action}/>
    // ));

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
                <LogMode mode={SESSION_MODES.working.status} items={props.items.work}/>
                <LogMode mode={SESSION_MODES.breaking.status} items={props.items.breaks}/>
                <LogMode mode={SESSION_MODES.paused.status} items={props.items.pauses}/>
            </Box>
        </Box>
    );
};
