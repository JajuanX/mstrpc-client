import axios from "axios";

class ProfileService {
	constructor() {
		this.baseURL = process.env.NEXT_PUBLIC_BASE_URL
	}

	async put(body, token) {
		let result = null;
		let error = null;
		try {
			result = await axios.put(`${this.baseURL}/profiles`, body, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		} catch(error) {
			error = {message: `Could not update profile`, error};
		}

		return { ...result.data, error };
	}

	async get(userName) {
		let result = null;
		let error = null;
		try {
			result = await axios.get(`${this.baseURL}/profiles/${userName}`)
		} catch(error) {
			error = {message: `Could not update profile`, error};
		}
		return { result: result.data, error };
	}

	async getRandomProfiles() {
		let result = null;
		let error = null;

		try {
			result = await axios.get(`${this.baseURL}/profiles/random`)
		} catch(error) {
			error = {message: `Could not update profile`, error};
		}
		
		return { result: result.data, error };
	}

	async updateAnalytics(username) {
		let result = null;
		let error = null;
		try {
			result = await axios.get(`${this.baseURL}/visits/analytics/${username}`, {
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
					'Pragma': 'no-cache',
					'Expires': '0'
				},
			});
		} catch(error) {
			error = {message: `Could not update analytics`, error};
		}

		return {result: result.data, error}
	}

	async updateProfileVisited(username) {
		let result = null;
		let error = null;
		try {
			result = await axios.get(`${this.baseURL}/visits/record/${username}`, {
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
					'Pragma': 'no-cache',
					'Expires': '0'
				},
			});
		} catch(error) {
			error = {message: `Could not update profile visits`, error};
		}

		return {result: result.data, error}
	}
}

export default ProfileService;