import React, { useState } from 'react';
import { S3 } from '@aws-sdk/client-s3';
import styles from './uploadProfilePhoto.module.scss'
import Image from 'next/image';
import { useProfile } from "@/context/profileContext";
import ProfileService from '@/services/profile.service';

const UploadProfilePhoto = ({required = false, text}) => {
    const profileAPI = new ProfileService()
    const {setProfilePhoto, profilePhoto} = useProfile();
	const token = sessionStorage.getItem("token");

	const uploadProfilePhoto = async (selectedFile) => {
        const s3 = new S3({
            region: 'us-east-1',

            credentials: {
                accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
                secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
            }
        });
		const fileName = selectedFile.name || '';
        const params = {
			Bucket: "driven-prod-bucket", 
            Key: `${fileName}`,
            Body: selectedFile,
            ContentType: 'image/jpeg' // or the appropriate content type
        };

        try {
            await s3.putObject(params);
			const encodedFileName = encodeURIComponent(fileName);
			const photoUrl = `https://${params.Bucket}.s3.us-east-1.amazonaws.com/${encodedFileName}`;
            await profileAPI.put( 
                {
                    image_url: photoUrl,
                }, token)
            setProfilePhoto(photoUrl);
        } catch (error) {
            alert('Upload failed');
            console.error(error);
        }
    };

    const handleFileInput = (e) => {
		e.preventDefault()
		uploadProfilePhoto(e.target.files[0])
    };

    return (
        <div className={styles.uploadProfilePhoto}>
			<label htmlFor='fileInput'>
				<input id='fileInput' style={{ display: 'none' }} required={required} type="file" onChange={handleFileInput} />
                {profilePhoto ? (
                    <div
                        className={styles.imageContainer}
                        style={{ cursor: 'pointer' }}>
                        <Image width={100} height={100} src={profilePhoto} alt='Uploaded photo' layout='fixed' />
                    </div>
                ) : (
                    <div className={styles.label}
                        style={{ cursor: 'pointer' }}>
                        {text}
                    </div>
                )}
			</label>
        </div>
    );
};

export default UploadProfilePhoto;