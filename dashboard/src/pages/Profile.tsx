import StepperMapContainer from '../components/Stepper/StepperMapContainer';
import React, { useContext, useState } from 'react';
import {
	Box,
	Grid,
	TextField,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
	Button,
	Autocomplete,
	IconButton,
	Checkbox,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio
} from '@mui/material';
import { StepperFormDataContext } from '../contexts/StepperFormData';
import RoomIcon from '@mui/icons-material/Room';
import { closeSnackbar, useSnackbar } from 'notistack';
import { Close as CloseIcon, CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import { POST } from '../api/fetch';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { departmentRankArmsList } from '../constants/PoliceData';
import { allArmsList } from '../constants/allArms';
import { NFCResponseDataType, AddOfficerToBandobastType, GetOfficerFromStartTimeToEndtimeType } from '../api-types';
import { useTheme } from '@mui/material/styles';
import {
	AddOfficerAndDeviceContext,
	AddOfficerAndDeviceFormDataContextProvider
} from '../contexts/AddOfficerAndDevice';
import AddOfficerAndDeviceMapContainer from '../components/AddOfficerAndDevice/AddOfficerAndDeviceMapContainer';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

interface AvailableUserIds {
	id: number;
	name: string;
	phone: string;
	email: string;
	image_url: string;
	rank: string;
	department: string;
}

interface DepartmentRankWeaponsType {
	departmentName: string;
	rank: string;
	weapons: string[];
}

interface Step2SubmitFormDataType {
	name: string;
	device_type: string;
	nfc_data: string;
	expires_at: string;
	latitude: string;
	longitude: string;
	radius_in_meters: number;
	altitude: number;
	assigned_to_bandobas: string | null;
	circle_geojson?: string; // The type of geo_fence_polygon; you can replace 'any' with a specific type if known
	auto_update_circle_geojson?: boolean;
}

type DepartmentRankArms = {
	department: string;
	personnel: Array<{
		rank: string;
		arms: string[];
	}>;
};

const availableOptions = ['nfc', 'geo', 'qr'];
const fenceOptions = ['Pt Fence', 'Poly Fence', 'No Fence'];

const Profile = () => {
	const { addOfficerAndDeviceFormData, updateAddOfficerAndDeviceFormData } = useContext(AddOfficerAndDeviceContext);
	const { addOfficerAndDeviceData, addOfficerAndDeviceMapData, nfcResponseData } = addOfficerAndDeviceFormData;
	const [nfcValue, setNfcValue] = useState('nfc');
	const [ptPolyNoFence, setPtPolyNoFence] = useState<string>('Pt Fence');
	const { enqueueSnackbar } = useSnackbar();
	const [disablePin, setDisablePin] = useState(false);
	const [starttime, setStarttime] = useState<dayjs.Dayjs | null>(dayjs());
	const [endtime, setEndtime] = useState<dayjs.Dayjs | null>();
	const [noOfOfficers, setNoOfOfficers] = useState<AvailableUserIds[]>([]);
	const [departmentRankWeapons, setDepartmentRankWeapons] = useState<DepartmentRankWeaponsType>({
		departmentName: '',
		rank: '',
		weapons: []
	});
	const [selectedDepartment, setSelectedDepartment] = useState<string>('');
	const [selectedRank, setSelectedRank] = useState(''); // Move the selectedRank to the component level
	const [geoOption, setGeoOption] = useState('');
	const [fenceOption, setFenceOption] = useState<string>('Pt Fence');
	const [fenceOptionTextFieldDisable, setFenceOptionTextFieldDisable] = useState<boolean>(true);
	const [fenceOptionTextField, setFenceOptionTextField] = useState<string>('20');
	const [instructions, setInstructions] = useState<string>('');
	const [isEndTimeValid, setEndTimeValid] = useState(true);

	const theme = useTheme();

	const handleDeviceChange = (_e: React.MouseEvent<HTMLElement, MouseEvent>, value: string | null) => {
		if (value) {
			setNfcValue(value);
			updateAddOfficerAndDeviceFormData({
				addOfficerAndDeviceData: {
					...addOfficerAndDeviceData,
					deviceType: value
				}
			});
		}
	};

	const handleStartTimeChange = (value: dayjs.Dayjs | null) => {
		if (!value) return;
		setStarttime(value);
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: {
				...addOfficerAndDeviceData,
				dutyStartTime: value.toISOString()
			}
		});
	};

	const handleEndTimeChange = (value: dayjs.Dayjs | null) => {
		if (!value) return;
		if (starttime && value.isBefore(starttime)) {
			setEndtime(null);
			setEndTimeValid(false);
		} else {
			setEndTimeValid(true);
			setEndtime(value);
			updateAddOfficerAndDeviceFormData({
				addOfficerAndDeviceData: {
					...addOfficerAndDeviceData,
					// convert value to ISO string
					dutyEndTime: value.toISOString()
				}
			});
		}
	};

	const handleAddPin = () => {
		const step2SubmitFormData: Step2SubmitFormDataType = {
			name: 'name_' + addOfficerAndDeviceData.nfcId,
			device_type: addOfficerAndDeviceData.deviceType,
			nfc_data: addOfficerAndDeviceData.nfcId ? addOfficerAndDeviceData.nfcId : 'NA',
			expires_at: '2023-07-10T10:16:23.773Z',
			latitude: addOfficerAndDeviceData.latitude,
			longitude: addOfficerAndDeviceData.longitude,
			radius_in_meters: addOfficerAndDeviceData.geoFenceRadius,
			altitude: 0,
			// get the bandobas id from the local storage
			assigned_to_bandobas: localStorage.getItem('bandobastId')
		};

		if (addOfficerAndDeviceData.circleGeoJson) {
			const geoJson = {
				type: 'Polygon',
				coordinates: [addOfficerAndDeviceData.circleGeoJson]
			};

			step2SubmitFormData.circle_geojson = JSON.stringify(geoJson);
			step2SubmitFormData.auto_update_circle_geojson = false;
		}

		// console.log('step2SubmitFormData', step2SubmitFormData);

		(async () => {
			const createNFCDeviceAPIResponse: NFCResponseDataType = await POST(
				'nfc-devices/create/',
				step2SubmitFormData
			);
			if (createNFCDeviceAPIResponse?.id > 0) {
				// setDisablePin(true);
				// update the nfcResponseID in the context
				updateAddOfficerAndDeviceFormData({
					nfcResponseData: {
						id: createNFCDeviceAPIResponse.id,
						name: createNFCDeviceAPIResponse.name,
						device_type: createNFCDeviceAPIResponse.device_type
					}
				});
				enqueueSnackbar(`Device ${step2SubmitFormData.name} added successfully`, {
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


				const officerStartTimeEndTimeData = {
					duty_start_time: addOfficerAndDeviceData.dutyStartTime,
					duty_end_time: addOfficerAndDeviceData.dutyEndTime,
					department: addOfficerAndDeviceData.departmentName,
					rank: addOfficerAndDeviceData.rank ? addOfficerAndDeviceData.rank : 'NA'
				};

				(async () => {
					const officerListAPIResponse: GetOfficerFromStartTimeToEndtimeType = await POST(
						`bandobas-officers/available/`,
						officerStartTimeEndTimeData
					);
					if (officerListAPIResponse.available_user_ids.length > 0) {
						// console.log('after add pin call', officerListAPIResponse);
						setNoOfOfficers(officerListAPIResponse.available_user_ids);
						updateAddOfficerAndDeviceFormData({
							addOfficerAndDeviceData: {
								...addOfficerAndDeviceData,
								policePhoneNumber: officerListAPIResponse.available_user_ids[0].phone
							}
						});
						enqueueSnackbar(`Device ${step2SubmitFormData.name} added successfully`, {
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
						})

						setDisablePin(true);
					}
				})();
			} else {
				enqueueSnackbar(`No Officers is available`, {
					variant: 'error',
					autoHideDuration: 3000, // Dismiss after 3 seconds
					action: key => (
						<IconButton
							onClick={() => closeSnackbar(key)} // Close the snackbar when the close button is clicked
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
	}

	const handleDepartmentNameChange = (_e: React.SyntheticEvent<Element, Event>, value: string | null) => {
		setDepartmentRankWeapons(prevState => ({
			...prevState,
			departmentName: value || '',
			rank: '',
			weapons: []
		}));
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: { ...addOfficerAndDeviceData, departmentName: value || '' }
		});
	};

	const handleRankChange = (_e: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
		const selectedWeapons = getWeaponsForChosenRank(addOfficerAndDeviceData.departmentName, newValue || '');
		setDepartmentRankWeapons(prevState => ({
			...prevState,
			rank: newValue || '',
			weapon: selectedWeapons
		}));
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: {
				...addOfficerAndDeviceData,
				rank: newValue || '',
				weapons: selectedWeapons
			}
		});
	};
	const getWeaponsForChosenRank = (departmentName: string, rank: string): string[] => {
		const weapons =
			departmentRankArmsList
				.find((item: DepartmentRankArms) => item.department === departmentName)
				?.personnel.find(rankItem => rankItem.rank === rank)?.arms || [];

		return weapons;
	};

	const handleWeaponsChange = (_e: React.SyntheticEvent<Element, Event>, value: string[] | null) => {
		setDepartmentRankWeapons(prevState => ({
			...prevState,
			weapons: value || []
		}));
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: { ...addOfficerAndDeviceData, weapons: value || [] }
		});
	};

	// Get the available department names from the data
	const departmentNamesFromConstant: string[] = departmentRankArmsList.map(
		(item: DepartmentRankArms) => item.department
	);

	// Get the ranks associated with the chosen department
	const ranksForChosenDepartment: string[] =
		departmentRankArmsList
			.find((item: DepartmentRankArms) => item.department === addOfficerAndDeviceData.departmentName)
			?.personnel.map(rankItem => rankItem.rank) || [];

	// Get the weapons associated with the chosen rank
	const weaponsForChosenRank: string[] =
		departmentRankArmsList
			.find((item: DepartmentRankArms) => item.department === addOfficerAndDeviceData.departmentName)
			?.personnel.find(rankItem => rankItem.rank === addOfficerAndDeviceData.rank)?.arms || [];

	const handleAltitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const altitudeValue = e.target.value;
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: { ...addOfficerAndDeviceData, altitude: altitudeValue }
		});
	};

	const handleNFCIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: { ...addOfficerAndDeviceData, nfcId: value }
		});
	};

	const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: { ...addOfficerAndDeviceData, longitude: value }
		});
	};

	const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: { ...addOfficerAndDeviceData, latitude: value }
		});
	};

	const handlePoliceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: { ...addOfficerAndDeviceData, policeName: e.target.innerText }
		});
	};

	const handleAssignPoliceClick = (e: React.SyntheticEvent) => {
		const targetPoliceOfficer = noOfOfficers.find(
			policeOffName => policeOffName.name === addOfficerAndDeviceData.policeName
		);
		const addOfficerToBandobast = {
			name: 'police_' + addOfficerAndDeviceData.policeName,
			police_user: targetPoliceOfficer?.phone,
			mobile: targetPoliceOfficer?.phone,
			assigned_nfc_device: nfcResponseData?.id,
			deparment: addOfficerAndDeviceData.departmentName,
			rank: targetPoliceOfficer?.rank,
			weapons: addOfficerAndDeviceData.weapons.join(','),
			duty_start_time: addOfficerAndDeviceData.dutyStartTime,
			duty_end_time: addOfficerAndDeviceData.dutyEndTime,
			instructions: instructions
		};
		(async () => {
			const addOfficerAPIResponse: AddOfficerToBandobastType = await POST(
				'bandobas-officers/create/',
				addOfficerToBandobast
			);

			if (addOfficerAPIResponse.id > 0) {
				setDisablePin(false);
				enqueueSnackbar(`Officer ${addOfficerAndDeviceData.policeName} added successfully`, {
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
			} else {
				enqueueSnackbar('Police addition failed', {
					variant: 'error',
					autoHideDuration: 3000, // Dismiss after 3 seconds
					action: key => (
						<IconButton
							onClick={() => closeSnackbar(key)} // Close the snackbar when the close button is clicked
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

	const handleGeoOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGeoOption(event.target.value);
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: {
				...addOfficerAndDeviceData,
				fenceOption: event.target.value
			}
		});
	};

	const handleGeoFenceRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(event.target.value);
		if (!isNaN(value)) {
			updateAddOfficerAndDeviceFormData({
				addOfficerAndDeviceData: {
					...addOfficerAndDeviceData,
					geoFenceRadius: value
				}
			});
		}
	};

	const handleFenceOptionChange = (_e: React.MouseEvent<HTMLElement>, value: string | null) => {
		if (value) {
			setFenceOption(value);
			updateAddOfficerAndDeviceFormData({
				addOfficerAndDeviceData: {
					...addOfficerAndDeviceData,
					fenceOption: value
				}
			});
		}
	};

	const handleFenceOptionTextfieldInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
		setFenceOptionTextField(numericValue);
		console.log('geo radius value before context update', addOfficerAndDeviceData.geoFenceRadius);
		updateAddOfficerAndDeviceFormData({
			addOfficerAndDeviceData: {
				...addOfficerAndDeviceData,
				geoFenceRadius: parseInt(numericValue, 10) // Parse the numeric value as an integer
			}
		});
		console.log('geo radius value after context update', addOfficerAndDeviceData.geoFenceRadius);
	};

	// get current location from browser
	const handleCurrentLocationFromBrowser = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				const { latitude, longitude } = position.coords;
				updateAddOfficerAndDeviceFormData({
					addOfficerAndDeviceData: {
						...addOfficerAndDeviceData,
						latitude: latitude.toString(),
						longitude: longitude.toString()
					},
					addOfficerAndDeviceMapData: {
						...addOfficerAndDeviceMapData,
						latitude: latitude.toString(),
						longitude: longitude.toString()
					}
				});
			});
		}
	};

	const isTextFieldEnabled = fenceOption === 'Pt Fence';

	return (
		<Box sx={{ mt: 8 }}>
			<Grid
				container
				sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
				spacing={5}
			>
				<Grid
					item
					xs={12}
					md={5}
				>
					<AddOfficerAndDeviceMapContainer />
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<Box>
						{/* <Typography
							variant='h2'
							sx={{ textAlign: 'center', mb: '1rem' }}
						>
							Bandobast Name
						</Typography> */}

						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Autocomplete
									fullWidth
									options={departmentNamesFromConstant}
									onChange={(e, value) => {
										setSelectedDepartment(value || '');
										handleDepartmentNameChange(e, value);
									}}
									disabled={disablePin}
									renderInput={params => (
										<TextField
											{...params}
											label='Department Name'
											name='departmentName'
											value={addOfficerAndDeviceData.departmentName}
										/>
									)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Autocomplete
									fullWidth
									options={ranksForChosenDepartment}
									onChange={handleRankChange}
									disabled={disablePin}
									renderInput={params => (
										<TextField
											{...params}
											label='Rank'
											name='rank'
											value={addOfficerAndDeviceData.rank}
										/>
									)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
							>
								<Autocomplete
									fullWidth
									multiple
									// limitTags={1}
									freeSolo
									// options={weaponsForChosenRank}
									options={allArmsList.arms}
									value={addOfficerAndDeviceData.weapons}
									defaultValue={weaponsForChosenRank}
									onChange={handleWeaponsChange}
									disabled={disablePin}
									renderInput={params => (
										<TextField
											{...params}
											label='Weapon'
											name='weapons'
											value={addOfficerAndDeviceData.weapons}
										/>
									)}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sm={4}
								md={6}
								display='flex'
								justifyContent='flex-start'
								alignItems='center'
							>
								<ToggleButtonGroup
									value={nfcValue}
									exclusive
									onChange={handleDeviceChange}
									aria-label='nfcToggle'
									size='small'
									sx={{
										justifyContent: 'center',
										alignItems: 'center'
									}}
									disabled={disablePin}
								>
									{availableOptions.map(option => (
										<ToggleButton
											key={option}
											value={option}
											aria-label={option}
											sx={{
												'&.Mui-selected': {
													color: `${theme.palette.primary.contrastText}`,
													bgcolor: `${theme.palette.success[600]}`
												}
											}}
										>
											{option.toUpperCase()}
										</ToggleButton>
									))}
								</ToggleButtonGroup>
							</Grid>

							<Grid
								item
								xs={12}
								sm={8}
								md={6}
							>
								<TextField
									fullWidth
									label={`${nfcValue.toUpperCase()} ID`}
									name='id'
									value={addOfficerAndDeviceData.nfcId}
									onChange={handleNFCIdChange}
									disabled={disablePin}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
								display='flex'
								// justifyContent='center'
								alignItems='center'
							>
								<ToggleButtonGroup
									value={fenceOption}
									exclusive
									onChange={handleFenceOptionChange}
									aria-label='fenceOptions'
									size='small'
								>
									{fenceOptions.map(option => (
										<ToggleButton
											key={option}
											value={option}
											aria-label={option}
											sx={{
												'&.Mui-selected': {
													color: `${theme.palette.primary.contrastText}`,
													bgcolor: `${theme.palette.success[600]}`
												}
											}}
										>
											{option}
										</ToggleButton>
									))}
								</ToggleButtonGroup>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
							>
								<TextField
									fullWidth
									label='Fence Option'
									name='additionalInfo'
									value={fenceOptionTextField}
									onChange={handleFenceOptionTextfieldInputChange}
									disabled={!isTextFieldEnabled}
								/>
							</Grid>
							<Grid
								item
								xs={6}
								md={6}
							>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<MobileDateTimePicker
										disabled={disablePin}
										label='Duty Start Time'
										sx={{ width: '100%' }}
										value={starttime}
										onChange={handleStartTimeChange}
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
										disabled={disablePin}
										label='Duty End Time'
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
								container
								item
								xs={12}
								md={12}
								spacing={2}
							>
								<>
									<Grid
										item
										xs={12}
										sm={6}
									>
										<TextField
											fullWidth
											label='Longitude'
											name='longitude'
											value={
												addOfficerAndDeviceData.longitude ||
												addOfficerAndDeviceMapData?.longitude
											}
											onChange={handleLongitudeChange}
											disabled={disablePin}
											sx={{ marginBottom: '1rem' }}
										/>
									</Grid>
									<Grid
										item
										xs={12}
										sm={6}
									>
										<TextField
											fullWidth
											label='Latitude'
											name='latitude'
											value={
												addOfficerAndDeviceData.latitude || addOfficerAndDeviceMapData?.latitude
											}
											onChange={handleLatitudeChange}
											disabled={disablePin}
											sx={{ marginBottom: '1rem' }}
										/>
									</Grid>
								</>
							</Grid>
							<Grid
								item
								xs={12}
								md={12}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center'
									}}
								>
									<Button
										variant='contained'
										onClick={handleAddPin}
										startIcon={<RoomIcon />}
										disabled={disablePin || !isEndTimeValid}
										sx={{
											width: '75%',
											borderRadius: '20px'
										}}
									>
										Add {nfcValue.toUpperCase()}
									</Button>

									<IconButton
										sx={{
											color: `${theme.palette.primary.main}`,
											bgcolor: `${theme.palette.primary.contrastText}`
										}}
										onClick={handleCurrentLocationFromBrowser}
									>
										<LocationOnRoundedIcon />
									</IconButton>
								</Box>
							</Grid>
							{noOfOfficers && noOfOfficers?.length > 0 && (
								<>
									<Grid
										item
										xs={12}
										md={12}
									>
										{disablePin && (
											<Typography variant='body1'>{`Assign officer to ${nfcResponseData?.name} ${nfcResponseData?.device_type} ${nfcResponseData?.id} `}</Typography>
										)}

										<Autocomplete
											fullWidth
											options={noOfOfficers
												.map(police => police.name)
												.filter(name => name !== null)}
											onChange={handlePoliceNameChange}
											renderInput={params => (
												<TextField
													{...params}
													label='Name of the Police'
													name='policeName'
													value={addOfficerAndDeviceData.policeName}
												/>
											)}
										/>
									</Grid>

									<Grid
										item
										xs={12}
										md={12}
									>
										{disablePin && (
											<Typography variant='body1'>{`Assign officer to ${nfcResponseData?.name} ${nfcResponseData?.device_type} ${nfcResponseData?.id} `}</Typography>
										)}

										<TextField
											fullWidth
											label='Instructions'
											id='description'
											multiline
											rows={2}
											onChange={e => setInstructions(e.target.value)}
										/>
									</Grid>
									<Grid
										item
										xs={6}
										md={6}
									>
										<Button
											variant='contained'
											onClick={handleAssignPoliceClick}
										>
											Assign Police
										</Button>
									</Grid>
								</>
							)}
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default () => {
	return (
		<AddOfficerAndDeviceFormDataContextProvider>
			<Profile />
		</AddOfficerAndDeviceFormDataContextProvider>
	);
};
