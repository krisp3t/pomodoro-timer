import React, { useRef, useContext, useEffect, useState } from "react";
import {
	Heading,
	Flex,
	Button,
	Icon,
	Box,
	Switch,
	Text,
	useDisclosure,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	FormLabel,
} from "@chakra-ui/react";
import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
} from "@chakra-ui/react";
import { VscSettingsGear } from "react-icons/vsc";
import { GiTomato } from "react-icons/gi";

import SettingsContext from "../store/settingsContext";

const Navbar = (props) => {
	const settingsCtx = useContext(SettingsContext);
	const [settingsCandidate, setSettingsCandidate] = useState(settingsCtx);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleToggle = () => (isOpen ? onClose() : onOpen());
	const btnRef = useRef();
	let clickedSave = useRef(false);

	const { colorMode, toggleColorMode } = useColorMode();
	const navbarBg = useColorModeValue("gray.200", "gray.800");

	useEffect(() => {
		if (isOpen) {
			clickedSave.current = false;
			setSettingsCandidate(settingsCtx);
		} else {
			if (clickedSave.current) {
				const { isStatistics, isLog, isNotifications } =
					settingsCandidate;
				settingsCtx.updateToggles(isStatistics, isLog, isNotifications);
			}
		}
	}, [isOpen]);

	return (
		<Flex
			as="nav"
			justify="space-between"
			wrap="wrap"
			padding={6}
			bg={navbarBg}
		>
			<Flex
				align="flex-start"
				justifyContent="center"
				mr={5}
				bgGradient="linear(to-l, #7928CA, red.500)"
				bgClip="text"
				cursor="pointer"
			>
				<Icon as={GiTomato} w={10} h={10} mr={3} color="red.500" />
				<Box>
					<Heading
						as="h1"
						size="lg"
						lineHeight="1.5"
						display="inline-block"
						verticalAlign="-15px"
						h={10}
					>
						Pomodoro Timer
					</Heading>
				</Box>
			</Flex>

			<Box d="flex">
				<Box d="flex" flexDir="column" alignItems="center" mr={10}>
					<Switch
						id="colorModeSwitch"
						onChange={toggleColorMode}
						isChecked={colorMode === "dark"}
						size="md"
					/>
					<FormLabel fontSize="sm" m={0}>
						Dark Mode
					</FormLabel>
				</Box>

				<Button
					onClick={handleToggle}
					leftIcon={<VscSettingsGear />}
					variant="solid"
					colorScheme="black"
					ref={btnRef}
					fontWeight="500"
					shadow="md"
				>
					Settings
				</Button>
			</Box>

			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Configure Pomodoro</DrawerHeader>

					<DrawerBody>
						<Text>Pomodoro length (in minutes)</Text>
						<NumberInput>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Text>Break length (in minutes)</Text>
						<NumberInput>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Text>Display statistics</Text>
						<Switch
							id="isStatistics"
							isChecked={settingsCandidate.isStatistics}
							onChange={() => {
								setSettingsCandidate({
									...settingsCandidate,
									isStatistics:
										!settingsCandidate.isStatistics,
								});
							}}
						/>
						<Text>Display log</Text>
						<Switch
							id="isLog"
							isChecked={settingsCandidate.isLog}
							onChange={() => {
								setSettingsCandidate({
									...settingsCandidate,
									isLog: !settingsCandidate.isLog,
								});
							}}
						/>
						<Text>Display notifications</Text>
						<Switch
							id="isNotifications"
							isChecked={settingsCandidate.isNotifications}
							onChange={() => {
								setSettingsCandidate({
									...settingsCandidate,
									isNotifications:
										!settingsCandidate.isNotifications,
								});
							}}
						/>
						<Text>Alarm volume</Text>
						<Slider defaultValue={0.6} min={0} max={1} step={0.2}>
							<SliderTrack bg="gray.200">
								<Box position="relative" right={10} />
								<SliderFilledTrack bg="blue.500" />
							</SliderTrack>
							<SliderThumb boxSize={6} borderColor="gray.200" />
						</Slider>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
};

export default Navbar;
