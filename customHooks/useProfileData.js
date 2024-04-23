import { useState, useEffect } from 'react';
import ProfileService from '@/services/profile.service';
const DEFAULT_COLORS = {
	primary: '#080708',
	secondary: '#202121',
	font: '#ffffff'
}

function useProfileData() {
	console.log('hello');
	const [userName, setUserName] = useState(null);
	const [profile, setProfile] = useState(null);
	const [profilePhoto, setProfilePhoto] = useState(null);
	const [headline, setHeadline] = useState('');
	const [colors, setColors] = useState(DEFAULT_COLORS);
	const [links, setLinks] = useState([]);
	const [topFriends, setTopFriends] = useState([]);
	const [articles, setArticles] = useState([]);
	const [blogs, setBlogs] = useState([]);
	const [musicUrl, setMusicUrl] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [pageViews, setPageViews] = useState(true);

	useEffect(() => {
		const profileAPI = new ProfileService();
		if (!userName) return;
		const getProfile = async () => {
			try {
				const response = await profileAPI.get(userName);
				if (response.result) {
					console.log(response.result);
					setProfile(response.result);
					setProfilePhoto(response.result.image_url);
					setHeadline(response.result.headline || '');
					setColors(response.result.colors || DEFAULT_COLORS);
					setLinks(response.result.links);
					setTopFriends(response.result.topFriends?.sort((a, b) => a.position - b.position) || []);
					setArticles(response.result.articles || []);
					setBlogs(response.result.blogs || []);
					setMusicUrl(response.result.music || '');
					setDisplayName(response.result.displayName || '');
					setIsLoading(false);
				}

				const getAnalytics = async () => {
					const analyticsResponse = await profileAPI.updateAnalytics(userName)
					setPageViews(analyticsResponse.result);
					await profileAPI.updateProfileVisited(userName)			
				}
				getAnalytics();
			} catch (err) {
				console.error(err);
				setIsLoading(false);

			}
		};

    getProfile();
  	}, [userName]); // This assumes 'user' does not change frequently. If it does, add it to the dependency array.

	const getRandomProfiles = async () => {
		const profileAPI = new ProfileService();
		console.log('hello');
		try {
			const response = await profileAPI.getRandomProfiles();
			const profiles = response.result
			return profiles
		} catch(err) {
			return {
				error: err,
				message: 'Error getting profiles'
			}
		}
	}

	const handleColorChange = (event) => {
		setColors(value => ({...value, [event.target.name]: event.target.value}));
	}

	const notifyUser = (msg) => {
		toast(msg)
	}

	const setDefaultColors = (e) => {
		e.preventDefault()
		setColors(DEFAULT_COLORS);
	}

	return { 
		profile,
		setProfile,
		headline,
		setHeadline,
		colors,
		setColors,
		links,
		setLinks,
		topFriends,
		setTopFriends,
		articles,
		setArticles,
		blogs,
		setBlogs,
		musicUrl,
		setMusicUrl,
		displayName,
		setUserName,
		setDisplayName,
		isLoading,
		handleColorChange,
		getRandomProfiles,
		notifyUser,
		setDefaultColors,
		pageViews,
		profilePhoto,
		DEFAULT_COLORS,
		setProfilePhoto
	};
}

export default useProfileData;
