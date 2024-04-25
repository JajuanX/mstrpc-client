import React from 'react';
import { useUserContext } from '@/context/userContext'; 
import { useRouter } from 'next/navigation'
import styles from './Login.module.scss';
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import Link from 'next/link';

export default function Login() {
	const {login} = useUserContext();
	const router = useRouter();

	const login__getToken = async (e) => {
		e.preventDefault()
		const userCredentials = {
			email: e.target.email.value,
			password: e.target.password.value
		}
		const response = await login(userCredentials.email, userCredentials.password);
		console.log(response);
		router.push('/')
	}
	

	return (
		<div className={styles.loginPage}>
			<h1>Log In</h1>
			<form className={styles.signUpForm} onSubmit={login__getToken}>
				<InputField className='input-single'
					placeholder="IE: john.doe@gmail.com"
					name="email"
					label='Email'
				/>
				<InputField
					placeholder="Enter a Password"
					type="password"
					label='Password'
					name="password"
				/>
				<Button type='submit'>Log In</Button>
			</form>
			<Link className={styles.notMember} href="/signup">
					Not a Member
				</Link>
		</div>
	)
}