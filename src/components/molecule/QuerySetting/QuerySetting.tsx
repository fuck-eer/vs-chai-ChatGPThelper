import React from "react";
import { Models, useMessageContext } from "../../../contexts/MessagesContext";
import { getRandomId } from "../../../utils";
import InputDropdown, {
	optionType,
} from "../../atom/InputDropdown/InputDropdown";
import InputField from "../../atom/InputField/InputField";
import Slider from "../../atom/Slider/Slider";
import styles from "./QuerySetting.module.css";

const ModelOptions: optionType[] = [
	{ id: getRandomId(), label: Models.adaTextQuery, value: Models.adaTextQuery },
	{
		id: getRandomId(),
		label: Models.babbageTextQuery,
		value: Models.babbageTextQuery,
	},
	{
		id: getRandomId(),
		label: Models.curieTextQuery,
		value: Models.curieTextQuery,
	},
	{
		id: getRandomId(),
		label: Models.cushmanCodeEditQuery,
		value: Models.cushmanCodeEditQuery,
	},
	{
		id: getRandomId(),
		label: Models.cushmanCodeQuery,
		value: Models.cushmanCodeQuery,
	},
	{
		id: getRandomId(),
		label: Models.davinciCodeEditQuery,
		value: Models.davinciCodeEditQuery,
	},
	{
		id: getRandomId(),
		label: Models.davinciCodeQuery,
		value: Models.davinciCodeQuery,
	},
	{
		id: getRandomId(),
		label: Models.davinciTextEditQuery,
		value: Models.davinciTextEditQuery,
	},
	{
		id: getRandomId(),
		label: Models.davinciTextQuery,
		value: Models.davinciTextQuery,
	},
];

const QuerySetting = () => {
	const {
		top_p,
		setQueryTop_p,
		temperature,
		setQueryTemperature,
		model,
		setQueryModel,
		maxToken,
		setQueryMaxToken,
	} = useMessageContext();
	return (
		<div className={styles.querySettings}>
			<h4 className={styles.header}>Query Settings</h4>
			<div className={styles.inputArea}>
				<InputDropdown
					classes={styles.dropdown}
					label='Model'
					onChange={(e, option) => {
						setQueryModel(option?.value ?? Models.davinciTextQuery);
					}}
					id='ModelDropdown'
					name='ModelDropdown'
					options={ModelOptions}
					selectedValue={ModelOptions.find((option) => model === option.value)}
				/>
				<InputField
					label='Max_Token'
					classes={styles.input}
					type='number'
					onChange={(e) => {
						setQueryMaxToken(parseInt(e.target.value));
					}}
					value={`${maxToken}`}
				/>
			</div>
			<div className={styles.sliderArea}>
				<Slider
					id='tempSlider'
					label='Temperature'
					min={0}
					max={100}
					onChange={(e) => setQueryTemperature(parseInt(e.target.value) / 100)}
					value={temperature * 100}
					leftIcon={<span className='emoji'>🤖</span>}
					rightIcon={<span className='emoji'>🧠</span>}
				/>
				<Slider
					id='top_pSlider'
					label='Top_P'
					min={0}
					max={100}
					onChange={(e) => setQueryTop_p(parseInt(e.target.value) / 100)}
					value={top_p * 100}
					leftIcon={<span className='emoji'>🤖</span>}
					rightIcon={<span className='emoji'>🧠</span>}
				/>
			</div>
		</div>
	);
};

export default QuerySetting;
