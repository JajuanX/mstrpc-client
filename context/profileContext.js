import { createContext, useContext } from 'react';
import useProfileData from '../customHooks/useProfileData';

export const Profile = createContext({});

export function ProfileProvider({ children }) {
	const profileData = useProfileData();

	return <Profile.Provider value={profileData}>{children}</Profile.Provider>
}

export const useProfile = () => useContext(Profile);
