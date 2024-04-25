"use client"

import { useUserContext } from "@/context/userContext";
import styles from "./signUp.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import UploadPhoto from "@/components/UploadPhoto/UploadPhoto";
import BackButton from "@/components/BackButton/BackButton";
import Link from "next/link";

export default function SignUp() {
	const [urlPath, setUrlPath] = useState('')
	const router = useRouter();

	const createProfile = async (e) => {
		e.preventDefault();
		const user = {
			name: {
				firstName: e.target.firstName.value,
				lastName: e.target.lastName.value
			},
			email: e.target.email.value,
			username: e.target.username.value,
			password: e.target.password.value,
			image_url: urlPath,
		}

		try {
			const response = await axios.post('http://localhost:8080/users/register', user)
			router.push('/login')

		} catch(error) {

		}

	}


	return (
		<main className={styles.signUp}>
			<Toaster />
			<BackButton />
			<h1>Sign Up</h1>
			<form className={styles.container} onSubmit={createProfile}>

				<UploadPhoto urlPath={urlPath} setUrlPath={setUrlPath} text='Upload Profile Picture' />
				<InputField label='Email' type="text" name="email" placeholder="admin@mstrpc.io" />
				<InputField label='First Name' type="text" name="firstName" placeholder="Jajuan" />
				<InputField label='Last Name' type="text" name="lastName" placeholder="X" />
				<InputField label='Username' type="text" name="username" placeholder="JuanX" />
				<InputField label='Password' type="password" name="password" placeholder='********' />
				<Button 
					type='submit' 
					typeOfButton="primary">
						Submit
				</Button>
				<Link href='/login'>
					Already a user?
				</Link>
			</form>
		</main>
	);
}
