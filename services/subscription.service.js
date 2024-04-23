import axios from "axios";

class SubscriptionService {
	constructor() {
		this.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/stripe`
	}

	async createCheckoutSession(body) {
		let result = null;
		let error = null;
		try {
			result = await axios.post(`${this.baseURL}/create-checkout-session`, body)
		} catch(error) {
			error = {message: `Could not update profile`, error};
		}
		console.log(result.data);
		return { result, error };
	}

	async createPortalSession(body) {
		let result = null;
		let error = null;
		try {
			result = await axios.post(`${this.baseURL}/create-portal-session`, body)
		} catch(error) {
			error = {message: `Could not update profile`, error};
		}

		return { result, error };
	}

}

export default SubscriptionService;