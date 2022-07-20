import React, {useReducer} from "react";
import {Container, VStack} from "@chakra-ui/layout";
import {Divider} from "@chakra-ui/react";

import Navbar from "./Navbar/Navbar";
import Session from "./Session/Session";
import Stats from "./Stats/Stats";

export default function App() {
    const [completed, dispatchCompleted] = useReducer(reducer, {work: [], breaks: [], pauses: []})

    function reducer(state, action) {
        switch (action.status) {
            case "WORKING":
                if (state.work.length > 0 && action.currentStart === state.work[state.work.length - 1].currentStart)
                    return state;
                return {...state, work: [...state.work, action]};
            case "BREAKING":
                if (state.breaks.length > 0 && action.currentStart === state.breaks[state.breaks.length - 1].currentStart)
                    return state;
                return {...state, breaks: [...state.breaks, action]};
            case "PAUSED":
                if (state.pauses.length > 0 && action.currentStart === state.pauses[state.pauses.length - 1].currentStart)
                    return state;
                return {...state, pauses: [...state.pauses, action]};
            default:
                return state;
        }
    }

    return (
        <React.Fragment>
            <Navbar/>
            <Container maxW="container.lg" centerContent p={6}>
                <VStack w="100%">
                    <Session addItem={dispatchCompleted}/>
                    <Divider borderColor="gray.200"/>
                    <Stats actions={completed}/>
                    <Divider borderColor="gray.200"/>
                </VStack>
            </Container>
        </React.Fragment>
    )
}