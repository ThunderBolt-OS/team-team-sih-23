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
	Typography,
	IconButton,
	Box,
	useTheme
} from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { StepperFormDataContext } from '../../contexts/StepperFormData';
import { POST } from '../../api/fetch';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { CheckCircle, Error, Close as CloseIcon } from '@mui/icons-material';
import { CreateBandobastAPIResponseType } from '../../api-types';

const Step1Form = () => {
	const navigate = useNavigate();
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
	const { formData, updateFormData } = useContext(StepperFormDataContext);
	const { mapData, stepperStep } = formData;
	const [isEndTimeValid, setEndTimeValid] = useState(true);
	const [activeStep, setActiveStep] = useState(formData.stepperStep.activeStep);

	const [features, setFeatures] = useState({});
	const theme = useTheme();

	const handleStartTimeChange = (newValue: dayjs.Dayjs) => {
		setStarttime(newValue);
	};

	const handleEndTimeChange = (newValue: dayjs.Dayjs | null) => {
		if (!newValue) return;
		if (starttime && newValue.isBefore(starttime)) {
			setEndTimeValid(false);
			setEndtime(null);
		} else {
			setEndtime(newValue);
			setEndTimeValid(true);
		}
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

	const handleCreateBandobast = () => {
		if (!mapData?.polygonCoordinates) {
			return enqueueSnackbar(`Please draw a polygon on the map`, {
				variant: 'error',
				autoHideDuration: 2000,
				action: key => (
					<IconButton
						onClick={() => closeSnackbar(key)}
						size='small'
						color='inherit'
					>
						<CloseIcon />
					</IconButton>
				),
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right'
				}
			});
		}

		if (!bandobastName) {
			return enqueueSnackbar(`Please enter a bandobast name`, {
				variant: 'error',
				autoHideDuration: 2000,
				action: key => (
					<IconButton
						onClick={() => closeSnackbar(key)}
						size='small'
						color='inherit'
					>
						<CloseIcon />
					</IconButton>
				),
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right'
				}
			});
		}

		if (!bandobasttype) {
			return enqueueSnackbar(`Please select a bandobast type`, {
				variant: 'error',
				autoHideDuration: 2000,
				action: key => (
					<IconButton
						onClick={() => closeSnackbar(key)}
						size='small'
						color='inherit'
					>
						<CloseIcon />
					</IconButton>
				),
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right'
				}
			});
		}

		if (!starttime) {
			return enqueueSnackbar(`Please select a start time`, {
				variant: 'error',
				autoHideDuration: 2000,
				action: key => (
					<IconButton
						onClick={() => closeSnackbar(key)}
						size='small'
						color='inherit'
					>
						<CloseIcon />
					</IconButton>
				),
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right'
				}
			});
		}

		if (!endtime) {
			return enqueueSnackbar(`Please select an end time`, {
				variant: 'error',
				autoHideDuration: 2000,
				action: key => (
					<IconButton
						onClick={() => closeSnackbar(key)}
						size='small'
						color='inherit'
					>
						<CloseIcon />
					</IconButton>
				),
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right'
				}
			});
		}

		if (!localitytype) {
			return enqueueSnackbar(`Please select a locality type`, {
				variant: 'error',
				autoHideDuration: 2000,
				action: key => (
					<IconButton
						onClick={() => closeSnackbar(key)}
						size='small'
						color='inherit'
					>
						<CloseIcon />
					</IconButton>
				),
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right'
				}
			});
		}

		if (!eventtype) {
			return enqueueSnackbar(`Please select an event type`, {
				variant: 'error',
				autoHideDuration: 2000,
				action: key => (
					<IconButton
						onClick={() => closeSnackbar(key)}
						size='small'
						color='inherit'
					>
						<CloseIcon />
					</IconButton>
				),
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right'
				}
			});
		}

		const step1FormData = {
			location_data: JSON.stringify(mapData?.polygonCoordinates),
			name: bandobastName,
			bandobast_type: bandobasttype,
			start_time: starttime.format(),
			end_time: endtime?.format(),
			locality_type: localitytype,
			event_type: eventtype,
			description: description
		};

		(async () => {
			const createBandobastAPIResponse: CreateBandobastAPIResponseType = await POST(
				`bandobast/create/`,
				step1FormData
			);
			if (createBandobastAPIResponse.id) {
				// updateFormData({
				// 	stepperStep: {
				// 		activeStep: stepperStep.activeStep + 1
				// 	}
				// });
				// store this bandobast id in the localstorage
				localStorage.setItem('bandobastId', createBandobastAPIResponse.id.toString());

				enqueueSnackbar(`Bandobast ${createBandobastAPIResponse.name} created successfully`, {
					variant: 'success',
					autoHideDuration: 2000,
					action: key => (
						<IconButton
							onClick={() => closeSnackbar(key)}
							size='small'
							color='inherit'
						>
							<CloseIcon />
						</IconButton>
					),
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right'
					}
				});

				// setActiveStep(prevActiveStep => prevActiveStep + 1);
				// // update the stepperStep in the context
				// updateFormData({
				// 	stepperStep: {
				// 		activeStep: activeStep + 1
				// 	}
				// });
			} else {
				enqueueSnackbar(`Error creating Bandobast ${bandobastName}`, {
					variant: 'error',
					autoHideDuration: 2000,
					action: key => (
						<IconButton
							onClick={() => closeSnackbar(key)}
							size='small'
							color='inherit'
						>
							<CloseIcon />
						</IconButton>
					),
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right'
					}
				});
			}
		})();
	};

	return (
		<Box>
			<Typography
				variant='h2'
				sx={{
					mb: 3,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
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
							<MenuItem value='Daily Bandobast'>Daily Bandobast</MenuItem>
							<MenuItem value='Crowdcontrol'>Crowdcontrol</MenuItem>
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
							sx={{
								width: '100%',
								border: isEndTimeValid ? 'undefined' : '1px solid red',
								bgcolor: isEndTimeValid ? 'undefined' : `${theme.palette.warning.light}`
							}}
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
							<MenuItem value='Tier 1 - Neutral'>Tier 1 - Neutral</MenuItem>
							<MenuItem value='Tier 1 - Sensitive'>Tier 1 - Sensitive</MenuItem>
							<MenuItem value='Tier 2 - Neutral'>Tier 2 - Neutral</MenuItem>
							<MenuItem value='Tier 2 - Sensitive'>Tier 2 - Sensitive</MenuItem>
							<MenuItem value='Tier 3 - Neutral'>Tier 3 - Neutral</MenuItem>
							<MenuItem value='Tier 3 - Sensitive'>Tier 3 - Sensitive</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid
					item
					xs={6}
					md={6}
				>
					<FormControl fullWidth>
						<InputLabel id='eventType'>Bandobast Purpose</InputLabel>
						<Select
							labelId='EventTypeLabel'
							value={eventtype}
							label='Event Type'
							onChange={handleEventTypeChange}
						>
							<MenuItem value='Daily Bandobast'>Daily Bandobast</MenuItem>
							<MenuItem value='Religious'>Religious</MenuItem>
							<MenuItem value='VIP'>VIP</MenuItem>
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
						rows={4}
						onChange={e => setDescription(e.target.value)}
					/>
				</Grid>
			</Grid>
			<Button
				variant='contained'
				size='large'
				sx={{ marginTop: 5 }}
				onClick={handleCreateBandobast}
				disabled={!isEndTimeValid}
			>
				Create Bandobast
			</Button>
		</Box>
	);
};

export default Step1Form;
