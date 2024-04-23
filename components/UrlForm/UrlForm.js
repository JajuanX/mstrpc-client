import React, { useRef, useEffect } from 'react';
import styles from './urlForm.module.scss'
import axios from 'axios';
import InputField from '../InputField/InputField';
import ProfileService from "@/services/profile.service";

const UrlForm = ({notifyUser, links}) => {
	const token = sessionStorage.getItem("token");
	const profileAPI = new ProfileService();
	
	function isValidUrl(url) {
		const pattern = new RegExp('^https:\\/\\/'+ // protocol (https only)
								   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
								   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
								   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
								   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
								   '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
		return !!pattern.test(url);
	}
	const updateLinks = async (e) => {
		e.preventDefault()

		const newLinks = [
			{
				type: 'facebook',
				url: e.target.facebook.value
			},
			{
				type: 'website',
				url: e.target.website.value
			},
			{
				type: 'instagram',
				url: e.target.instagram.value
			},
			{
				type: 'x',
				url: e.target.x.value
			},
		]

		const validationResults = newLinks.map(item => isValidUrl(item.url));
		if (validationResults.includes(false)) return

		const response = await profileAPI.put( 
		{
			links: newLinks,
		}, token)

		if(response.result) {
			setLinks(newLinks);
		}
	}

	const getSocialMediaLink = (links, platform) => {
		const link = links?.find(link => link.type === platform)?.url
		return link || ''
	}

    return (
		<form onSubmit={updateLinks} className={styles.linksForm}>
			<h2>Customize</h2>
			<InputField color='#444' label='facebook.' type="text" name='facebook' defaultValue={getSocialMediaLink(links, 'facebook')}/>
			<InputField color='#444' label='instagram.' type="text" name='instagram' defaultValue={getSocialMediaLink(links, 'instagram')} />
			<InputField color='#444' label='x.' type="text"  name='x' defaultValue={getSocialMediaLink(links, 'x')} />
			<InputField color='#444' label='website.' type="text"  name='website' defaultValue={getSocialMediaLink(links, 'website')} />
			<button className={styles.saveButton} type='submit'>Save Changes</button>
		</form>
    )
}
export default UrlForm;
