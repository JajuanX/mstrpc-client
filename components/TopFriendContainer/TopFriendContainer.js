import React  from 'react';
import styles from './topFriendContainer.module.scss'
import Image from 'next/image';
import Icon from '../Icon/Icon';
import Link from 'next/link';

const TopFriendContainer = ({ topFriends, colors}) => {
	if(topFriends.length === 0) {
		return (
			<div className={styles.topFriendContainer}
			style={{
				backgroundColor: colors?.secondary,
				color: colors?.font,
			}}>
				<h2 className={styles.heading}>My Top 5</h2>
				<p>User has no Top 5</p>
			</div>
		)
	}

    return (
		<section className={styles.topFriendContainer} 
			style={{
				backgroundColor: colors?.secondary,
				color: colors?.font,
			}}>
			<h2 className={styles.heading}>My Top 5</h2>
			<div className={styles.friendsContainer}>
				{topFriends?.map((friend) => {
					return (
						<Link style={{
							color: colors?.font,
						}} href={friend.url} key={friend._id} className={styles.topFriend} rel="noreferrer" target="_blank">
							<div key={friend.position} className={styles.photoContainer}>
								<Image width={100} height={100} className={styles.friendPhoto} src={friend.pictureUrl} alt='friend' />
							</div>
							<div className={styles.iconContainer}>
								<Icon icon={friend.source} size='20'/>
								<div>{friend.name}</div>
							</div>
						</Link>
					)
				})}
			</div>
		</section>
    );
};

export default TopFriendContainer;