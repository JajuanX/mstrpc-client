import axios from "axios";

class UsersService {
	constructor() {
		this.baseURL = process.env.NEXT_PUBLIC_BASE_URL
	}

	async updateProfilePhoto(url) {
		let result = null;
		let error = null;
		try {
			result = await axios.post(`${this.baseURL}/users`,{
				fieldName: image_url,
                value: url
			}, {
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

}

export default UsersService;