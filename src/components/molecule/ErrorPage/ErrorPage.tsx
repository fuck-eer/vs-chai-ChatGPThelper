import React from "react";
import styles from "./ErrorPage.module.css";
const ErrorPage = () => {
	return (
		<div className={styles.errorPage}>
			<p className={styles.logo}>🔐</p>
			<div className={styles.description}>
				<h1>This doesn&apos;t seems to be working!</h1>
				<p>
					Can't Find Chat GPT api key🙄, you can press "CTRL" + "SHIFT" +"P" and
					search for "SAVE GPT API KEY" command, paste your key in the input and
					reload you VSCODE window. If you are wondering how to get an API key
					Visit `https://platform.openai.com/account/api-keys` and create a Key
					<ellipse />
				</p>
			</div>
		</div>
	);
};

export default ErrorPage;
