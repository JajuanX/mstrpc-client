import React, { useRef, useEffect } from 'react';
import styles from './musicForm.module.scss'
import axios from 'axios';
import convertToEmbedUrl from '@/utils/convertToEmbedUrl';
import InputField from '../InputField/InputField';
import ProfileService from '@/services/profile.service';
import Button from '../Button/Button';
import MusicSearch from '../MusicSearch/MusicSearch';


const MusicForm = ({notifyUser, musicUrl, setMusicUrl, closeModal}) => {
	const token = window.sessionStorage.getItem("token");
	
	const updateMusic = async (e) => {
		e.preventDefault()
		const newMusicUrl = e.target.musicUrl.value;
		const embedUrl = convertToEmbedUrl(newMusicUrl);
		try {
			const profileAPI = new ProfileService();
			const response = await profileAPI
				.put({
					music: embedUrl,
				}, token)

			if(response.result) {
				setMusicUrl(embedUrl);
				closeModal();
			}

		} catch(error) {
		}

	}

    return (
        <form onSubmit={updateMusic} className={styles.musicForm}>
			<h2>Update Music</h2>
			<MusicSearch />
			<div>
				<InputField 
					label='Insert Apple Music URL' 
					color='#444' 
					type='text' 
					name='musicUrl' 
					defaultValue={musicUrl} 
					placeholder='https://music.apple.com/us/album/must-be-the-money-prettyboy-remix/104146276?i=104144210'
				/>
				<p className={styles.helperText}>Ex: https://music.apple.com/us/album/must-be-the-money-prettyboy-remix/104146276?i=104144210</p>
			</div>
			<Button className={styles.saveButton} type='submit'>Save Changes</Button>
		</form>
    );
};

export default MusicForm;