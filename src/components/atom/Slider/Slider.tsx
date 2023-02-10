import clsx from "clsx";
import React from "react";
import styles from "./Slider.module.css";

export type SliderProps = {
	value: number;
	min: number;
	max: number;
	classes?: string;
	label?: string;
	id?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
};
const Slider = ({
	max,
	min,
	onChange,
	value,
	classes,
	id,
	label,
	leftIcon,
	rightIcon,
}: SliderProps) => {
	return (
		<div className={clsx(styles.sliderContainer, classes)}>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
			<div className={styles.inputField}>
				{leftIcon}
				<input
					id={id}
					className={styles.slider}
					type='range'
					min={min}
					max={max}
					value={value}
					onChange={onChange}
				/>
				{rightIcon}
			</div>
		</div>
	);
};

export default Slider;
