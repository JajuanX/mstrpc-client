import React from 'react';
import styles from './inputFieldOnChangeValue.module.scss'

const InputFieldOnChangeValue = ({ label, value, type = 'text', placeholder, name, color = 'white', onchange }) => {
	return (
		<div className={styles.inputFieldContainer}>
			<label style={{color: `${color}`}} htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				onChange={onchange}
				value={value}
			/>
		</div>
	);
};

export default InputFieldOnChangeValue;