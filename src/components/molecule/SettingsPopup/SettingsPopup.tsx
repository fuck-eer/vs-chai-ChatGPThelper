import React from "react";
import AppSetting from "../AppSetting/AppSetting";
import QuerySetting from "../QuerySetting/QuerySetting";
import styles from "./SettingsPopup.module.css";

const SettingsPopup = ({ onClose }: { onClose: () => void }) => {
	return (
		<>
			<div className={styles.backdrop} onClick={onClose} />
			<div className={styles.settingsPopup}>
				<QuerySetting />
				<AppSetting />
				<p className={styles.subtext}>
					Made with <span className={styles.themeHeart}>♥</span> by fuck.eer.
				</p>
			</div>
		</>
	);
};

export default SettingsPopup;
