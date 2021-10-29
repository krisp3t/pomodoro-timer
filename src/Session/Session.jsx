import React from "react";

import { Button, ButtonGroup, Box, Heading } from "@chakra-ui/react";
import { VscDebugStart, VscDebugPause, VscDebugRestart } from "react-icons/vsc";
import { RiSkipForwardLine } from "react-icons/ri";

import Interval from "./Interval";
import StateDisplay from "./StateDisplay";
import { SESSION_STATE } from "../App";

const Session = (props) => {
	return (
		<Box pb={10} textAlign="center">
			{props.sessionState !== SESSION_STATE.initial.status && (
				<StateDisplay sessionState={props.sessionState} />
			)}
			<Box pb={5}>
				<Heading>
					<Interval timestamp={props.timestamp} />
				</Heading>
			</Box>
			<ButtonGroup spacing="6">
				<Button
					colorScheme="green"
					onClick={props.onButton.onStart}
					isDisabled={[
						SESSION_STATE.working.status,
						SESSION_STATE.break.status,
					].includes(props.sessionState)}
					leftIcon={<VscDebugStart />}
					shadow="md"
				>
					Start
				</Button>
				<Button
					colorScheme="red"
					onClick={props.onButton.onPause}
					isDisabled={[
						SESSION_STATE.paused.status,
						SESSION_STATE.initial.status,
					].includes(props.sessionState)}
					leftIcon={<VscDebugPause />}
					shadow="md"
				>
					Pause
				</Button>
				<Button
					colorScheme="gray"
					onClick={props.onButton.onReset}
					leftIcon={<VscDebugRestart />}
					shadow="md"
				>
					Reset
				</Button>
				<Button
					colorScheme="blue"
					onClick={props.onButton.onSkip}
					leftIcon={<RiSkipForwardLine />}
					shadow="md"
					d={
						props.sessionState === SESSION_STATE.break.status
							? "flex"
							: "none"
					}
				>
					Skip
				</Button>
			</ButtonGroup>
		</Box>
	);
};

export default Session;
