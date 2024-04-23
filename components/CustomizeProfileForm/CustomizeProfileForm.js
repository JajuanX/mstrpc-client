import styles from './customizeProfileForm.module.scss'
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import ProfileService from "@/services/profile.service";
import UploadProfilePhoto from '../UploadProfilePhoto/UploadProfilePhoto';

const UpdateUserForm = ({profilePhoto, setProfilePhoto, setDisplayName, setHeadline, displayName, headline, notifyUser, colors, handleColorChange, setDefaultColors}) => {
	const token = sessionStorage.getItem("token");

	const updateUserInfo = async (e) => {
		e.preventDefault()
		console.log('saving');
		const profileAPI = new ProfileService();
		const response = await profileAPI
			.put({
				colors: {
					primary: colors.primary,
					secondary: colors.secondary,
					font: colors.font,
				},
				headline: e.target.headline.value,
				displayName: e.target.displayName.value,
			}, token)
			console.log(response);
		if(response.result) {
			setDisplayName(e.target.displayName.value)
			setHeadline(e.target.headline.value)
		}
		
	}

    return (
		<form onSubmit={updateUserInfo} className={styles.colorsForm}>
			<h2>Update Profile</h2>

			<UploadProfilePhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} text='Upload your profile Pic'/>
			<label>
				Primary Color 
				<input type="color" name='primary' value={colors?.primary} onChange={handleColorChange}></input>
			</label>
			<label>
				Secondary Color 
				<input type="color" name='secondary' value={colors?.secondary} onChange={handleColorChange}></input>
			</label>
			<label>
				Font Color 
				<input type="color" name='font' value={colors?.font} onChange={handleColorChange}></input>
			</label>
			<Button typeOfButton='cancel' type='submit' onClick={setDefaultColors}>Set Default Colors</Button>
			<InputField color='#444' label='Display Name' name='displayName' defaultValue={displayName}/>
			<InputField color='#444' label='Headline' name='headline' defaultValue={headline}/>
			<Button typeOfButton='primary' type='submit'>Save Changes</Button>
		</form>
    );
};

export default UpdateUserForm;