"use client"

import styles from './pageViewsContainer.module.scss'

const PageViewsContainer = ({userName, pageViews, colors }) => {
	const DEFAULT_COLORS = {
		primary: '#080708',
		secondary: '#202121',
		font: '#ffffff'
	}
    return (
		<section className={styles.pageViewsContainer} 
			style={{
				backgroundColor: colors?.secondary || DEFAULT_COLORS.secondary,
				color: colors?.font || DEFAULT_COLORS.font
			}}>
			<h2>{userName} Page Visits</h2>
			<div className={styles.viewsContainer}>
				<p>{pageViews.yearly} This Year</p>
				<p>{pageViews.weekly} PAST WEEK</p>
				<p>{pageViews.monthly} PAST MONTH</p>
				<p>{pageViews.daily} PAST DAY</p>
			</div>
		</section>
	)
};

export default PageViewsContainer;