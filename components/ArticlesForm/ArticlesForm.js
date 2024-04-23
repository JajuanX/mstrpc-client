import React, { useState } from 'react';
import styles from './articlesForm.module.scss'
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import ToolsService from '@/services/tools.service';
import InputFieldOnChangeValue from '../InputFieldOnChangeValue/InputFieldOnChangeValue';
import ArticleService from '@/services/article.service';

const ArticlesForm = ({setArticles, closeArticleModal, userId, profileId, notifyUser}) => {
	const [imageUrl, setUrlPath] = useState('');
	const [inputs, setInputs] = useState({
		title: '',
		article_url: '',
		url: '',
		image_url: '',
		description: '',
	});
	const token = sessionStorage.getItem("token");
	const ToolsApi = new ToolsService()
	const articlesAPI = new ArticleService();
	

	const uploadArticle = async (e) => {
		e.preventDefault()

		const newArticle = {
			user_id: userId,
			link_url: inputs.url,
			image_url: inputs.image_url,
			title: inputs.title,
			description: inputs.description
		}
		try {
			const response = await articlesAPI.post(newArticle, profileId, token)

			if(response.result) {
				setArticles(prev => {
					return [
						{
							...newArticle,
							_id: uuidv4()
						},
						...prev,
					]
				})
				
				e.target.reset()
				setUrlPath('')
				closeArticleModal();
			}

		} catch(error) {

		}
	}

	const handlePaste = (event) => {
		const clipboardData = event.clipboardData || window.clipboardData;
		const pastedData = clipboardData.getData('text');
		getOgData(pastedData)
		
	}
	function isValidUrl(url) {
		const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
			'((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|'+ // domain name
			'localhost|'+ // localhost
			'\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})'+ // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*'+ // port and path
			'(\\?[;&a-zA-Z\\d%_.~+=-]*)?'+ // query string
			'(\\#[-a-zA-Z\\d_]*)?$','i'); // fragment locator
		return !!pattern.test(url);
	}

	const getOgData = async (url) => {
		// if(!isValidUrl(url)) return
		const response = await ToolsApi.openGraph(url)
		if(response.result.data) {
			const ogData = response.result.data
			setInputs({
				title: ogData.ogTitle || '',
				article_url: ogData.ogUrl || '',
				url: inputs.url || url,
				image_url: ogData.ogImage ? ogData?.ogImage[0].url : '',
				description: ogData.ogDescription || ''
			})
		}
		
		if(response.error) {
			console.error(response.error);
		}
	}

	const handleChange = (e) => {
		e.preventDefault()
		setInputs(value => ({...value, [e.target.name]: e.target.value}));
	}

    return (
		<form onSubmit={uploadArticle} className={styles.articlesForm}>
			<h2>Share Article</h2>
			<label className={styles.label}>
				<input
					className={styles.inputOnChange}
					onPaste={handlePaste}
					placeholder="Paste a link here" 
				/>
			</label>
			{/* label='Email' type="text" name="email" placeholder="juanx@masterpiece.com" */}
			<InputFieldOnChangeValue value={inputs.title} onchange={handleChange} color='#444' label='Title' type='text' name='title' placeholder='The greatest story ever told'/>
			<InputFieldOnChangeValue value={inputs.article_url} onchange={handleChange} color='#444' label='Article Link' type='text' name='article_url' placeholder='https://medium.com/@jajuanburton'/>
			<InputFieldOnChangeValue value={inputs.description} onchange={handleChange} color='#444' label='Description' type='text' name='description' placeholder='https://medium.com/@jajuanburton'/>
			{inputs.image_url &&
				<img src={inputs.image_url} alt='urls pasted'  />
			}
			<Button
				typeOfButton="primary"  
				type='submit'>
					Save Changes
			</Button>
		</form>
    )
}
export default ArticlesForm;
