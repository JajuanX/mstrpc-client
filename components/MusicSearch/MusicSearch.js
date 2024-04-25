import React, { useState, useEffect } from 'react';
import InputFieldOnChange from '../InputFieldOnChange/InputFieldOnChange';
import { debounce } from '@/utils/debouncer';

const MusicSearch = () => {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);

    // Mock function to simulate fetching songs from an API
    const fetchSongs = debounce( async (artistName) => {
        // This would be replaced by an actual API call, e.g.:
        // const response = await fetch(`https://api.music.com/songs?artist=${artistName}`);
        // const data = await response.json();
        // setSongs(data.songs);
        // Mocked data for demonstration
		console.log('artist', artistName);
        const mockedSongs = {
            'The Beatles': ['Let It Be', 'Yesterday', 'Hey Jude'],
            'Adele': ['Hello', 'Someone Like You', 'Rolling in the Deep']
        };

        setSongs(mockedSongs[artistName] || []);
    }, 1000);

    const handleInputChange = (event) => {
		console.log(event.target.value);
		fetchSongs(event.target.value)
    };

    return (
        <div>
			<InputFieldOnChange
				label='Enter an Artist Name'
				color='#444'
				type="text"
				name='artist'
				onchange={handleInputChange}
				placeholder="Enter an artist name..."
			/>
            {/* <div>
                {songs.length > 0 && (
                    <ul>
                        {songs.map((song, index) => (
                            <li key={index}>{song}</li>
                        ))}
                    </ul>
                )}
            </div> */}
        </div>
    );
};

export default MusicSearch;
