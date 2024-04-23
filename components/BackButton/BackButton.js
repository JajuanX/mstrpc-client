import React from 'react';
import { useRouter } from 'next/navigation';
import BackButtonIcon from '../../assets/backButton.svg'
import Image from 'next/image';
import styles from './backButton.module.scss'

const BackButton = () => {
	const router = useRouter();

	const goBack = () => {
		router.back(); // Navigates to the previous page in the history stack
	};

	return (
		<button className={styles.backButton} onClick={goBack} style={{ /* Add your styling here */ }}>
			<Image src={BackButtonIcon} height={30} width={40}  alt='back'/>
		</button>
	);
};

export default BackButton;