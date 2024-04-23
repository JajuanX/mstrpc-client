import axios from "axios";

class ArticleService {
	constructor() {
		this.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/articles`
	}

	async post(body, profileId, token) {
		let result = null;
		let error = null;
		try {
			result = await axios.post(`${this.baseURL}`, {...body, profileId}, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		} catch(error) {
			error = {message: `Could not update profile`, error};
		}

		return { ...result.data, error };
	}

	async delete(articleId, profileId) {
		let result = null;
		let error = null;
		try {
			result = await axios.post(`${this.baseURL}/${articleId}/${profileId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		} catch(error) {
			error = {message: `Could not update profile`, error};
		}

		return { ...result.data, error };
	}
}

export default ArticleService;