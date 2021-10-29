import React, { useRef, useContext, useEffect, useState } from "react";
import {
	Heading,
	Flex,
	Button,
	Icon,
	Box,
	Switch,
	Text,
	VStack,
	useDisclosure,
	useColorMode,
	useColorModeValue,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	FormLabel,
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
	const { colorMode, toggleColorMode } = useColorMode();
	const navbarBg = useColorModeValue("gray.200", "gray.800");

	const btnRef = useRef();
	let clickedSave = useRef(false);

	/* Use current settings values at open drawer */
	useEffect(() => {
		if (isOpen) {
			clickedSave.current = false;
			setSettingsCandidate(settingsCtx);
		}
	}, [isOpen, settingsCtx]);

	/* Save drawer */
	useEffect(() => {
		if (!isOpen && clickedSave.current) {
			localStorage.setItem(
				"userPreferences",
				JSON.stringify(settingsCandidate)
			);
			settingsCtx.updateToggles(settingsCandidate);
		}
	}, [isOpen, settingsCtx, settingsCandidate]);

	return (
		<Flex
			as="nav"
			justify="space-between"
			wrap="wrap"
			p={{ base: 4, md: 6 }}
			pt={{ base: 2, md: 6 }}
			bg={navbarBg}
		>
			<Flex
				align="flex-start"
				justifyContent="center"
				mr={5}
				pb={{ base: 4, md: 0 }}
				w={{ base: "100%", md: "auto" }}
			>
				<Icon
					as={GiTomato}
					w={10}
					h={10}
					mr={3}
					color="red.500"
					cursor="pointer"
				/>
				<Box>
					<Heading
						as="h1"
						size="lg"
						lineHeight="1.5"
						display="inline-block"
						verticalAlign="-15px"
						h={10}
						bgGradient="linear(to-l, #7928CA, red.500)"
						bgClip="text"
						cursor="pointer"
					>
						Pomodoro Timer
					</Heading>
				</Box>
			</Flex>

			<Box
				d="flex"
				w={{ base: "100%", md: "auto" }}
				px={{ base: 6, md: 0 }}
				justifyContent={{ base: "space-between", md: "inherit" }}
			>
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
						<VStack spacing={4} align="left">
							<Box>
								<Text>Pomodoro length (in minutes)</Text>
								<NumberInput
									defaultValue={
										+settingsCandidate.pomodoroDuration /
										60000
									}
									min={1}
									max={60}
									onChange={(val) => {
										setSettingsCandidate({
											...settingsCandidate,
											pomodoroDuration: val * 60000,
										});
									}}
								>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</Box>
							<Box>
								<Text>Break length (in minutes)</Text>
								<NumberInput
									defaultValue={
										+settingsCandidate.breakDuration / 60000
									}
									min={1}
									max={15}
									onChange={(val) => {
										setSettingsCandidate({
											...settingsCandidate,
											breakDuration: val * 60000,
										});
									}}
								>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</Box>
							<Box>
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
							</Box>
							<Box>
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
							</Box>
							<Box>
								<Text>Display notifications</Text>
								<Switch
									id="isNotifications"
									isChecked={
										settingsCandidate.isNotifications
									}
									onChange={() => {
										setSettingsCandidate({
											...settingsCandidate,
											isNotifications:
												!settingsCandidate.isNotifications,
										});
									}}
								/>
							</Box>
							<Box>
								<Text>Alarm volume</Text>
								<Slider
									min={0}
									max={1}
									step={0.2}
									defaultValue={settingsCandidate.audioVolume}
									onChangeEnd={(val) => {
										setSettingsCandidate({
											...settingsCandidate,
											audioVolume: val,
										});
									}}
								>
									<SliderTrack bg="gray.200">
										<Box position="relative" right={10} />
										<SliderFilledTrack bg="blue.500" />
									</SliderTrack>
									<SliderThumb
										boxSize={6}
										borderColor="gray.200"
									/>
								</Slider>
							</Box>
						</VStack>
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme="black"
							onClick={() => {
								clickedSave.current = true;
								onClose();
							}}
						>
							Save
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
};

export default Navbar;
