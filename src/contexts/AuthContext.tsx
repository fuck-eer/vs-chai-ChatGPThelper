import React, { useContext, useEffect, useState } from "react";
import { TsVscodeGlobalType } from "..";
import ErrorPage from "../components/molecule/ErrorPage/ErrorPage";
type DefaultContextValue = {
	token: string;
	removeToken: () => void;
};
type MessageArgType = {
	data: {
		value: string;
		type: string;
	};
};
const AuthContext = React.createContext<DefaultContextValue>({
	token: "",
	removeToken: () => {},
});

export const AuthContextProvider = ({
	children,
	tsvscode,
}: {
	tsvscode: TsVscodeGlobalType;
	children: React.ReactNode;
}) => {
	const [token, setToken] = useState("");
	useEffect(() => {
		const messageEventListener = async ({ data }: MessageArgType) => {
			switch (data.type) {
				case "token": {
					setToken(data.value);
				}
			}
		};
		window.addEventListener("message", messageEventListener);
		tsvscode.postMessage({ type: "getToken" });
		return () => {
			window.removeEventListener("message", messageEventListener);
		};
	}, []);

	const removeToken = () => {
		tsvscode.postMessage({ type: "removeToken" });
	};

	if (token) {
		return (
			<AuthContext.Provider value={{ token, removeToken }}>
				{children}
			</AuthContext.Provider>
		);
	}
	return <ErrorPage />;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth should be used inside AuthContextProvider");
	}
	return context;
};
