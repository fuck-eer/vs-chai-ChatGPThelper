import React, { useState } from "react";
import styles from "./Header.module.css";
import { BsGearFill } from "react-icons/bs";
import SettingsPopup from "../SettingsPopup/SettingsPopup";
import { FiCornerUpLeft } from "react-icons/fi";
import { useMessageContext } from "../../../contexts/MessagesContext";
import { useTheme } from "../../../contexts/ThemeContext";
export const Header = () => {
	const [showSettings, setShowSettings] = useState(false);
	const {
		messages: { length: allMessagesLength },
		resetMessages,
	} = useMessageContext();
	const { themeColor } = useTheme();
	return (
		<div className={styles.header}>
			<h1>CH.AI</h1>
			<div className={styles.settings}>
				{allMessagesLength > 2 && (
					<button onClick={resetMessages} className={styles.resetButton}>
						<FiCornerUpLeft size={22} color={themeColor} />
						<span>Reset Chat</span>
					</button>
				)}
				<BsGearFill
					className={styles.gearIcon}
					onClick={() => {
						setShowSettings(true);
					}}
					size={24}
					color={themeColor}
				/>
				{showSettings && (
					<SettingsPopup onClose={() => setShowSettings(false)} />
				)}
			</div>
		</div>
	);
};
