import React from "react";
import {Box, Text, Badge, Icon} from "@chakra-ui/react";
import {IoMdClock} from "react-icons/io";
import {VscDebugStart} from "react-icons/vsc";

import {timestampToOutput} from "../Session/Interval";

export default function LogItem(props) {
    const originalStart = new Date(props.action.originalStart);
    return (
        <>
            <Box display="flex" alignItems="center" mb={2} justifyContent="space-between">
                <Badge
                    display="flex"
                    alignItems="center"
                    textTransform="none"
                    borderWidth="1px"
                    borderRadius="lg"
                    colorScheme={props.colorScheme}
                >
                    <Icon as={VscDebugStart} display="inline" mr={1}/>
                    <Text>
                        {originalStart.getHours().toString().padStart(2, 0)}:{originalStart.getMinutes().toString().padStart(2, 0)}
                    </Text>
                </Badge>
                <Badge
                    display="flex"
                    alignItems="center"
                    borderWidth="1px"
                    borderRadius="lg"
                    colorScheme={props.colorScheme}
                >
                    <Icon as={IoMdClock} display="inline" mr={1}/>
                    {timestampToOutput(props.action.sessionLength)}
                </Badge>
            </Box>
        </>
    );
};

// export default function LogItem(props) {
//     // let content;
//     // switch (props.action.type) {
//     //     case "WORKING_END":
//     //         content = (
//     //             <ActionCompleted
//     //                 title="Completed"
//     //                 icon={VscCheck}
//     //                 action={props.action}
//     //             />
//     //         );
//     //         break;
//     //     case "PAUSE_END":
//     //         content = (
//     //             <ActionCompleted
//     //                 title="Pause"
//     //                 icon={VscDebugPause}
//     //                 action={props.action}
//     //                 pauseLength={calculateMinSec(props.action.pauseLength)}
//     //             />
//     //         );
//     //         break;
//     //     case "BREAK_END":
//     //         content = (
//     //             <ActionCompleted
//     //                 title="Break"
//     //                 icon={GiNightSleep}
//     //                 action={props.action}
//     //             />
//     //         );
//     //         break;
//     //     default:
//     //         break;
//     // }
//     return (
//         <Box
//             m="auto"
//             w="80%"
//             mb={5}
//             px={4}
//             py={2}
//             borderWidth="1px"
//             borderRadius="lg"
//             overflow="hidden"
//             shadow="md"
//         >
//             test
//         </Box>
//     );
// };
