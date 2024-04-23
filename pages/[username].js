import { useUserContext } from "@/context/userContext";
import { useProfile } from "@/context/profileContext";
import styles from "./user.module.scss";
import { useEffect } from "react";
import { useParams } from 'next/navigation'
import { Toaster } from "react-hot-toast";
import HeadlineContainer from "@/components/HeadlineContainer/HeadlineContainer";
import SocialMediaContainer from "@/components/SocialMediaContainer/SocialMediaContainer";
import TopFriendContainer from "@/components/TopFriendContainer/TopFriendContainer";
import ArticlesContainer from "@/components/ArticlesContainer/ArticlesContainer";
import MusicContainer from "@/components/MusicContainer/MusicContainer";
import PageViewsContainer from "@/components/PageViewsContainer/PageViewsContainer";
import BackButton from "@/components/BackButton/BackButton";
import BlogsContainer from "@/components/BlogsContainer/BlogsContainer";
import MultiStepForm from "@/components/MultiStep/MultiStep";
import { useRouter } from "next/router";
import Head from "next/head";
import CustomHead from "@/components/Head/CustomHead";

export default function Home() {
	const router = useRouter();
	const {username} = router.query;
	const { user, userIsLoading } = useUserContext();
	const params = useParams();
	const { 
		profile,
		headline,
		profilePhoto,
		colors,
		links,
		topFriends,
		articles,
		blogs,
		musicUrl,
		displayName,
		setUserName,
		isLoading,
		pageViews,
		DEFAULT_COLORS,
		setProfilePhoto
	} = useProfile();

	useEffect(() => {
		setUserName(username);
	}, [username])


	if (userIsLoading) return <div className={styles.loadingState}>Getting user data...</div>;
	if (isLoading) return <div className={styles.loadingState}>Getting profile data...</div>;
	
	return (
		<>
			<CustomHead
				displayName={displayName}
				imageUrl={profilePhoto}
				description={headline}
				colors={colors}
			/>
			<main className={styles.user} style={{backgroundColor: colors?.primary}}>
				<Toaster />
				<BackButton />
				{profile.user_id === user?._id && <MultiStepForm 
					user= {user}
				/>}
				
				{/* Headline */}
				<HeadlineContainer 
					headline={headline}
					displayName={displayName}
					profilePhoto={profilePhoto}
					colors={colors}
					DEFAULT_COLORS={DEFAULT_COLORS}
				/>
				
				{/* Music */}
				<MusicContainer	
					colors={colors} 
					musicUrl={musicUrl} 
					DEFAULT_COLORS={DEFAULT_COLORS}
				/>

				{/* Social Media  */}
				<SocialMediaContainer 
					links={links} 
					colors={colors} 
				/>

				{/* Top Friends */}
				<TopFriendContainer 
					colors={colors} 
					topFriends={topFriends} 
				/>

				{/* Articles */}
				<ArticlesContainer 
					articles={articles} 
					colors={colors} 
				/>
				
				{/* Blogs */}
				<BlogsContainer 
					blogs={blogs} 
					colors={colors} 
				/>

				{/* Page Views */}
				<PageViewsContainer 
					className={styles.visitorsContainer} 
					userName={user?.username} 
					colors={colors} 
					pageViews={pageViews}
				/>
			</main>
		</>
	);
}
