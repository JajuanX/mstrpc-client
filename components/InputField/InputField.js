import React from 'react';
import styles from './inputField.module.scss'

const InputField = ({ label, type = 'text', placeholder, name, color = 'white', defaultValue = '' }) => {
	return (
		<div className={styles.inputFieldContainer}>
			<label style={{color: `${color}`}} htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				defaultValue={defaultValue}
			/>
		</div>
	);
};

export default InputField;