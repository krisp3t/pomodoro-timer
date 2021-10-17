import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";

import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import SettingsProvider from "./store/SettingsProvider";
import SettingsContext from "./store/settingsContext";

import theme from "./theme";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<SettingsProvider value={SettingsContext}>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</SettingsProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
