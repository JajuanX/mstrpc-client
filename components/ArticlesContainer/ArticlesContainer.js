import React from 'react';
import styles from './articlesContainer.module.scss';
import Link from 'next/link';

const ArticlesContainer = ({articles, colors}) => {
	if(articles.length === 0) {
		return (
			<div className={styles.noArticles}
				style={{
					backgroundColor: colors?.secondary,
					color: colors?.font
				}}
			>
				<h2>Articles</h2>
				<p>User has no Articles to share</p>
			</div>
		)
	}
    return (
		<section  
			className={styles.articlesContainer} 
			style={{
				backgroundColor: colors?.secondary,
				color: colors?.font
			}} >
			<h2>My Articles</h2>
			{articles?.map((article) => {
				return (
				<Link style={{
						color: colors?.font,
					}}
					className={styles.linkContainer} 
					key={article._id} 
					href={article.link_url} 
					rel="noreferrer" 
					target="_blank">
						{article.title || article.link_url}
				</Link>
				)
			}).reverse()
			}
		</section>
    );
};

export default ArticlesContainer;