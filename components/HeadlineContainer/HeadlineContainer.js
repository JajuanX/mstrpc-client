import React from 'react';
import styles from './headlineContainer.module.scss';
import Image from 'next/image';
import profilePhoto from '../../assets/test/jajuan.jpeg'

const HeadlineContainer = ({profilePhoto, headline, displayName, colors, DEFAULT_COLORS}) => {
    return (
        <div className={styles.headlineContainer} style={{
			backgroundColor: colors?.secondary || DEFAULT_COLORS.secondary,
			color: colors?.font || DEFAULT_COLORS.font,		
		}}>
			<h1 className={styles.header}>{displayName}</h1>
			<div className={styles.photoContainer}>
				<Image width={100} height={100} className={styles.userPhoto} src={profilePhoto} alt='profile' />
			</div>
			<h2 className='subtitle'>STATEMENT</h2>
			<p className={styles.headline}>{headline || 'Update Your Profile'}</p>
		</div>
    );
};

export default HeadlineContainer;