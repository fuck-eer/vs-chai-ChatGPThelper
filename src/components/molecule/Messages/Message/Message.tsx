import React from "react";
import clsx from "clsx";
import Avatar from "../../../atom/Avatar/Avatar";
import styles from "./Message.module.css";

export type MessageType = {
	id: string;
	type: "ai" | "user";
	message: string;
	isLoading?: boolean;
};
const Message = ({ id, message, type, isLoading = false }: MessageType) => {
	return (
		<div
			className={clsx(styles.message, {
				[styles["ai"]]: type === "ai",
				[styles["isLoading"]]: isLoading,
			})}
		>
			<Avatar type={type} />
			<p>{message.trim()}</p>
		</div>
	);
};

export default Message;
