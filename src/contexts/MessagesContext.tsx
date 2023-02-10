import React, { useContext, useState } from "react";
import type { MessageType } from "../components/molecule/Messages/Message/Message";
import { getCompletionsFromOpenAI } from "../openai";
import { getRandomId } from "../utils";
import { useAuth } from "./AuthContext";
import { useLoading } from "./LoadingContext";
type defaultContextValue = {
	messages: MessageType[];
	maxToken: number;
	top_p: number;
	temperature: number;
	model: Models;
	addMessage: (msg: string) => void;
	resetMessages: () => void;
	setQueryTemperature: (n: number) => void;
	setQueryTop_p: (n: number) => void;
	setQueryMaxToken: (n: number) => void;
	setQueryModel: (model: Models) => void;
};
export enum Models {
	davinciTextQuery = "text-davinci-002",
	davinciTextEditQuery = "text-davinci-edit-002",
	curieTextQuery = "text-curie-002",
	babbageTextQuery = "text-babbage-002",
	adaTextQuery = "text-ada-002",
	davinciCodeQuery = "code-davinci-002",
	cushmanCodeQuery = "code-cushman-002",
	davinciCodeEditQuery = "code-davinci-edit-002",
	cushmanCodeEditQuery = "code-cushman-edit-002",
}

const MessagesContext = React.createContext<defaultContextValue>({
	messages: [],
	maxToken: 500,
	top_p: 1,
	temperature: 0.5,
	model: Models.davinciTextQuery,
	addMessage: (msg: string) => {},
	resetMessages: () => {},
	setQueryTemperature: (n: number) => {},
	setQueryTop_p: (n: number) => {},
	setQueryMaxToken: (n: number) => {},
	setQueryModel: (model: Models) => {},
});

export const MessagesContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { token } = useAuth();
	const { setLoading } = useLoading();
	const [model, setModel] = useState(Models.davinciTextQuery);
	const [temperature, setTemperature] = useState(0.5);
	const [top_p, setTop_p] = useState(1);
	const [maxToken, setMaxToken] = useState(500);
	const [messages, setMessages] = useState<MessageType[]>([
		{
			id: "initMessage",
			message: `What can I do for you today?`,
			type: "ai",
		},
	]);

	const setQueryTemperature = (temp: number) => {
		setTemperature(temp);
	};
	const setQueryMaxToken = (maxTokens: number) => {
		setMaxToken(maxTokens);
	};
	const setQueryTop_p = (top_P: number) => {
		setTop_p(top_P);
	};

	const setQueryModel = (model: Models) => {
		setModel(model);
	};

	const addMessage = async (message: string) => {
		if (!message) {
			return;
		}
		await setMessages((prev) => [
			...prev,
			{ id: getRandomId(), message, type: "user" },
		]);
		setLoading(true);
		const messageResponse = await getCompletionsFromOpenAI(token, {
			model,
			//jus to avoid state batching  added message at the end..
			prompt:
				messages.map((m, i) => (i === 0 ? "" : m.message)).join("") + message,
			max_tokens: maxToken,
			temperature,
			top_p,
		});
		await setMessages((prev) => [
			...prev,
			{ id: getRandomId(), message: messageResponse, type: "ai" },
		]);
		setLoading(false);
	};
	const resetMessages = () => {
		setMessages([
			{
				id: "initMessage",
				message: "What can I do for you today?",
				type: "ai",
			},
		]);
	};
	return (
		<MessagesContext.Provider
			value={{
				maxToken,
				model,
				temperature,
				top_p,
				addMessage,
				messages,
				resetMessages,
				setQueryMaxToken,
				setQueryModel,
				setQueryTemperature,
				setQueryTop_p,
			}}
		>
			{children}
		</MessagesContext.Provider>
	);
};

export const useMessageContext = () => {
	const context = useContext(MessagesContext);
	if (!context) {
		throw new Error("Messages should be used inside messagesProvider");
	}
	return context;
};
