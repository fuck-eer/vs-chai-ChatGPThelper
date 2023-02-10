import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";

import { MessagesContextProvider } from "./contexts/MessagesContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";

type TypesOfActions =
	| "alert"
	| "getToken"
	| "setToken"
	| "removeToken"
	| "setTheme"
	| "getTheme";
type ActionType = {
	type: TypesOfActions;
	value?: string;
};
declare global {
	interface Window {
		tsvscode: {
			postMessage: (actionObj: ActionType) => void;
		};
	}
}
const tsvscode = window.tsvscode;
export type TsVscodeGlobalType = typeof tsvscode;
ReactDOM.render(
	<AuthContextProvider tsvscode={tsvscode}>
		<ThemeContextProvider tsvscode={tsvscode}>
			<LoadingContextProvider>
				<MessagesContextProvider>
					<App />
				</MessagesContextProvider>
			</LoadingContextProvider>
		</ThemeContextProvider>
	</AuthContextProvider>,
	document.getElementById("root") as HTMLElement
);
