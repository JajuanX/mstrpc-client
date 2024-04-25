import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

// Custom hook to read auth record and user profile doc
function useUserData() {
	const [ user, setUser ] = useState(null);
	const [userIsLoading, setUserIsLoading] = useState(true);
	const userToken =  typeof window !== 'undefined' ? window.sessionStorage.getItem('token') : null;
	const router = useRouter();

	useEffect(() => {
		if(!userToken) return setUserIsLoading(false);
		const getUser = async () => {
			try {
				const response = await axios.get('http://localhost:8080/users/current', {
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				})
				console.log(response);
				setUser(response.data);
				setUserIsLoading(false);
			} catch (error) {
				console.log(error.response.status === 403);
				if (error.response.status === 403) {
					window.sessionStorage.removeItem('token')
				}
				setUserIsLoading(false);
			} 
		}

		getUser();
	}, [router])

	const getCurrentUser = async () => {
		const response = await axios.get('http://localhost:8080/users/current', {
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})
		return response.data
	}

	const login = async (email, password) => {
		try {
			const response = await axios.post('http://localhost:8080/users/login', {
				email,
				password
			})
			window.sessionStorage.setItem("token", response.data.token);

		} catch (error) {
			return {
				success: false,
				msg: 'Failed to log in succesfully'
			}
		}
	}

	const logout = () => {
		window.sessionStorage.removeItem("token");
		setUser(null);
	}


	return { 
		user,
		login,
		getCurrentUser,
		logout,
		userIsLoading
	};
}

export default useUserData;
