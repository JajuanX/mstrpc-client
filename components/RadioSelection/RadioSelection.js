import React, { useState } from 'react';
import styles from './radioSelection.module.scss'; // Import the CSS file for styling

const RadioSelection = ({ options, setSource, source }) => {

	return (
		<div className={styles.radioSelection}>
			{options.map(option => (
			<label key={option} className={styles.radioOption}
				style={{
					backgroundColor: source === option ? '#F95C19' : '#444',
				}}
			>
				<input
					type="radio"
					value={option}
					checked={source === option}
					onChange={() => setSource(option)}
				/>
				{option}
			</label>
			))}
		</div>
	);
};

export default RadioSelection;
