import React from "react";
import { useMessageContext } from "../../../contexts/MessagesContext";
import Message from "./Message/Message";
import "../../../App.css";
import { useLoading } from "../../../contexts/LoadingContext";

const Messages = () => {
	const { messages } = useMessageContext();
	const { isLoading } = useLoading();
	return (
		<div className='messageHolder'>
			{messages.map(({ id, message, type }, index) => (
				<Message
					key={id}
					id={id}
					message={message}
					type={type}
					isLoading={
						index === messages.length - 1 && type === "user" && isLoading
					}
				/>
			))}
		</div>
	);
};

export default Messages;
