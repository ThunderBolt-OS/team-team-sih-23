import React, { useContext, useEffect, useState } from 'react';
import {
	AppBar,
	Toolbar,
	TextField,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Radio,
	RadioGroup,
	FormControlLabel,
	Chip,
	Autocomplete,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Divider,
	Box,
	Grid,
	Modal,
	Typography,
	Stack,
	Paper,
	Tooltip,
	Switch,
	Avatar
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import EmailIcon from '@mui/icons-material/Email';
import { GET, POST } from '../../../../api/fetch';
import { AllOfficersOfBandobasType, HospitalApiResponseType, PoliceApiResponseType } from '../../../../api-types';
import SearchableDropdown from '../SearchPoliceOfficer/SearchableDropdown';
// import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
// import SosRoundedIcon from '@mui/icons-material/SosRounded';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { styled, useTheme } from '@mui/material/styles';
import BandoBastContext from '../../../../contexts/BandobastData';
import Checkbox from '@mui/material/Checkbox';
import { Label } from '@mui/icons-material';
import LanguageContext from '../../../../contexts/Language';
import translateText from '../../../../api/translate';
// import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import { allMapStyles } from '../../../../constants/allMapStyles';
import { MapStyleDataContext } from '../../../../contexts/MapStyle';
import { closeSnackbar, useSnackbar } from 'notistack';
import { Close as CloseIcon } from '@mui/icons-material';
import {
	ColorLensRounded as ColorLensRoundedIcon,
	SosRounded as SosRoundedIcon,
	TranslateRounded as TranslateRoundedIcon,
	CloseRounded as CloseRoundedIcon,
	SendRounded as SendRoundedIcon
} from '@mui/icons-material';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import StyledMenuItem from '../../../Custom/StyledMenuItem';
import { GlobalContext } from '../../../../contexts/global';
import { BandobastOfficersResponseType } from '../OfficersWithAssignedLocations/OfficerWithAssignedLocation';
import FormGroup from '@mui/material/FormGroup';
import { ShowDeviceOrOfficerContext } from '../../../../contexts/ShowDeviceOrOfficer';
import CampaignIcon from '@mui/icons-material/Campaign';
interface Props {
	bandobastId: number | null;
}

type RequestAllScanResponseType = {
	detail: string;
};

type RequestAllScanType = Array<{
	name: string;
	value: string;
	isAuth: boolean;
}>;

type RequestAllScanMenuItemsType = {
	name: string;
	value: string;
	isAuth: boolean;
};

type SendSOSNotificationToAllType = {
	message: string;
};

const requestAllScanMenuItems: RequestAllScanType = [
	{
		name: 'Double Verification',
		value: 'doubleVerification',
		isAuth: true
	},
	{
		name: 'Locations Verification',
		value: 'locationsVerification',
		isAuth: false
	}
];

const MapBar: React.FC<Props> = props => {
	const { enqueueSnackbar } = useSnackbar();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [anchorElLanguage, setAnchorElLanguage] = React.useState<null | HTMLElement>(null);
	const [requestAllScanAnchorEl, setRequestAllScanAnchorEl] = React.useState<null | HTMLElement>(null);
	const [filterBy, setFilterBy] = React.useState('department');

	const [MenuSeleceted, setMenuSeleceted] = useState('department');
	const [sosModalOpen, setSosModalOpen] = useState<boolean>(false);
	const [hospitalAndPoliceModalOpen, setHospitalAndPoliceModalOpen] = useState<boolean>(false);
	const [hospitalAndPoliceRadiusTextField, setHospitalAndPoliceRadiusTextField] = useState<string>('');
	const [visibleHospitalAndPolice, setVisibleHospitalAndPolice] = useState<boolean>(false);
	const [announcementModalOpen, setAnnouncementModalOpen] = useState<boolean>(false);
	const [announcementTextField, setAnnouncementTextField] = useState<string>('');
	const bandobasContext = useContext(BandoBastContext);
	const languageContext = useContext(LanguageContext);
	const { mapStyleData, updateMapStyleData } = useContext(MapStyleDataContext);
	const { bandobastId } = useContext(GlobalContext);

	const [deviceOrOfficerSwitch, setDeviceOrOfficerSwitch] = useState<boolean>(false);
	const [officerImgOrStatusSwitch, setOfficerImgOrStatusSwitch] = useState<boolean>(true);
	const { showDeviceOrOfficerData, updateShowDeviceOrOfficerData, updateOfficerImageOrStatusData } = useContext(ShowDeviceOrOfficerContext);

	const [hospitalData, setHospitalData] = useState<any>();
	const [policeData, setPoliceData] = useState<any>();

	const theme = useTheme();

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterBy(event.target.value);
		handleCloseMenu();
	};

	const handleOpenLanguageOptions = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElLanguage(event.currentTarget);
	};

	const handleCloseLanguageOptions = () => {
		setAnchorElLanguage(null);
	};

	const handleRequestAllScanClick = (event: React.MouseEvent<HTMLElement>) => {
		setRequestAllScanAnchorEl(event.currentTarget);
	};

	const handleCloseRequestAllScan = () => {
		setRequestAllScanAnchorEl(null);
	};

	const handleSendRequestAllScan = (item: RequestAllScanMenuItemsType) => {
		const sendScanRequestToAllData = {
			expiry: new Date(new Date().getTime() + 5 * 60000).toISOString(),
			isAuth: item.isAuth
		};

		(async () => {
			const requestAllScanResponse: RequestAllScanResponseType = await POST(
				`scan/create/all/${props.bandobastId}`,
				sendScanRequestToAllData
			);

			if (requestAllScanResponse.detail) {
				enqueueSnackbar(
					`${item.isAuth ? 'Double Verification' : 'Locations Verification'} initated for all officers`,
					{
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
					}
				);
				setRequestAllScanAnchorEl(null);
			} else {
				enqueueSnackbar(`${item.isAuth ? 'Double Verification' : 'Locations Verification'} failed`, {
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

	const handleSendSOSRequestToAllOfficerIds = (idArray: Array<number>) => {
		const notificationBodyToAllOfficers = {
			heading: 'SOS Signal',
			body: 'SOS!!!',
			notif_type: 'sos_all'
		};
		const checkingIdArray: Array<number> = [];
		(async () => {
			idArray.forEach(i => {
				(async () => {
					const sendSOSNotificationToAllOfficersResponse: SendSOSNotificationToAllType = await POST(
						`notification/send/` + i,
						notificationBodyToAllOfficers
					);
					if (sendSOSNotificationToAllOfficersResponse.message) {
						// console.log(i);
						// console.log(`SOS Signal sent to officer id ${i} successfully`);
						checkingIdArray.push(i);
						// console.log(checkingIdArray, idArray);
					}
				})();
			});
		})();

		enqueueSnackbar('SOS Signal sent to all officers successfully', {
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
	};

	const handleSendSOS = (event: React.MouseEvent<HTMLElement>) => {
		(async () => {
			const officerApiResponse: BandobastOfficersResponseType = await GET(
				'bandobas-officers/bandobas/' + bandobastId + '/'
			);
			if (officerApiResponse?.length > 0) {
				let idArray: { id: number; fcm_token: string }[] = [];
				officerApiResponse.map(officer => {
					idArray.push({ id: officer.id, fcm_token: officer.fcm_token });
				});

				// Create a Map using fcm_token as the key (this will automatically remove duplicates)
				const fcmTokenMap: Map<string, number> = new Map();
				idArray.forEach(item => {
					fcmTokenMap.set(item.fcm_token, item.id);
				});

				// Extract unique ids from the Map
				const uniqueIds: number[] = Array.from(fcmTokenMap.values());

				handleSendSOSRequestToAllOfficerIds(uniqueIds);
				setSosModalOpen(false);
				setHospitalAndPoliceModalOpen(true);
			} else {
				setSosModalOpen(true);
				enqueueSnackbar('SOS Signal Failed', {
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

	const handleDeviceOrOfficerSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDeviceOrOfficerSwitch(event.target.checked);
		// console.log('deviceOrOfficerSwitch', event.target.checked);
		if (event.target.checked) {
			updateShowDeviceOrOfficerData({
				showDeviceOrOfficer: 'policeOfficers'
			});
		} else {
			updateShowDeviceOrOfficerData({
				showDeviceOrOfficer: 'devices'
			});
		}
		// console.log('showDeviceOrOfficer', showDeviceOrOfficerData.showDeviceOrOfficer);
	};

	const handleOfficerImgOrStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOfficerImgOrStatusSwitch(event.target.checked);

		if (!event.target.checked) {
			updateOfficerImageOrStatusData({
				showOfficerImageOrStatus: 'image'
			});
		} else {
			updateOfficerImageOrStatusData({
				showOfficerImageOrStatus: 'status'
			});
		}
	};

	const handleSendAnnouncementToAllOfficers = (idArray: Array<number>) => {
		const notificationBodyToAllOfficers = {
			heading: 'Announcement',
			body: announcementTextField,
			notif_type: 'announcement_all'
		};
		const checkingIdArray: Array<number> = [];
		(async () => {
			idArray.forEach(i => {
				(async () => {
					const sendSOSNotificationToAllOfficersResponse: SendSOSNotificationToAllType = await POST(
						`notification/send/` + i,
						notificationBodyToAllOfficers
					);
					if (sendSOSNotificationToAllOfficersResponse.message) {
						// console.log(i);
						// console.log(`Announcement sent to officer id ${i} successfully`);
						checkingIdArray.push(i);
						// console.log(checkingIdArray, idArray);
					}
				})();
			});
		})();

		enqueueSnackbar('Announcement sent to all officers successfully', {
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

		setAnnouncementModalOpen(false);
	};

	const handleSendAnnouncementClick = () => {
		(async () => {
			const officerApiResponse: BandobastOfficersResponseType = await GET(
				'bandobas-officers/bandobas/' + bandobastId + '/'
			);
			if (officerApiResponse?.length > 0) {
				let idArray: { id: number; fcm_token: string }[] = [];
				officerApiResponse.map(officer => {
					idArray.push({ id: officer.id, fcm_token: officer.fcm_token });
				});
				setSosModalOpen(false);

				// Create a Map using fcm_token as the key (this will automatically remove duplicates)
				const fcmTokenMap: Map<string, number> = new Map();
				idArray.forEach(item => {
					fcmTokenMap.set(item.fcm_token, item.id);
				});

				// Extract unique ids from the Map
				const uniqueIds: number[] = Array.from(fcmTokenMap.values());
				handleSendAnnouncementToAllOfficers(uniqueIds);
			} else {
				// setAnnouncementModalOpen(true);
				enqueueSnackbar('Announcement Failed', {
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

	// @ts-ignore
	const handleGetHospitalAndPolice = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			// Retrieve the centroid from local storage and parse it as JSON
			const Centroid: [number, number] = JSON.parse(localStorage.getItem('geometricCenter') || '[]');

			// Parse the radius input
			const inputRadius = parseInt(hospitalAndPoliceRadiusTextField, 10);

			// Construct URLs for hospital and police API requests
			const hospitalUrl = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${Centroid[0]},${Centroid[1]},${inputRadius}&bias=proximity:${Centroid[0]},${Centroid[1]}&limit=20&apiKey=4c025d910d2c4de3b6b242330d3f71ef`;
			const policeUrl = `https://api.geoapify.com/v2/places?categories=service.police&filter=circle:${Centroid[0]},${Centroid[1]},${inputRadius}&bias=proximity:${Centroid[0]},${Centroid[1]}&limit=20&apiKey=4c025d910d2c4de3b6b242330d3f71ef`;

			// Fetch hospital data
			const hospitalApiResponse = await fetch(hospitalUrl);
			const hospitalData = await hospitalApiResponse.json();
			setHospitalData(hospitalData);
			console.log('hospital data', hospitalData);

			// Fetch police data
			const policeApiResponse = await fetch(policeUrl);
			const policeData = await policeApiResponse.json();
			setPoliceData(policeData);
			console.log('police data', policeData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	return (
		<Box
			sx={
				{
					// mt: 0.5
				}
			}
		>
			<Toolbar>
				<Grid
					container
					flexDirection='row'
					alignItems='center'
					justifyContent='flex-start'
				>
					<Grid
						item
					// xs={12}
					// md={6}
					>
						<SearchableDropdown bandobastId={props.bandobastId} />
					</Grid>
					<Grid
						item
					// xs={12}
					// md={1}
					>
						<Tooltip title='Filter'>
							<IconButton
								edge='end'
								color='inherit'
								aria-label='filter'
								aria-controls='filter-menu'
								aria-haspopup='true'
								onClick={handleOpenMenu}
								sx={{
									ml: 4,
									//@ts-ignore
									backgroundColor: `${theme.palette.primary[100]}`,
									color: `${theme.palette.primary.dark}`,
									borderRadius: '8px',
									'&:hover': {
										//@ts-ignore
										backgroundColor: `${theme.palette.primary[400]}`,
										color: `${theme.palette.primary.contrastText}`
									}
								}}
							>
								<TuneIcon />
							</IconButton>
						</Tooltip>
					</Grid>
					<Grid item>
						<Box
							sx={{
								ml: 5
							}}
						>
							<FormControlLabel
								control={
									<Switch
										checked={deviceOrOfficerSwitch}
										onChange={handleDeviceOrOfficerSwitchChange}
										inputProps={{ 'aria-label': 'controlled' }}
									/>
								}
								label='Show Bus'
							/>
						</Box>
					</Grid>
					<Grid item>
						<Box
							sx={{
								ml: 5
							}}
						>
							<FormControlLabel
								control={
									<Switch
										checked={officerImgOrStatusSwitch}
										onChange={handleOfficerImgOrStatusChange}
										inputProps={{ 'aria-label': 'controlled' }}
									/>
								}
								label='Show Bus Station'
							/>
						</Box>
					</Grid>
				</Grid>
				<Menu
					id='filter-menu'
					sx={{ width: '80%' }}
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleCloseMenu}
					variant='selectedMenu'
				>
					<Grid container>
						<Grid
							item
							xs={4}
							marginRight={2}
							md={6}
						>
							{/* Left column: Headings */}
							<StyledMenuItem
								theme={theme}
								value='department'
								onClick={() => {
									setMenuSeleceted('department');
								}}
								sx={{
									bgcolor: `${MenuSeleceted === 'department' ? theme.palette.primary.main : undefined
										}`,
									borderRadius: '5px'
								}}
							>
								<Typography
									variant='h4'
									sx={{
										color: `${MenuSeleceted === 'department'
											? theme.palette.primary.contrastText
											: undefined
											}`
									}}
								>
									Department
								</Typography>
							</StyledMenuItem>
							<Divider
								textAlign='center'
								variant='middle'
							/>
							<StyledMenuItem
								theme={theme}
								value='weapon'
								onClick={() => {
									setMenuSeleceted('weapon');
								}}
								sx={{
									bgcolor: `${MenuSeleceted === 'weapon' ? theme.palette.primary.main : undefined}`,
									borderRadius: '5px'
								}}
							>
								<Typography
									variant='h4'
									sx={{
										color: `${MenuSeleceted === 'weapon' ? theme.palette.primary.contrastText : undefined
											}`
									}}
								>
									Weapon
								</Typography>
							</StyledMenuItem>
							<Divider
								textAlign='center'
								variant='middle'
							/>
							<StyledMenuItem
								theme={theme}
								value='rank'
								onClick={() => {
									setMenuSeleceted('rank');
								}}
								sx={{
									bgcolor: `${MenuSeleceted === 'rank' ? theme.palette.primary.main : undefined}`,
									borderRadius: '5px'
								}}
							>
								<Typography
									variant='h4'
									sx={{
										color: `${MenuSeleceted === 'rank' ? theme.palette.primary.contrastText : undefined
											}`
									}}
								>
									Rank
								</Typography>
							</StyledMenuItem>
						</Grid>
						<Grid
							item
							xs={6}
							md={4}
						>
							{/* Right column: Items */}
							<div>
								{MenuSeleceted === 'department' && (
									<>
										{bandobasContext &&
											[
												...new Set(
													bandobasContext.officers.map(item => item.police_user?.department)
												)
											].map(val => (
												<FormControlLabel
													key={val}
													control={
														<Checkbox
															name={val}
															checked={bandobasContext.filterObject.department.includes(
																val
															)}
															onChange={event => {
																bandobasContext.handleFilterChange(
																	'department',
																	event.target.name
																);
															}}
														/>
													}
													label={val}
												/>
											))}
									</>
								)}
								{MenuSeleceted === 'weapon' && (
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											flexWrap: 'wrap',
											gap: '4px',
											marginTop: 1
										}}
									>
										{bandobasContext &&
											[
												...new Set(
													bandobasContext.officers.map(item => item.weapons.split(',')).flat()
												)
											].map(val => (
												<FormControlLabel
													key={val}
													control={
														<Checkbox
															name={val}
															checked={bandobasContext.filterObject.weapon.includes(val)}
															onChange={event => {
																bandobasContext.handleFilterChange(
																	'weapon',
																	event.target.name
																);
															}}
														/>
													}
													label={val}
												/>
											))}
									</div>
								)}
								{MenuSeleceted === 'rank' && (
									<>
										{bandobasContext &&
											[
												...new Set(bandobasContext.officers.map(item => item.police_user?.rank))
											].map(val => (
												<FormControlLabel
													key={val}
													control={
														<Checkbox
															name={val}
															checked={bandobasContext.filterObject.rank.includes(val)}
															onChange={event => {
																bandobasContext.handleFilterChange(
																	'rank',
																	event.target.name
																);
															}}
														/>
													}
													label={val}
												/>
											))}
									</>
								)}
							</div>
						</Grid>
					</Grid>
				</Menu>

				<Paper
					sx={{
						backgroundColor: `${theme.palette.primary[50]}`,
						mt: 1,
						backdropFilter: 'blur(10px)',
						display: 'flex'
					}}
				>
					<Stack
						direction='row'
						justifyContent='flex-end'
						alignItems='center'
						spacing={1}
						sx={{
							my: 0.5,
							mx: 1.5
						}}
					>
						<Grid item>
							<Tooltip title='Send Announcement'>
								<IconButton
									sx={{
										backgroundColor: 'transparent',
										color: theme.palette.primary.dark,
										borderRadius: '8px',
										'&:hover': {
											backgroundColor: theme.palette.primary.dark,
											color: theme.palette.primary.contrastText
										}
									}}
									onClick={() => {
										setAnnouncementModalOpen(true);
									}}
									aria-label='request-all-scan'
									aria-controls='request-all-scan-menu'
									aria-haspopup='true'
								>
									<CampaignIcon />
								</IconButton>
							</Tooltip>
							<Modal
								open={announcementModalOpen}
								onClose={() => setAnnouncementModalOpen(false)}
								aria-labelledby='modal-modal-title'
								aria-describedby='modal-modal-description'
							>
								<Paper
									sx={{
										position: 'absolute',
										top: '32%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										width: 400,
										border: '2.8px solid ' + theme.palette.secondary[300],
										boxShadow: 16,
										p: 3.2,
										borderRadius: 4
									}}
								>
									<Typography
										variant='h3'
										align='center'
										sx={{ mb: 3.2 }}
										color={'secondary'}
									>
										Send Announcement to all officers
									</Typography>
									<TextField
										id='outlined-multiline-flexible'
										label='Enter your message here'
										multiline
										color='secondary'
										maxRows={4}
										rows={4}
										value={announcementTextField}
										onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
											setAnnouncementTextField(e.target.value)
										}
									/>
									<Stack
										direction='row'
										justifyContent='space-around'
										sx={{ mt: 2 }}
									>
										<Button
											startIcon={<CloseRoundedIcon />}
											variant='outlined'
											color='error'
											sx={{
												color: theme.palette.error.dark,
												'&:hover': {
													backgroundColor: theme.palette.error.main,
													color: theme.palette.common.white
												},
												width: '35%'
											}}
											onClick={() => setAnnouncementModalOpen(false)}
										>
											Close
										</Button>
										<Button
											endIcon={<SendRoundedIcon />}
											variant='outlined'
											color='success'
											sx={{
												color: theme.palette.success[700],
												borderColor: theme.palette.success[600],
												'&:hover': {
													backgroundColor: theme.palette.success.light
												},
												width: '36%'
											}}
											onClick={handleSendAnnouncementClick}
										>
											Send
										</Button>
									</Stack>
								</Paper>
							</Modal>
						</Grid>
						<Divider
							orientation='vertical'
							textAlign='center'
							variant='middle'
							light
							sx={{
								bgcolor: theme.palette.primary.light,
								height: '22px'
							}}
						/>
						<Grid item>
							<Tooltip title='Request All Scan'>
								<IconButton
									sx={{
										backgroundColor: 'transparent',
										color: theme.palette.error.dark,
										borderRadius: '8px',
										'&:hover': {
											backgroundColor: theme.palette.error.dark,
											color: theme.palette.primary.contrastText
										}
									}}
									onClick={handleRequestAllScanClick}
									aria-label='request-all-scan'
									aria-controls='request-all-scan-menu'
									aria-haspopup='true'
								>
									<CircleNotificationsRoundedIcon />
								</IconButton>
							</Tooltip>
							<Menu
								id='request-all-scan-menu'
								anchorEl={requestAllScanAnchorEl}
								open={Boolean(requestAllScanAnchorEl)}
								onClose={handleCloseRequestAllScan}
							>
								{requestAllScanMenuItems.map((item, index) => (
									<div key={item.name}>
										<StyledMenuItem
											theme={theme}
											onClick={() => {
												handleCloseRequestAllScan();
												handleSendRequestAllScan(item);
											}}
										>
											{item.name}
										</StyledMenuItem>
										{index < requestAllScanMenuItems.length - 1 && (
											<Divider
												textAlign='center'
												variant='middle'
											/>
										)}
									</div>
								))}
							</Menu>
						</Grid>
						<Divider
							orientation='vertical'
							textAlign='center'
							variant='middle'
							light
							sx={{
								bgcolor: theme.palette.primary.light,
								height: '22px'
							}}
						/>

						<Grid item>
							<Tooltip title='Translate Page'>
								<IconButton
									sx={{
										backgroundColor: 'transparent',
										color: theme.palette.primary.dark,
										borderRadius: '8px',
										'&:hover': {
											backgroundColor: theme.palette.primary.dark,
											color: theme.palette.primary.contrastText
										}
									}}
									aria-label='translate'
									aria-controls='translate-menu'
									aria-haspopup='true'
									onClick={handleOpenLanguageOptions}
								>
									<TranslateRoundedIcon />
								</IconButton>
							</Tooltip>
							<Menu
								id='translate-menu'
								anchorEl={anchorElLanguage}
								open={Boolean(anchorElLanguage)}
								onClose={handleCloseLanguageOptions}
							>
								{languageContext &&
									languageContext.AllLanguages.map(option => (
										<StyledMenuItem
											theme={theme}
											key={option.name}
											selected={option.name === languageContext.SelectedLanguage.name}
											onClick={() => {
												languageContext.setSelectedLanguage(option);
												setAnchorElLanguage(null);
											}}
										>
											{option.name}
										</StyledMenuItem>
									))}
							</Menu>
						</Grid>
						<Divider
							orientation='vertical'
							textAlign='center'
							variant='middle'
							light
							sx={{
								bgcolor: theme.palette.primary.light,
								height: '22px'
							}}
						/>
						<Grid item>
							<Tooltip title='Trigger SOS'>
								<IconButton
									sx={{
										backgroundColor: 'transparent',

										color: theme.palette.error.dark,
										borderRadius: '8px',
										'&:hover': {
											backgroundColor: theme.palette.error.dark,
											color: theme.palette.primary.contrastText
										}
									}}
									onClick={() => setSosModalOpen(true)}
								>
									<SosRoundedIcon />
								</IconButton>
							</Tooltip>
							<Modal
								open={sosModalOpen}
								onClose={() => setSosModalOpen(false)}
								aria-labelledby='modal-modal-title'
								aria-describedby='modal-modal-description'
							>
								<Paper
									sx={{
										position: 'absolute',
										top: '32%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										width: 400,
										border: '2.8px solid ' + theme.palette.warning.dark,
										boxShadow: 16,
										p: 3,
										borderRadius: 4
									}}
								>
									<Typography
										variant='h3'
										align='center'
										color='error'
										sx={{ mb: 3.2 }}
									>
										Are you sure you want to send SOS?
									</Typography>
									<Typography
										sx={{ mb: 4.8 }}
										variant='h5'
										align='center'
									>
										This SOS will trigger an alert to all the officers.
									</Typography>
									<Stack
										direction='row'
										justifyContent='space-around'
										sx={{ mt: 2 }}
									>
										<Button
											startIcon={<CloseRoundedIcon />}
											variant='outlined'
											color='error'
											sx={{
												color: theme.palette.error.dark,
												'&:hover': {
													backgroundColor: theme.palette.error.main,
													color: theme.palette.common.white
												},
												width: '35%'
											}}
											onClick={() => setSosModalOpen(false)}
										>
											Close
										</Button>
										<Button
											endIcon={<SendRoundedIcon />}
											variant='outlined'
											color='success'
											sx={{
												color: theme.palette.success[700],
												borderColor: theme.palette.success[600],
												'&:hover': {
													backgroundColor: theme.palette.success.light
												},
												width: '36%'
											}}
											onClick={handleSendSOS}
										>
											Send SOS
										</Button>
									</Stack>
								</Paper>
							</Modal>
							<Modal
								open={hospitalAndPoliceModalOpen}
								onClose={() => setHospitalAndPoliceModalOpen(false)}
								aria-labelledby='modal-modal-title'
								aria-describedby='modal-modal-description'
							>
								<Paper
									sx={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										width: '90%',
										height: '90%',
										overflow: 'auto',
										border: '2.8px solid ' + theme.palette.secondary.dark,
										boxShadow: 16,
										p: 3,
										borderRadius: 4
										// height: 400
									}}
								>
									<Typography
										variant='h3'
										align='center'
										color='error'
										sx={{ mb: 3.2 }}
									>
										Get nearby hospitals and police stations.
									</Typography>
									<TextField
										sx={{ mb: 4.8, height: 50 }}
										variant='outlined'
										multiline
										rows={1}
										label='Enter radius in mtrs'
										value={hospitalAndPoliceRadiusTextField}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setHospitalAndPoliceRadiusTextField(e.target.value)
										}
									/>

									<Stack
										direction='row'
										justifyContent='space-around'
										sx={{ mt: 2 }}
									>
										<Button
											startIcon={<CloseRoundedIcon />}
											variant='outlined'
											color='error'
											sx={{
												color: theme.palette.error.dark,
												'&:hover': {
													backgroundColor: theme.palette.error.main,
													color: theme.palette.common.white
												},
												width: '35%'
											}}
											onClick={() => setHospitalAndPoliceModalOpen(false)}
										>
											Close
										</Button>
										{!visibleHospitalAndPolice && (
											<Button
												endIcon={<SendRoundedIcon />}
												variant='outlined'
												color='success'
												sx={{
													color: theme.palette.success[700],
													borderColor: theme.palette.success[600],
													'&:hover': {
														backgroundColor: theme.palette.success.light
													},
													width: '36%'
												}}
												onClick={handleGetHospitalAndPolice}
											>
												Find
											</Button>
										)}
									</Stack>
									{/* Grid for Nearby Hospitals and Police Stations */}
									<Grid
										container
										spacing={2}
										sx={{ mt: 3 }}
									>
										{/* Nearby Hospitals */}
										{hospitalData && (
											<Grid
												item
												xs={7}
												md={6}
											>
												<Typography
													variant='h1'
													sx={{ mb: 2 }}
													align='center'
												>
													Nearby Hospitals
												</Typography>
												<List>
													{hospitalData.features.map((hospital: any, index: any) => (
														<ListItem key={index}>
															<Stack
																direction='row'
																// justifyContent='space-between'
																alignItems='center'
																sx={{
																	border: '0.24px solid #cfc9cf',
																	borderRadius: 2,
																	p: 2,
																	width: '100%'
																}}
																spacing={2.4}
															>
																<Avatar
																	alt={hospital.properties.name}
																	src='/hospital.png'
																	sx={{ width: 32, height: 32, opacity: 0.8 }}
																/>
																<Box>
																	<Typography variant='h3'>
																		{hospital.properties.name}
																	</Typography>
																	<Typography
																		variant='subtitle2'
																		sx={{
																			mt: 0,
																			mb: 0.56,
																			color: theme.palette.success.dark
																		}}
																	>
																		{hospital.properties.distance} mtrs away
																	</Typography>
																	<Typography variant='h6'>
																		{hospital.properties.formatted}
																	</Typography>
																	<Typography variant='subtitle2'>
																		Near: {hospital.properties.neighbourhood}
																	</Typography>
																</Box>
															</Stack>
														</ListItem>
													))}
												</List>
											</Grid>
										)}

										{/* Nearby Police Stations */}
										{policeData && (
											<Grid
												item
												xs={6}
												md={6}
											>
												<Typography
													variant='h1'
													sx={{ mb: 2 }}
													align='center'
												>
													Nearby Police Stations
												</Typography>
												<List>
													{policeData.features.map((policeStation: any, index: any) => (
														<ListItem key={index}>
															<Stack
																direction='row'
																// justifyContent='space-between'
																alignItems='center'
																sx={{
																	border: '0.24px solid #cfc9cf',
																	borderRadius: 2,
																	p: 2,
																	width: '100%'
																}}
																spacing={2.4}
															>
																<Avatar
																	alt={policeStation.properties.name}
																	src='/police.png'
																	sx={{ width: 32, height: 32, opacity: 0.8 }}
																/>
																<Box>
																	<Typography variant='h3'>
																		{policeStation.properties.name}
																	</Typography>
																	<Typography
																		variant='subtitle2'
																		sx={{
																			mt: 0,
																			mb: 0.56,
																			color: theme.palette.success.dark
																		}}
																	>
																		{policeStation.properties.distance} mtrs away
																	</Typography>
																	<Typography variant='h6'>
																		{policeStation.properties.formatted}
																	</Typography>
																	<Typography variant='subtitle2'>
																		Near: {policeStation.properties.neighbourhood}
																	</Typography>
																</Box>
															</Stack>
														</ListItem>
													))}
												</List>
											</Grid>
										)}
									</Grid>
								</Paper>
							</Modal>
						</Grid>
					</Stack>
				</Paper>
			</Toolbar>
		</Box>
	);
};

export default MapBar;
