import axios from "axios";

class BlogService {
	constructor() {
		this.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`

	}
	
	async post(body, token) {
		let result = null;
		let error = null;
		try {
			result = await axios.post(`${this.baseURL}`, body, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		} catch(error) {
			error = {message: `Could not update profile`, error};
		}

		return { ...result.data, error };
	}
	
	async get(id) {
		let result = null;
		let error = null;
		try {
			result = await axios.get(`${this.baseURL}/${id}`)
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

export default BlogService;