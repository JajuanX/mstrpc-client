import React from 'react';
import styles from './inputFieldOnChange.module.scss'

const InputFieldOnChange = ({defaultValue, label, type = 'text', placeholder, name, color = 'white', onchange }) => {
	return (
		<div className={styles.inputFieldContainer}>
			<label style={{color: `${color}`}} htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				onChange={onchange}
				defaultValue={defaultValue}
			/>
		</div>
	);
};

export default InputFieldOnChange;