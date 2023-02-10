import clsx from "clsx";
import React from "react";
import styles from "./InputField.module.css";

export type InputFieldType = {
	id?: string;
	label: React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	type?: React.HTMLInputTypeAttribute;
	value?: string;
	classes?: string;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
	label,
	onBlur,
	onChange,
	onFocus,
	id,
	leftIcon,
	rightIcon,
	type,
	value,
	classes,
}: InputFieldType) => {
	return (
		<div className={clsx(styles.inputBox, classes)}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}
			<div className={styles.inputField}>
				{leftIcon}
				<input
					value={value}
					onBlur={onBlur}
					onChange={onChange}
					onFocus={onFocus}
					id={id}
					className={styles.htmlInput}
					type={type}
				/>
				{rightIcon}
			</div>
		</div>
	);
};

export default InputField;
