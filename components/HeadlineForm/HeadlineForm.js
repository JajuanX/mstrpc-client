import React, { useRef, useEffect } from 'react';
import styles from './headlineForm.module.scss'
import axios from 'axios';
// consider Passing a function definition to run this modal dynamically
// pass function as props
// 
const HeadlineForm = ({notifyUser, headline, setHeadline, closeModal}) => {
	const token = window.sessionStorage.getItem("token");

	const updateHeadline = async (e) => {
		e.preventDefault()
		const newHeadline = e.target.headline.value

		try {
			const response = await axios
				.put('http://localhost:8080/users/profile/6562c85f271226be78b62809',
				{
					fieldName: 'headline',
					value: newHeadline
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
			if(response.status === 200) {
				setHeadline(newHeadline)
				closeModal();;
			}
			

		} catch(error) {

		}

	}

    return (
        <form onSubmit={updateHeadline} className={styles.headlineForm}>
			<h2>Update Headline</h2>
			<label>
				Headline
				<textarea name='headline' defaultValue={headline}></textarea>
			</label>
			<button className={styles.saveButton} type='submit'>Save Changes</button>
		</form>
    );
};

export default HeadlineForm;