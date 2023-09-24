import React, { useContext, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { FlyToLocationDataContext } from '../../contexts/FlyToLocation';
import { TextField, useTheme } from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

interface Place {
	id: string;
	place_name: string;
	center: [number, number];
}

interface AutocompleteProps {
	mapboxToken: string;
	callbackLoc(lat: number, lng: number): void;

	clearState?: number;
}

const SearchMap: React.FC<AutocompleteProps> = ({ mapboxToken, callbackLoc, clearState }) => {
	mapboxgl.accessToken = mapboxToken;
	const theme = useTheme();
	const { updateFlyToLocationData } = useContext(FlyToLocationDataContext);

	const [query, setQuery] = useState('');
	const [results, setResults] = useState<Place[]>([]);
	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

	useEffect(() => {
		// clear state
		setQuery('');
		setResults([]);
		setSelectedPlace(null);
	}, [clearState]);

	useEffect(() => {
		if (!selectedPlace) return;
		console.log('selectedPlace', selectedPlace?.center[0], selectedPlace?.center[1]);
		callbackLoc(selectedPlace?.center[1], selectedPlace?.center[0]);
	}, [selectedPlace]);

	const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = event.target.value;
		setQuery(newQuery);

		if (newQuery.length >= 3) {
			try {
				const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${newQuery}.json`, {
					params: {
						access_token: mapboxgl.accessToken,
						limit: 5
					}
				});
				setResults(response.data.features);					
				
			} catch (error) {
				console.error('Error fetching results:', error);
			}
		} else {
			setResults([]);
		}
	};

	const handlePlaceSelect = (place: Place) => {
		setSelectedPlace(place);
		setQuery(place.place_name);
	};

	return (
		<div
			style={{
				position: 'absolute',
				top: 10,
				right: 23
			}}
		>
			<TextField
				type='text'
				// placeholder='Search for a place'
				label='Search for a place'
				size='small'
				value={query}
				onChange={handleInputChange}
				sx={{
					width: 237,
					bgcolor: theme.palette.background.paper,
					ml: 2
				}}
				InputProps={{
					endAdornment: (
						<>
							<LocationSearchingIcon
								fontSize='small'
								sx={{
									color: theme.palette.primary.main,
									mr: 1
								}}
							/>
						</>
					)
				}}
				
			/>
			{results.map(place => (
				<li
					style={{
						backgroundColor: place.id === selectedPlace?.id ? '#ebebeb' : '#fff',
						listStyleType: 'none',
						width: '250px',
						padding: '10px',
						cursor: 'pointer',
						borderBottom: '1px solid #ebebeb'
					}}
					key={place.id}
					onClick={() => handlePlaceSelect(place)}
				>
					{place.place_name}
				</li>
			))}
		</div>
	);
};

export default SearchMap;
