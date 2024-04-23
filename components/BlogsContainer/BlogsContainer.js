import React from 'react';
import styles from './blogsContainer.module.scss';
import Link from 'next/link';

const BlogsContainer = ({blogs, colors}) => {
	if(blogs.length === 0) {
		return (
			<div className={styles.noBlogs}
				style={{
					backgroundColor: colors?.secondary,
					color: colors?.font
				}}
			>
				<h2>Blogs</h2>
				<p>User has no Blogs to share</p>
			</div>
		)
	}

    return (
		<section  
			className={styles.blogsContainer} 
			style={{
				backgroundColor: colors?.secondary,
				color: colors?.font
			}} >
			<h2>My Blogs</h2>
			{blogs?.map((blog) => {
				return (
				<Link className={styles.linkContainer} 
					style={{
						color: colors?.font,
					}}
					key={blog._id} 
					href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/blogs/${blog._id}`} 
				>
						{blog.title}
				</Link>
				)
			}).reverse()
			}
		</section>
    );
};

export default BlogsContainer;