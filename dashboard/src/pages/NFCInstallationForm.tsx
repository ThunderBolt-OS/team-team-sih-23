import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Layer, Map, Source } from 'react-map-gl';
import { AuthContext } from '../contexts/AuthProvider';
import { defaultInitialView, djangoBaseUrl, mapBoxGLAccessToken } from '../constants';

interface LocationData {
	location_data: string;
}

const NfcInstallationForm = () => {
	const accessToken = useContext(AuthContext).accessToken;
	const [data, setData] = useState<LocationData[]>([]);
	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		altitude: 0
	});

	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);

	useEffect(() => {
		const getLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					position => {
						console.log('position', position);
						const { latitude, longitude, altitude } = position.coords;
						updateLatitudeLongitude(latitude, longitude);
					},
					error => {
						console.log('Error occurred while retrieving location:', error);
					}
				);
			} else {
				console.log('Geolocation is not supported by this browser.');
			}
		};

		getLocation();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${djangoBaseUrl}bandobast/`, {
					headers: {
						Authorization: `JWT ${accessToken}`
					}
				});

				if (!response.ok) {
					throw new Error('Error fetching data');
				}

				const jsonData: LocationData[] = await response.json();
				setData(filterLocationData(jsonData));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	const filterLocationData = (jsonData: LocationData[]) => {
		return jsonData.map(obj => {
			const { location_data } = obj;
			if (location_data === 'null') {
				return [];
			}
			return JSON.parse(location_data);
		});
	};

	const getGeoJSONData = (data: number[][]) => {
		return {
			type: 'FeatureCollection',
			features: data.map((coordinates, index) => {
				return {
					type: 'Feature',
					properties: {
						index: index
					},
					geometry: {
						type: 'Polygon',
						coordinates: [coordinates]
					}
				};
			})
		};
	};

	const updateLatitudeLongitude = (latitude: number, longitude: number) => {
		setLatitude(latitude);
		setLongitude(longitude);
	};

	const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
		const latitude = e.lngLat.lat;
		const longitude = e.lngLat.lng;
		updateLatitudeLongitude(latitude, longitude);
	};

	return (
		<Box
			flexDirection='row'
			display='flex'
			justifyContent='center'
			alignItems='center'
		>
			<Map
				initialViewState={mapInitialViewState}
				style={mapContainerStyles}
				mapStyle='mapbox://styles/mapbox/dark-v11'
				// projection='globe' //!need help here
				mapboxApiAccessToken={mapBoxGLAccessToken}
				renderWorldCopies={false}
				onClick={handleMapClick}
			>
				<Source
					type='geojson'
					data={getGeoJSONData(data)}
				>
					{data.length > 0 && (
						<Layer
							id='data'
							type='fill'
							paint={{
								'fill-color': '#735F32',
								'fill-opacity': 0.5
							}}
						/>
					)}
				</Source>
			</Map>
			<Grid
				container
				spacing={1.5}
				padding={20}
			>
				<Typography variant='h3'> NFC Installation Form</Typography>
				<Grid
					item
					xs={6}
					md={6}
				>
					<TextField
						fullWidth
						label='Latitude'
						id='latitude'
						value={latitude}
						onChange={e => {
							const latitude = parseFloat(e.target.value);
							updateLatitudeLongitude(latitude, viewport.longitude);
						}}
					/>
				</Grid>
				<Grid
					item
					xs={6}
					md={6}
				>
					<TextField
						fullWidth
						label='Longitude'
						id='longitude'
						value={longitude}
						onChange={e => {
							const longitude = parseFloat(e.target.value);
							updateLatitudeLongitude(viewport.latitude, longitude);
						}}
					/>
				</Grid>
				<Grid
					item
					xs={6}
					md={6}
				>
					<TextField
						fullWidth
						label='NFC Tag ID'
						id='nfctagid'
					/>
				</Grid>
				<Grid
					item
					xs={6}
					md={6}
				>
					<TextField
						fullWidth
						label='Altitude'
						id='altitude'
						value={viewport.altitude || ''}
					/>
				</Grid>
				<Button
					variant='contained'
					color='secondary'
					sx={{
						marginLeft: '25%',
						width: '50%',
						marginTop: '20px',
						backgroundColor: '#735f32',
						color: 'white'
					}}
				>
					Install NFC Tag
				</Button>
			</Grid>
		</Box>
	);
};

const mapInitialViewState = defaultInitialView;

const mapContainerStyles = {
	marginLeft: '50px',
	marginTop: '50px',
	height: 600,
	width: 600
};

export default NfcInstallationForm;
