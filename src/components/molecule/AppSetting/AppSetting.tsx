import clsx from "clsx";
import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext";
import styles from "./AppSetting.module.css";
function AppSetting() {
	const { removeToken } = useAuth();
	const { currentTheme, setTheme } = useTheme();
	return (
		<div className={styles.AppSetting}>
			<h4 className={styles.header}>App Settings</h4>
			<div className={styles.settingPanel}>
				<div className={styles.settingOption}>
					<p className={styles.label}>Accents:</p>
					<div className={styles.themesOptions}>
						<div
							className={clsx(styles.purple, styles.themeBox, {
								[styles["selectedTheme"]]: currentTheme === "purple",
							})}
							onClick={() => {
								setTheme("purple");
							}}
						/>

						<div
							className={clsx(styles.yellow, styles.themeBox, {
								[styles["selectedTheme"]]: currentTheme === "yellow",
							})}
							onClick={() => {
								setTheme("yellow");
							}}
						/>

						<div
							className={clsx(styles.pink, styles.themeBox, {
								[styles["selectedTheme"]]: currentTheme === "pink",
							})}
							onClick={() => {
								setTheme("pink");
							}}
						/>

						<div
							className={clsx(styles.green, styles.themeBox, {
								[styles["selectedTheme"]]: currentTheme === "green",
							})}
							onClick={() => {
								setTheme("green");
							}}
						/>
					</div>
				</div>
				<div className={styles.settingOption}>
					<p className={styles.label}>Privacy:</p>
					<button onClick={removeToken} className={styles.privacyButton}>
						Remove Chat GPT API key
					</button>
				</div>
			</div>
		</div>
	);
}

export default AppSetting;
