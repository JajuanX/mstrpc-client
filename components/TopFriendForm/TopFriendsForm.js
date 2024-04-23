import React, { useState } from 'react';
import styles from './topFriendsForm.module.scss'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import PhotoUploadComponent from '../UploadPhoto/UploadPhoto';
import Image from 'next/image';
import RadioSelection from '../RadioSelection/RadioSelection';
import Icon from '../Icon/Icon';
import InputFieldOnChange from '../InputFieldOnChange/InputFieldOnChange';
import Button from '../Button/Button';
import ProfileService from '@/services/profile.service';
import DragIcon from '../../assets/dragcon.svg'
import { v4 as uuidv4 } from 'uuid';

const TopFriendsForm = ({topFriends, setTopFriends, notifyUser}) => {
	const [newFriendUrl, setNewFriendUrl] = useState([]);
	const [urlPath, setUrlPath] = useState('');
	const [source, setSource] = useState('')
	const [name, setName] = useState('')
	const token = sessionStorage.getItem("token");
	const profileAPI = new ProfileService();

	const updateFriends = async (newFriends) => {
		try {
				const response = await profileAPI.put(
			{
				topFriends: newFriends,
			}, token)

			if(response.result) {
				setTopFriends(newFriends)
				return true
			}

		} catch(error) {

		}
	}

	const onDragEnd = async (result) => {
		if (!result.destination) {
			return;
		}
	
		const newItems = Array.from(topFriends);
		const [reorderedItem] = newItems.splice(result.source.index, 1);
		newItems.splice(result.destination.index, 0, reorderedItem);
		const finalPositions = newItems.map((item, index) => {
			return {
				...item,
				position: `${index}`
			}
		})
		setTopFriends(finalPositions)
		updateFriends(finalPositions);
	};

	const handleChange = (event) => {
		setNewFriendUrl(event.target.value);
	}

	const handleNameChange = (event) => {
		setName(event.target.value);
	}

	const addFriend = async (e) => {
		e.preventDefault();
		const newFriend = {
			url: newFriendUrl,
			source: source,
			position: `${topFriends.length}`,
			pictureUrl: urlPath,
			name: name,
		}

		const response = updateFriends([
			...topFriends,
			newFriend
		]);
		if (response) {
			setUrlPath('')
			setSource('')
			setNewFriendUrl('')
		}
	}

	const removeFriend = (position) => {
		const filteredList = topFriends.filter((friend) => {
			return friend.position !== position
		}).map((item, index) => {
			return {
				...item,
				position: index
			}
		})
		updateFriends(filteredList)
	}

	const socialMediaUrl = () => {
		let url = '';
	
		switch(source) {
			case 'instagram.':
				url = 'https://instagram.com/';
				break;
			case 'facebook.':
				url = 'https://facebook.com/';
				break;
			case 'x.':
				url = 'https://x.com/';
				break;
			case 'website.':
				url = 'https://';
				break;
			default:
				break;
		}
	
		return url;
	}
	
	
    return (
		<form className={styles.TopFriendsForm}>
			<section className={styles.createFriend}>
				<h2>Manage Top 5</h2>
				<h4>Create a Friend</h4>					
				<PhotoUploadComponent urlPath={urlPath} setUrlPath={setUrlPath} text='Upload photo of a friend'/>
				<h5>Select a platform</h5>
				<RadioSelection source={source} setSource={setSource} options={['instagram.', 'facebook.', 'x.', 'website.']}/>
				<InputFieldOnChange defaultValue={socialMediaUrl()} color='#444' label='Add Friend Url' placeholder='https://www.instagram.com/driven_juan/' type="text" name='facebook' value={newFriendUrl} onchange={handleChange} />
				<InputFieldOnChange color='#444' label='Name' placeholder='Word to describe person' type="text" name='facebook' value={name} onchange={handleNameChange}  />
				<Button type='button' onClick={addFriend}>Add Friend</Button>
			</section>
			<h2>My Top 5</h2>
			{topFriends.length !== 0 && <section>
				<h4>Reorder Your Top Friends</h4>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{topFriends?.map((friend, index) => (
							<Draggable key={friend.position} draggableId={friend.position} index={index}>
								{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									style={{ ...provided.draggableProps.style, margin: '10px'}}
									className={styles.reorderItemContainer}
								>
									<div>
										<span className={styles.position}>{Number(friend.position) + 1}</span>
									</div>
									<div className={styles.photoContainer}>
										<Image width={50} height={50} className={styles.friendPhoto} src={friend.pictureUrl} alt='friend' />
									</div>
									<div>{friend.name}</div>
									<Image width={30} height={30} className={styles.friendPhoto} src={DragIcon} alt='friend' />
									<button type='button' onClick={() => removeFriend(friend.position)} className={styles.removeButton}>X</button>
								</div>
								)}
							</Draggable>
							))}
							{provided.placeholder}
						</div>
						)}
					</Droppable>
				</DragDropContext>
			</section>}
		</form>
    )
}
export default TopFriendsForm;
