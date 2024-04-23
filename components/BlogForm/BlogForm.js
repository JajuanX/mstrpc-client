import React, { useState } from 'react';
import styles from './blogForm.module.scss'
import { v4 as uuidv4 } from 'uuid';
import TextEditor from '../TextEditor/TextEditor';
import BlogService from '@/services/blog.service';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import Link from 'next/link';

const BlogForm = ({closeBlogModal, notifyUser, blogs, setBlogs, userId}) => {
	const [blog, setBlog] = useState('Enter content here')
	const token = window.sessionStorage.getItem("token");
	
	const saveBlog = async (e) => {
		e.preventDefault();
		const blogsAPI = new BlogService();

		const title = e.target.title.value;
		const newBlog = {
			title,
			content: blog,
			user_id: userId
		};
		try {
			const response = await blogsAPI.post(newBlog, token)

			if(response.result) {
				setBlogs(prev => {
					return [
						{
							...newBlog,
							_id: uuidv4()
						},
						...prev,
					]
				})
				
				e.target.reset()
				setUrlPath('')
				closeArticleModal();
			}

			if(response.status === 200 && addBlogToUser.status === 200) {
				setBlogs(prev => {
					return [
						{
							...newBlog,
							_id: uuidv4()
						},
						...prev,
					]
				})
				
				e.target.reset()
				setBlog('')
				closeBlogModal();
			}
			

		} catch(error) {

		}

	}


    return (
		<div className={styles.blogForm}>
			<h2>Blog Form</h2>
			<form onSubmit={saveBlog}>
				<InputField label='Title' color='#444' type='text' name='title' />
				<TextEditor styles={{border: '1px solid black'}} blog={blog} setBlog={setBlog} />
				<Button className={styles.saveButton} type='submit'>Save Changes</Button>
			</form>
			{blogs?.map((blog) => {
				return (
				<Link className={styles.linkContainer} 
					key={blog._id} 
					href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/blogs/${blog._id}`} 
				>
						{blog.title}
				</Link>
				)
			}).reverse()
			}
		</div>
    );
};

export default BlogForm;