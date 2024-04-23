"use client"

import React  from 'react';
import styles from './musicContainer.module.scss';

const MusicContainer = ({ musicUrl, colors, DEFAULT_COLORS }) => {
	if(!musicUrl) {
		return (
			<section 
				className={styles.musicContainer}
				style={{
					backgroundColor: colors?.secondary,
					color: colors?.font,
				}}
			>
				<h2>My Music</h2>
				<p className={styles.update}>User has no music content</p>
			</section>
		)
	}

    return (
		<section className={styles.musicContainer} 
			style={{
				backgroundColor: colors?.secondary || DEFAULT_COLORS.secondary,
				color: colors?.font || DEFAULT_COLORS.font,
			}}
		>
			<h2>My Music</h2>
			<iframe 
				allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
				frameBorder="0" 
				height="175" 
				style={{width:'92%',height: '175px', maxWidth:'660px', overflow:'hidden', borderRadius:'10px', margin: '0 auto'}} 
				sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
				src={musicUrl || ''}
				scrolling="no">
			</iframe>
		</section>
	)
};

export default MusicContainer;