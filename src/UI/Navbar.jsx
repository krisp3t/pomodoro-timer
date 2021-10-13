import React, { useRef } from "react";
import { Heading, Flex, Button, Input, useDisclosure } from "@chakra-ui/react";
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

const Navbar = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleToggle = () => (isOpen ? onClose() : onOpen());
	const btnRef = useRef();

	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding={6}
			bg="gray.200"
			{...props}
		>
			<Flex align="center" mr={5}>
				<Heading as="h1" size="lg">
					Pomodoro Timer
				</Heading>
			</Flex>

			<Button
				onClick={handleToggle}
				leftIcon={<VscSettingsGear />}
				variant="outline"
				colorScheme="black"
				ref={btnRef}
			>
				Settings
			</Button>

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
						<Input placeholder="Type here..." />
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="blue">Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
};

export default Navbar;
