import React, { useState } from "react";
import "../../../App.css";
import styles from "./Footer.module.css";
import { useMessageContext } from "../../../contexts/MessagesContext";
import { IoSend } from "react-icons/io5";
import { BiMessageAltDots } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { useLoading } from "../../../contexts/LoadingContext";
import clsx from "clsx";
import { useTheme } from "../../../contexts/ThemeContext";
function Footer() {
	const [inputValue, setInputValue] = useState("");
	const { addMessage } = useMessageContext();
	const { isLoading } = useLoading();
	const { themeColor } = useTheme();
	const resetField = () => {
		setInputValue("");
	};

	return (
		<form
			className={styles.footer}
			onSubmit={(e) => {
				e.preventDefault();
				addMessage(inputValue);
				resetField();
			}}
		>
			<label className={styles.inputbar}>
				<button
					className={clsx(styles.button, styles.reset)}
					type='button'
					onClick={(e) => {
						e.stopPropagation();
						resetField();
					}}
				>
					<FiX size={22} color='#333333' />
				</button>
				<input
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					value={inputValue}
				/>
			</label>
			{!isLoading ? (
				<button type='submit' className={clsx(styles.button, styles.send)}>
					<IoSend className={styles.icon} size={22} color={themeColor} />
				</button>
			) : (
				<BiMessageAltDots
					className={styles.loading}
					size={22}
					color='#333333'
				/>
			)}
		</form>
	);
}

export default Footer;
