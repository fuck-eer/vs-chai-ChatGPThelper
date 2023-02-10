import React, { useContext, useState, useEffect } from "react";
import { TsVscodeGlobalType } from "..";

type MessageArgType = {
	data: {
		value: ThemeType;
		type: string;
	};
};
export enum Colors {
	yellow = "#f0a202",
	purple = "#be03fd",
	pink = "#f72585",
	green = "#39ff14",
}

const allThemes = ["yellow", "pink", "purple", "green"] as const;
type ThemeType = typeof allThemes[number];
type ThemeContextType = {
	currentTheme: ThemeType;
	themeColor: Colors;
	setTheme: (theme: ThemeType) => void;
};

const ThemeContext = React.createContext<ThemeContextType>({
	currentTheme: "yellow",
	themeColor: Colors.yellow,
	setTheme: () => {},
});

export const ThemeContextProvider = ({
	children,
	tsvscode,
}: {
	children: React.ReactNode;
	tsvscode: TsVscodeGlobalType;
}) => {
	const [currentTheme, setCurrentTheme] = useState<ThemeType>("yellow");
	useEffect(() => {
		const messageEventListener = async ({ data }: MessageArgType) => {
			switch (data.type) {
				case "theme": {
					setTheme(data.value);
				}
			}
		};
		window.addEventListener("message", messageEventListener);
		tsvscode.postMessage({ type: "getTheme" });
		return () => {
			window.removeEventListener("message", messageEventListener);
		};
	}, []);
	useEffect(() => {
		document.documentElement.style.setProperty(
			"--accent-theme",
			Colors[currentTheme]
		);
	}, [currentTheme]);

	const setTheme = (theme: ThemeType) => {
		if (theme === currentTheme) return;
		setCurrentTheme(theme);
		tsvscode.postMessage({ type: "setTheme", value: theme });
	};
	return (
		<ThemeContext.Provider
			value={{
				currentTheme,
				themeColor: Colors[currentTheme],
				setTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme should be used inside ThemeProvider");
	}
	return context;
};
