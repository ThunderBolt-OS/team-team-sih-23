import { useState, useCallback, useContext } from 'react';
import {
	Button,
	Grid,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Chip,
	SelectChangeEvent,
	Typography
} from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Map } from 'react-map-gl';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import dayjs from 'dayjs';
import { defaultInitialView, mapBoxGLAccessToken } from '../constants';
import DrawControl from '../components/Map/DrawControl';
import ControlPanel from '../components/Map/ControlPanel';

const CreateBandobastForm = () => {
	const navigate = useNavigate();
	const { accessToken } = useContext(AuthContext);
	const [polygonCoordinates, setPolygonCoordinates] = useState<any>(null);
	const [bandobasttype, setBandobasttype] = useState('');
	const [policeDepartments, setPoliceDepartments] = useState<string[]>([]);
	const [securityCovers, setSecurityCovers] = useState<string[]>([]);
	const [localitytype, setLocalitytype] = useState('');
	const [eventtype, setEventtype] = useState('');
	const [starttime, setStarttime] = useState(dayjs());
	const [endtime, setEndtime] = useState<dayjs.Dayjs | null>();
	const [description, setDescription] = useState('');
	const [bandobastName, setBandobastName] = useState('');

	const [features, setFeatures] = useState({});

	const onUpdate = useCallback((e: any) => {
		setFeatures(currFeatures => {
			const newFeatures: any = { ...currFeatures };
			for (const f of e.features) {
				newFeatures[f.id] = f;
			}
			return newFeatures;
		});
	}, []);

	const onDelete = useCallback((e: any) => {
		setFeatures(currFeatures => {
			const newFeatures: any = { ...currFeatures };
			for (const f of e.features) {
				delete newFeatures[f.id];
			}
			return newFeatures;
		});
	}, []);

	const handleStartTimeChange = (newValue: dayjs.Dayjs) => {
		setStarttime(newValue);
	};

	const handleEndTimeChange = (newValue: dayjs.Dayjs | null) => {
		setEndtime(newValue);
	};

	const handleEventTypeChange = (event: SelectChangeEvent<string>) => {
		setEventtype(event.target.value as string);
	};

	const handleLocalityTypeChange = (event: SelectChangeEvent<string>) => {
		setLocalitytype(event.target.value as string);
	};

	const handleSecurityCoversChange = (event: SelectChangeEvent<string[]>) => {
		setSecurityCovers(event.target.value as string[]);
	};

	const handlePoliceDepartmentsChange = (event: SelectChangeEvent<string[]>) => {
		setPoliceDepartments(event.target.value as unknown as string[]);
	};

	const bandobastTypeChange = (event: SelectChangeEvent<string>) => {
		setBandobasttype(event.target.value as string);
	};

	const handleDrawCreate = useCallback((event: any) => {
		const polygon = event.features[0].geometry.coordinates[0];
		setPolygonCoordinates(polygon);
	}, []);

	const handleCreateBandobast = () => {
		const formData = {
			location_data: JSON.stringify(polygonCoordinates),
			name: bandobastName,
			bandobast_type: bandobasttype,
			start_time: starttime.format(),
			end_time: endtime?.format(),
			locality_type: localitytype,
			event_type: eventtype,
			police_departments: policeDepartments.join(','),
			security_covers: securityCovers.join(','),
			description: description
		};

		navigate('/dashboard/create-bandobast/stepper/');

		// createBandobast(formData, accessToken)
		// 	.then(() => {
		// 		navigate('/dashboard/create-bandobast/stepper/');
		// 	})
		// 	.catch((error: any) => {
		// 		console.log('Error:', error);
		// 	});
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					marginTop: '10vh',
					overflow: 'hidden'
				}}
			>
				<div style={{ flex: 1, position: 'relative' }}>
					<h3
						style={{
							position: 'absolute',
							zIndex: 100,
							top: 0,
							left: '20%'
						}}
					>
						Select Bandobast Area
					</h3>

					<div
						id='map-container'
						style={{ height: '96%', width: '100%' }}
					></div>

					<Map
						initialViewState={mapInitialViewState}
						mapStyle='mapbox://styles/mapbox/dark-v11'
						mapboxAccessToken={mapBoxGLAccessToken}
						style={mapContainerStyles}
					>
						<DrawControl
							position='top-left'
							displayControlsDefault={false}
							controls={{
								polygon: true,
								trash: true
							}}
							defaultMode='draw_polygon'
							onCreate={(e: any) => {
								onUpdate;
								handleDrawCreate(e);
							}}
							onUpdate={onUpdate}
							onDelete={onDelete}
						/>
						<ControlPanel polygons={Object.values(features)} />
					</Map>
				</div>

				<div
					style={{
						borderLeft: '0.8px solid grey',
						paddingLeft: 24,
						paddingRight: 88,
						marginLeft: 16,
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center'
					}}
				>
					<Typography
						variant='h2'
						sx={{ mb: 3 }}
					>
						Create New Bandobast
					</Typography>
					<Grid
						container
						spacing={2}
					>
						<Grid
							item
							xs={6}
							md={6}
						>
							<TextField
								fullWidth
								label='Bandobast Name'
								id='bandobastName'
								onChange={e => setBandobastName(e.target.value)}
							/>
						</Grid>
						<Grid
							item
							xs={6}
							md={6}
						>
							<FormControl fullWidth>
								<InputLabel id='bandobastTypeLabel'>Bandobast Type</InputLabel>
								<Select
									labelId='bandobastTypeLabel'
									id='bandobastType'
									value={bandobasttype}
									label='Bandobast Type'
									onChange={bandobastTypeChange}
								>
									<MenuItem value='Rally'>Rally</MenuItem>
									<MenuItem value='Stage Event'>Stage Event</MenuItem>
									<MenuItem value='Baricading'>Baricading</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid
							item
							xs={6}
							md={6}
						>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<MobileDateTimePicker
									label='Bandobast Start Time'
									sx={{ width: '100%' }}
									value={starttime}
									onChange={() => handleStartTimeChange}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid
							item
							xs={6}
							md={6}
						>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<MobileDateTimePicker
									label='Bandobast End Time'
									sx={{ width: '100%' }}
									value={endtime}
									onChange={handleEndTimeChange}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid
							item
							xs={6}
							md={6}
						>
							<FormControl fullWidth>
								<InputLabel id='localityTyeID'>Locality Type</InputLabel>
								<Select
									id='bolt'
									value={localitytype}
									label='Locality Type'
									onChange={handleLocalityTypeChange}
								>
									<MenuItem value='Locality 1'>Locality 1</MenuItem>
									<MenuItem value='Locality 2'>Locality 2</MenuItem>
									<MenuItem value='Locality 3'>Locality 3</MenuItem>
								</Select>
							</FormControl>
						</Grid>

						<Grid
							item
							xs={6}
							md={6}
						>
							<FormControl fullWidth>
								<InputLabel id='eventType'>Event Type</InputLabel>
								<Select
									labelId='EventTypeLabel'
									value={eventtype}
									label='Event Type'
									onChange={handleEventTypeChange}
								>
									<MenuItem value='Event 1'>Event 1</MenuItem>
									<MenuItem value='Event 2'>Event 2</MenuItem>
									<MenuItem value='Event 3'>Event 3</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid
							item
							xs={6}
							md={6}
						>
							<FormControl fullWidth>
								<InputLabel id='policeDepartmentLabel'>Police Department Responsible</InputLabel>
								<Select
									labelId='policeDepartmentLabel'
									id='policeDepartment'
									multiple
									value={policeDepartments}
									label='Police Department Responsible'
									onChange={handlePoliceDepartmentsChange}
									renderValue={(selected: any) => (
										<div>
											{selected.map((value: string) => (
												<Chip
													key={value}
													label={value}
												/>
											))}
										</div>
									)}
								>
									<MenuItem value='Department 1'>Department 1</MenuItem>
									<MenuItem value='Department 2'>Department 2</MenuItem>
									<MenuItem value='Department 3'>Department 3</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid
							item
							xs={6}
							md={6}
						>
							<FormControl fullWidth>
								<InputLabel id='securityCoversLabel'>Security Covers</InputLabel>
								<Select
									labelId='securityCoversLabel'
									id='securityCovers'
									multiple
									value={securityCovers}
									label='Security Covers'
									onChange={handleSecurityCoversChange}
									renderValue={(selected: any) => (
										<div>
											{selected.map((value: string) => (
												<Chip
													key={value}
													label={value}
												/>
											))}
										</div>
									)}
								>
									<MenuItem value='Cover 1'>Cover 1</MenuItem>
									<MenuItem value='Cover 2'>Cover 2</MenuItem>
									<MenuItem value='Cover 3'>Cover 3</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid
							item
							xs={12}
							md={12}
						>
							<TextField
								fullWidth
								label='Description'
								id='description'
								multiline
								rows={2}
								onChange={e => setDescription(e.target.value)}
							/>
						</Grid>
					</Grid>

					<Button
						variant='contained'
						size='large'
						sx={{ marginTop: 5 }}
						onClick={handleCreateBandobast}
					>
						Create Bandobast
					</Button>
				</div>
			</div>
		</>
	);
};

// initial state on the map
const mapInitialViewState = defaultInitialView;

export const mapContainerStyles = {
	marginLeft: '100px',
	height: 600,
	width: 600
};

export default CreateBandobastForm;
