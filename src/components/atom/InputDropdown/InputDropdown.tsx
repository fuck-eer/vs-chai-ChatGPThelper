import clsx from "clsx";
import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { RxDotFilled } from "react-icons/rx";
import { Models } from "../../../contexts/MessagesContext";
import { useTheme } from "../../../contexts/ThemeContext";
import styles from "./InputDropdown.module.css";

export type optionType = { id: string; label: string; value: Models };
export type DropdownProps = {
	options: optionType[];
	placeholder?: string;
	onChange: (e: React.MouseEvent<HTMLDivElement>, value?: optionType) => void;
	name?: string;
	label?: string;
	id?: string;
	classes?: string;
	selectedValue?: optionType;
	onDropdownBlur?: React.FocusEventHandler<HTMLInputElement>;
};
const InputDropdown = ({
	onChange,
	options,
	placeholder,
	classes,
	label,
	id,
	name,
	selectedValue,
	onDropdownBlur,
}: DropdownProps) => {
	const [showOptions, setShowOptions] = useState(false);
	const { themeColor } = useTheme();
	return (
		<div className={clsx(styles.dropdown, classes)}>
			{showOptions && (
				<div
					className={styles.backdrop}
					onClick={() => {
						setShowOptions(false);
					}}
				/>
			)}
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
			<div
				className={clsx(styles.inputField, {
					[styles["visibleOptions"]]: showOptions,
				})}
				onClick={() => setShowOptions((prev) => !prev)}
			>
				<input
					readOnly
					id={id}
					name={name}
					className={styles.htmlInput}
					placeholder={placeholder ? placeholder : "Select a value"}
					value={selectedValue ? selectedValue.label : ""}
					onBlur={onDropdownBlur}
				/>
				<HiChevronDown
					className={clsx({ [styles["openCaret"]]: showOptions })}
					size={20}
				/>
			</div>
			{showOptions && (
				<div className={styles.options}>
					{options.map((opt) => (
						<div
							className={clsx(styles.option, {
								[styles["selected"]]: opt.value === selectedValue?.value,
							})}
							key={opt.id}
							onClick={(e) => {
								onChange(e, opt);
							}}
							id={opt.id}
						>
							{opt.label}
							{opt.value === selectedValue?.value && (
								<RxDotFilled color={themeColor} size={18} />
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default InputDropdown;
