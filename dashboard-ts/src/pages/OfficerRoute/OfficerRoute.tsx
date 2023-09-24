import React, { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import Map, { Source, Layer, MapRef, Marker } from 'react-map-gl';
import { defaultInitialView, mapBoxGLAccessToken } from '../../constants';
import { MapStyleDataContext } from '../../contexts/MapStyle';
import { GET } from '../../api/fetch';
import { ipPointerStyles } from './css';
import SearchableDropdown from '../../components/Dashboard/Map/SearchPoliceOfficer/SearchableDropdown';
import {
	Autocomplete,
	Box,
	IconButton,
	useTheme,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Stack,
	TextField,
	Typography,
	Avatar
} from '@mui/material';
import { AllOfficersOfBandobasType } from '../../api-types';
import BandoBastContext from '../../contexts/BandobastData';
import { BandoBastProvider } from '../../contexts/BandobastData';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import { SocketMessageType } from '../../components/Dashboard/Map/OfficersWithAssignedLocations/OfficerLocation/OfficerLocation';
import { useParams } from 'react-router-dom';
import { Popup as MapBoxPopup } from 'react-map-gl';
import PoliceInfoSidebarProfile from '../../components/Dashboard/Map/PoliceInfoSidebar/PoliceInfoSidebarProfile';

type CoordsListType = Array<Array<number>>;

type GeoLocationType = Array<{
	id: number;
	latitude: string;
	longitude: string;
	altitude: string;
	location_accuracy: string;
	speed: string;
	distance_from_nfc_device: number;
	is_point_inside_polygon: boolean;
	client_timestamp: string;
	timestamp: string;
	is_moving: string;
	speed_accuracy: string;
	heading: string;
	heading_accuracy: string;
	ellipsoidal_altitude: string;
	altitude_accuracy: string;
	battery_level: string;
	battery_is_charging: string;
	activity_type: string;
	activity_confidence: string;
	bearing: any;
	officer: number;
}>;

const OfficerRoute = () => {
	const { mapStyleData } = useContext(MapStyleDataContext);

	const [routeCoords, setRouteCoords] = useState<CoordsListType | null>(null);
	const theme = useTheme();
	const navigate = useNavigate();

	var mapRef = useRef<MutableRefObject<MapRef | null>>(null);

	const { officerId } = useParams();
	const [getOfficerId, setGetOfficerId] = useState<number | null>(null);

	const [responseData, setResponseData] = useState<GeoLocationType | null>(null);
	const [hoverData, setHoverData] = useState<GeoLocationType[0] | null>(null);

	useEffect(() => {
		GET(`officer-details/${officerId}/geolocation`).then(res => {
			const response: GeoLocationType = res;
			const routeCoordinates: CoordsListType = response.map(location => [
				parseFloat(location.longitude),
				parseFloat(location.latitude)
			]);

			setRouteCoords(routeCoordinates);
			setResponseData(response);
		});
	}, [officerId]);

	const [selectedOfficer, setSelectedOfficer] = useState<AllOfficersOfBandobasType[0] | null>(null);
	const bandobasContext = useContext(BandoBastContext);

	const [open, setOpen] = useState(true);
	const [open2, setOpen2] = useState(true);

	useEffect(() => {
		if (!selectedOfficer) return;

		navigate(`/dashboard/officer/${selectedOfficer.id}`);
	}, [selectedOfficer]);

	const handleSelectPoliceOfficer = (
		_e: React.SyntheticEvent<Element, Event>,
		newValue: AllOfficersOfBandobasType[0] | null
	) => {
		setSelectedOfficer(newValue);
	};

	return (
		<Map
			initialViewState={defaultInitialView}
			style={{
				height: '100%',
				width: '100%',
				borderRadius: 13
			}}
			mapStyle={`${mapStyleData.mapStyle}`}
			// @ts-ignore
			projection='globe'
			mapboxAccessToken={mapBoxGLAccessToken}
			renderWorldCopies={false}
			attributionControl={false}
			// @ts-ignore
			ref={map => (mapRef = map)}
		>
			<>
				<Box
					sx={{
						position: 'absolute',
						top: 10,
						left: 10
					}}
				>
					<Autocomplete
						id='search-dropdown'
						// size='medium'
						sx={{
							width: 400
							// height: 50
						}}
						options={
							bandobasContext && bandobasContext.FilteredOfficers.length > 0
								? bandobasContext.FilteredOfficers
								: []
						}
						value={selectedOfficer}
						getOptionLabel={option => option.police_user.name}
						filterOptions={(options, { inputValue }) => {
							const inputValueLowerCase = inputValue.toLowerCase();
							return options.filter(
								option =>
									option.police_user.phone.toLowerCase().includes(inputValueLowerCase) ||
									option.police_user.department.toLowerCase().includes(inputValueLowerCase) ||
									option.police_user.rank.toLowerCase().includes(inputValueLowerCase) ||
									option.police_user.name.toLowerCase().includes(inputValueLowerCase) ||
									option.weapons.toLowerCase().includes(inputValueLowerCase)
							);
						}}
						onChange={handleSelectPoliceOfficer}
						renderInput={params => (
							<TextField
								{...params}
								label='Enter Bus no. to search'
								size='medium'
								sx={{
									bgcolor: theme.palette.background.paper,
									height: '100%'
								}}
							/>
						)}
						renderOption={(props, option) => (
							<List>
								<ListItem
									button
									onClick={() => {
										setSelectedOfficer(option);
										setGetOfficerId(option.police_user.id);
									}}
								>
									<ListItemText
										primary={
											<>
												<Stack
													direction={'row'}
													columnGap={2}
												>
													{/* @ts-ignore */}
													<Avatar
														variant='square'
														// src={option.police_user.image_url}
														sx={{ borderRadius: 2, width: 48, height: 48 }}
													/>
													<Box>
														<Typography
															variant='body2'
															sx={{ mb: 0.2 }}
														>
															ID: {option.id}
														</Typography>
														<Typography
															variant='h4'
															sx={{ mb: 0.2 }}
														>
															{option.police_user.name}
														</Typography>
														<Typography
															variant='h6'
															sx={{ mb: 0.8 }}
														>
															{option.police_user.rank}, {option.police_user.department}
														</Typography>
													</Box>
												</Stack>
												<Typography variant='body1'>{option.weapons}</Typography>
											</>
										}
									/>
								</ListItem>
							</List>
						)}
					/>
				</Box>

				<Source
					id='route'
					type='geojson'
					data={{
						type: 'Feature',
						properties: {},
						geometry: { type: 'LineString', coordinates: routeCoords }
					}}
				>
					<Layer
						id='route'
						type='line'
						source='route'
						layout={{ 'line-join': 'round', 'line-cap': 'round' }}
						paint={{ 'line-color': 'rgb(1, 136, 215)', 'line-width': 2 }}
					/>
				</Source>

				{responseData?.map(coords => (
					<Marker
						latitude={Number(coords.latitude)}
						longitude={Number(coords.longitude)}
					>
						<div
							className={ipPointerStyles.pulsatingCircleFlows}
							onMouseEnter={() => {
								setHoverData(coords);
							}}
							onMouseLeave={() => {
								setHoverData(null);
							}}
						></div>
					</Marker>
				))}

				{officerId && (
					<PoliceInfoSidebarProfile
						officerId={Number(officerId)}
						assignedPosition={open2}
						open={open}
						setAssignedPosition={setOpen2}
						setOpen={setOpen}
						heightOfSidebar='100vh'
					/>
				)}

				{hoverData && (
					<MapBoxPopup
						anchor='top'
						closeOnClick={false}
						latitude={Number(hoverData.latitude)}
						longitude={Number(hoverData.longitude)}
					>
						<ul
							style={{
								listStyleType: 'none',
								padding: 0
							}}
						>
							<li>
								<strong>{new Date(hoverData.timestamp).toLocaleString()}</strong>
							</li>
							<li>
								<strong>ID:</strong> {hoverData.id}
							</li>
							<li>
								<strong>Latitude:</strong> {hoverData.latitude}
							</li>
							<li>
								<strong>Longitude:</strong> {hoverData.longitude}
							</li>
							<li>
								<strong>Is Inside Polygon:</strong> {hoverData.is_point_inside_polygon ? 'Yes' : 'No'}
							</li>
							<li>
								<strong>Speed:</strong> {hoverData.speed}
							</li>
							<li>
								<strong>Battery Level:</strong> {Number(hoverData.battery_level) * 100}%
							</li>
							<li>
								<strong>Officer:</strong> {hoverData.officer}
							</li>
						</ul>
					</MapBoxPopup>
				)}
			</>
		</Map>
	);
};

export default () => (
	<BandoBastProvider>
		<OfficerRoute />
	</BandoBastProvider>
);
