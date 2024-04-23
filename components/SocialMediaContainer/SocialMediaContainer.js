import React  from 'react';
import styles from './socialMediaContainer.module.scss'

const SocialMediaContainer = ({ links, colors }) => {
	const DEFAULT_COLORS = {
		primary: '#080708',
		secondary: '#202121',
		font: '#ffffff'
	}

	if (links.length === 0) {
		return (
			<section className={styles.noSocialMedia}>
				<p>User has no social media links</p>
			</section>
		)
	}
	
    return (
		<section className={styles.socialMediaContainer}>
			{links.map((link) => {
				return(
				<a className={styles.linkContainer} 
					style={{
						backgroundColor: colors?.secondary || DEFAULT_COLORS.secondary,
						color: colors?.font || DEFAULT_COLORS.font
					}}
					key={link.type} 
					href={link.url} 
					rel="noreferrer" 
					target="_blank"
				>
						{`${link.type}.`}
				</a>
				)
			})}
		</section>
    );
};

export default SocialMediaContainer;