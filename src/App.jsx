import React, {useContext, useReducer} from "react";
import {Container, VStack} from "@chakra-ui/layout";
import {Divider} from "@chakra-ui/react";

import Navbar from "./Navbar/Navbar";
import Session from "./Session/Session";
import Stats from "./Stats/Stats";
import Log from "./Log/Log";
import settingsContext from "./store/settingsContext";


export default function App() {
    const [completed, dispatchCompleted] = useReducer(reducer, {work: [], breaks: [], pauses: []})
    const settingsCtx = useContext(settingsContext);

    function reducer(state, action) {
        switch (action.status) {
            case "WORKING":
                if (state.work.length > 0 && action.currentStart === state.work[state.work.length - 1].currentStart)
                    return state;
                return {...state, work: [...state.work, action]};
            case "BREAKING":
                if (state.breaks.length > 0 && action.currentStart === state.breaks[state.breaks.length - 1].currentStart)
                    return state;
                // TODO: ignore shorter than...
                return {...state, breaks: [...state.breaks, action]};
            case "PAUSED":
                if (state.pauses.length > 0 && action.currentStart === state.pauses[state.pauses.length - 1].currentStart)
                    return state;
                return {...state, pauses: [...state.pauses, action]};
            case "CLEAR":
                return {work: [], breaks: [], pauses: []}
            default:
                return state;
        }
    }

    return (
        <>
            <Navbar/>
            <Container maxW="container.lg" centerContent p={6}>
                <VStack w="100%">
                    <Session addItem={dispatchCompleted}/>
                    <Divider borderColor="gray.200"/>
                    {settingsCtx.isStatistics && <><Stats actions={completed}/>
                        <Divider borderColor="gray.200"/></>}
                    {settingsCtx.isLog && <Log items={completed} clear={() => dispatchCompleted({status: "CLEAR"})}/>}
                </VStack>
            </Container>
        </>
    )
}