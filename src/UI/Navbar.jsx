import React, { useRef } from "react";
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
} from "@chakra-ui/react";
import { VscSettingsGear } from "react-icons/vsc";
import { GiTomato } from "react-icons/gi";

const Navbar = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleToggle = () => (isOpen ? onClose() : onOpen());
	const btnRef = useRef();

	const { colorMode, toggleColorMode } = useColorMode();
	const navbarBg = useColorModeValue("gray.200", "gray.800");

	return (
		<Flex
			as="nav"
			align="center"
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

			<Box>
				<Switch
					id="colorModeSwitch"
					onChange={toggleColorMode}
					isChecked={colorMode === "dark"}
					mr={10}
				/>
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
						<Switch id="isStatistics" />
						<Text>Display log</Text>
						<Switch id="isLog" />
						<Text>Display notifications</Text>
						<Switch id="isNotifications" />
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="black">Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
};

export default Navbar;
