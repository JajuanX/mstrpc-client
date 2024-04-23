import { useState } from "react";
import TopFriendsForm from "../TopFriendForm/TopFriendsForm";
import MusicForm from "../Music/MusicForm";
import CustomizeProfileForm from "@/components/CustomizeProfileForm/CustomizeProfileForm";
import styles from './multiStep.module.scss'
import { useProfile } from "@/context/profileContext";
import ArticlesForm from "../ArticlesForm/ArticlesForm";
import BlogForm from "../BlogForm/BlogForm";
import Button from "../Button/Button";
import UrlForm from "../UrlForm/UrlForm";

function MultiStepForm({ user }) {
	const { 
		profile,
		headline,
		setHeadline,
		colors,
		links,
		setLinks,
		topFriends,
		setTopFriends,
		articles,
		setArticles,
		setBlogs,
		blogs,
		musicUrl,
		setMusicUrl,
		displayName,
		setDisplayName,
		handleColorChange,
		setDefaultColors,
		profilePhoto,
		setProfilePhoto
	} = useProfile();
	const [currentStep, setCurrentStep] = useState(2);

	const handleFormSwitch = (formName) => {
		setCurrentStep(formName);
	};
	const sections = ['Top Friends','Headline','Blogs', 'Music', 'Articles','Social Media']

	let component = <div className={styles.select}>Select a section above to edit</div>

	switch (currentStep) {
		case 'Top Friends':
			component = <TopFriendsForm 
				topFriends={topFriends} 
				setTopFriends={setTopFriends} 
			/>
			break
		case 'Music':
			component = <MusicForm 
				musicUrl={musicUrl} 
				setMusicUrl={setMusicUrl} 
				
			/>
			break
		case 'Headline': 
			component = <CustomizeProfileForm 
				profilePhoto={profilePhoto}
				setProfilePhoto={setProfilePhoto}
				setHeadline={setHeadline} 
				headline={headline} 
				setDisplayName={setDisplayName}
				displayName={displayName}
				colors={colors} 
				handleColorChange={handleColorChange} 
				setDefaultColors={setDefaultColors} 
			/>
			break
		case 'Social Media': 
			component = <UrlForm 
				setLinks={setLinks} 
				links={links}
			/> 
			break
		case 'Articles': 
			component = <ArticlesForm
				articles={articles} 
				setArticles={setArticles} 
				userId={user?._id}
				profileId={profile._id}			
			/>
			break
		case 'Blogs': 
			component = <BlogForm
				setBlogs={setBlogs} 
				userId={user?._id}
				blogs={blogs}			
			/>
			break
		// Add more cases as per your step components
		default:
		<>Something went wrong</>
	}

	return (
		<section className={styles.multiStep}>
			<h2 className={styles.heading}>Update Profile</h2>
			<nav className={styles.nav}>
				{ sections.map((section) => {
					return(
						<button key={section} style={{
							backgroundColor: currentStep === section ? '#F95C19' : '#444',
						}} className={styles.navButton} type="button" onClick={() => handleFormSwitch(section)}>{section}</button>
					)
				})}
			</nav>
			{component}
		</section>
	)
}

export default MultiStepForm;
