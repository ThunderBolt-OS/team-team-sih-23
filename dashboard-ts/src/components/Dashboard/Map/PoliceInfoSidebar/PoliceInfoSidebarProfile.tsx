import * as React from 'react';
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Modal,
	Paper,
	Chip,
	FormControlLabel,
	Grid,
	IconButton,
	Stack,
	TextField,
	Theme,
	Tooltip,
	Typography,
	Autocomplete,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	GetBandobastOfficerByIdResponseType,
	RequestNFCScanType,
	NearByOfficersWithRadiusType,
	AllOfficersOfBandobasType
} from '../../../../api-types';
import { BandobastOfficersResponseType } from '../OfficersWithAssignedLocations/OfficerWithAssignedLocation';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { CountdownRenderProps } from 'react-countdown';
import { GET, POST, PUT } from '../../../../api/fetch';
import calculateFutureTime from '../../../../utils/calculateFutureTime';
import calculateTargetTime from '../../../../utils/calculateTargetTime';
import CloseIcon from '@mui/icons-material/Close';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CallIcon from '@mui/icons-material/Call';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import WhatsappIcon from '@mui/icons-material/Whatsapp';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import TryIcon from '@mui/icons-material/Try';
import PoliceInfoSquareIconBtn from '../../../Custom/PoliceInfoSquareIconBtn';
import WeaponList from '../../../Custom/WeaponsList';
import { closeSnackbar, useSnackbar } from 'notistack';
import { CloseRounded as CloseRoundedIcon, SendRounded as SendRoundedIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchableDropdown from '../SearchPoliceOfficer/SearchableDropdown';
import OfficerDetailsPDF from './OfficerDetailsPdf/OfficerDetailsPdf';
import OfficerDetailsSummary from './OfficerDetailsPdf/OfficerDetailsSummaryPdf';
import { GlobalContext } from '../../../../contexts/global';

export interface PoliceInfoSidebarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	assignedPosition: boolean;
	setAssignedPosition: (assignedPosition: boolean) => void;
	officerId: number;
}

interface PoliceUser {
	id: number;
	police_user: {
		id: number;
		name: string;
		phone: string;
		department: string;
		rank: string;
		image_url: string;
	};
}

type SendSOSNotificationToAllType = {
	message: string;
};

type SwapOfficerWithIdsType = {
	message: string;
};

type PoliceEfficiency = {
	efficiency_score: number;
	average_time_taken: number;
	on_time_count: number;
	pending_count: number;
	late_count: number;
};

const PoliceInfoSidebarProfile: React.FC<PoliceInfoSidebarProps> = ({
	open,
	setOpen,
	assignedPosition,
	setAssignedPosition,
	officerId
}) => {
	const { setReloadScanRequests } = React.useContext(GlobalContext);

	const [timeDifference, setTimeDifference] = React.useState('5');
	const [startTimer, setStartTimer] = React.useState(false);
	const [apiResponseReceived, setApiResponseReceived] = React.useState(false);
	const [targetTime, setTargetTime] = React.useState(0);
	const [officerDetails, setOfficerDetails] = React.useState<GetBandobastOfficerByIdResponseType>();
	const [isChecked, setIsChecked] = React.useState<Boolean>(false);
	const [sendAlertModalOpen, setSendAlertModalOpen] = React.useState(false);
	const [alertTextField, setAlertTextField] = React.useState<string>('');
	const [nearbyOfficersModal, setNearbyOfficersModal] = React.useState(false);
	const [nearbyOfficersTextField, setNearbyOfficersTextField] = React.useState<string>('');
	const [allNearbyOfficers, setAllNearbyOfficers] = React.useState<NearByOfficersWithRadiusType>([]);
	const [showListofNearbyOfficers, setShowListofNearbyOfficers] = React.useState<boolean>(false);
	const [selectedOfficerFromNearbyOfficers, setSelectedOfficerFromNearbyOfficers] = React.useState<PoliceUser | null>(
		null
	);
	const [triggerSwapOfficer, setTriggerSwapOfficer] = React.useState(false);
	const [efficiency, setEfficiency] = React.useState<PoliceEfficiency>(null);
	const { enqueueSnackbar } = useSnackbar();
	const [policeOfficerIdForSwapping, setPoliceOfficerIdForSwapping] = React.useState<string>('');
	const navigate = useNavigate();

	const [loading, setLoading] = React.useState(false);

	const [sendScanLoading, setSendScanLoading] = React.useState(false);

	const Completionist: React.FC = () => {
		return <Typography variant='body1'>Time Ended</Typography>;
	};

	const theme = useTheme();

	React.useEffect(() => {
		(async () => {
			setLoading(true);
			setStartTimer(false);

			const apiResponse: GetBandobastOfficerByIdResponseType = await GET(
				'bandobas-officers/officer/' + officerId + '/'
			);

			if (apiResponse) {
				setOfficerDetails(apiResponse);

				setLoading(false);
			}

			const apiResponseEfficiency: PoliceEfficiency = await GET('algo/officer/' + officerId);
			if (apiResponseEfficiency) {
				setEfficiency(apiResponseEfficiency);
			}
		})();
	}, [officerId]);

	React.useEffect(() => {
		let interval: NodeJS.Timeout;

		if (startTimer && targetTime > Date.now()) {
			interval = setInterval(() => {
				const remainingTime = Math.max(0, targetTime - Date.now());
				if (remainingTime === 0) {
					setStartTimer(false);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [startTimer, targetTime]);

	// Updated renderer callback
	const renderer: CountdownRendererFn = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render "00:00:00" to indicate countdown has reached zero
			return <Completionist />;
		} else {
			// Render a countdown in hh:mm:ss format
			return (
				<span>
					{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
					{String(seconds).padStart(2, '0')}
				</span>
			);
		}
	};

	const handleTimeoutInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const input = e.target.value;

		const numericRegex = /^[0-9]*$/;
		if (numericRegex.test(input) || input === '') {
			setTimeDifference(input);
			setApiResponseReceived(false);
		}
	};

	const handleRequestNFCScan = () => {
		setSendScanLoading(true);

		const policeIdAndTimeDifferenceData = {
			// TODO: verify and test this
			police: JSON.stringify(officerId),
			expiry: calculateFutureTime(timeDifference),
			isAuth: isChecked
		};

		(async () => {
			const RequestNFCScanResponse: RequestNFCScanType = await POST(
				`scan/create/`,
				policeIdAndTimeDifferenceData
			);
			if (RequestNFCScanResponse.status === 'pending') {
				// console.log(RequestNFCScanResponse);
				setStartTimer(true);
				setApiResponseReceived(true);
				// setTimeDifference('5');

				const targetTime = calculateTargetTime(
					parseInt(timeDifference, 10) // Convert timeDifference to a number (in minutes)
				);
				setTargetTime(targetTime);

				setReloadScanRequests(prev => prev + 1);

				enqueueSnackbar(`Scan request of ${timeDifference} mins sent successfully`, {
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

				setSendScanLoading(false);
			} else {
				enqueueSnackbar('Send scan request failed', {
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

				setSendScanLoading(false);
			}
		})();
	};

	const handleAddAlertClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		alert('Alert has been triggered');
	};

	const handleDownloadPoliceReportClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// alert('Police report has been downloaded');
		GET(`officer-detail/${officerId}/`);
	};

	const handleLockChange = (_e: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
		setIsChecked(value => !value);
	};

	const handleSendAlertClick = () => {
		const notificationBodyToAllOfficers = {
			heading: 'Alert!!',
			body: alertTextField,
			notif_type: 'alert'
		};

		(async () => {
			const sendSOSNotificationToAllOfficersResponse: SendSOSNotificationToAllType = await POST(
				`notification/send/` + officerId,
				notificationBodyToAllOfficers
			);
			if (sendSOSNotificationToAllOfficersResponse.message) {
				// console.log(`alert notif send to officer id ${officerId} successfully`);
				enqueueSnackbar(`Alert sent to Officer ID ${officerId} successfully`, {
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
				setSendAlertModalOpen(false);
				setNearbyOfficersModal(true);
			} else {
				enqueueSnackbar('Alert not sent', {
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

	const handlePoliceOfficerIdForSwappingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		// const targetOfficerId = parseInt(e.target.value, 10);
		setPoliceOfficerIdForSwapping(e.target.value);
	};

	const handleSwapPoliceOfficersClick = () => {
		const swapIdData = {
			officer_1_id: officerId,
			officer_2_id: parseInt(policeOfficerIdForSwapping, 10)
		};
		(async () => {
			const swapPoliceOfficerWithIdsResponse: SwapOfficerWithIdsType = await POST(
				`bandobas-officers/swap/`,
				swapIdData
			);
			if (swapPoliceOfficerWithIdsResponse.message) {
				enqueueSnackbar(`Swapped Officer ${officerId} and ${policeOfficerIdForSwapping} successfully`, {
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
				setTriggerSwapOfficer(false);
			} else {
				enqueueSnackbar(`Swap with ${officerId} and ${policeOfficerIdForSwapping} failed`, {
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

	const handleSendNearbyOfficersClick = () => {
		const nearbyOfficerFormData = {
			latitude: officerDetails?.bandobas_officer.assigned_nfc_device.latitude,
			longitude: officerDetails?.bandobas_officer.assigned_nfc_device.longitude,
			radius: parseInt(nearbyOfficersTextField, 10)
		};

		(async () => {
			const nearbyOfficersListResponse: NearByOfficersWithRadiusType = await GET(
				`get-nearby-police-officers`,
				nearbyOfficerFormData
			);

			if (nearbyOfficersListResponse.length > 0) {
				enqueueSnackbar(`Nearby Officers Found`, {
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
				console.log('list of neaby officers', nearbyOfficersListResponse);
				setAllNearbyOfficers(nearbyOfficersListResponse);
				// setNearbyOfficersModal(false);
				setShowListofNearbyOfficers(true);
			} else {
				enqueueSnackbar(`No Nearby Officers Found`, {
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

	return open ? (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				// height: '100%',
				height: '62vh',
				overflowY: 'auto',
				// bottom: 50,
				right: 0,
				zIndex: 8100,
				p: 1,
				boxShadow: 1,
				borderTopRightRadius: 3,
				borderBottomRightRadius: 3,
				width: 320,
				backgroundColor: '#FAFEFF44',
				backdropFilter: 'blur(40px)'
			}}
		>
			{!loading && (
				<>
					<IconButton
						sx={{ color: 'grey', right: 4, top: 4, position: 'absolute' }}
						onClick={() => {
							setOpen(false); // Call setOpen with false to close the sidebar
							setAssignedPosition(true);
						}}
					>
						<CloseIcon color='inherit' />
					</IconButton>
					<Stack
						direction='column'
						sx={{ marginTop: 2 }}
					// spacing={1}
					>
						<Stack
							alignItems='center'
							justifyContent='center'
						>
							<Avatar
								src={officerDetails?.bandobas_officer?.police_user.image_url}
								alt='Police Avatar'
								sx={{ width: 88, height: 88 }}
							/>
						</Stack>

						<Typography
							variant='h5'
							textAlign={'center'}
							sx={{
								// fontSize: '1.1rem',
								color: `${theme.palette.common.black}`,
								mt: 1
							}}
						>
							{officerDetails?.bandobas_officer?.police_user.name}
						</Typography>

						<Typography
							color={theme.palette.grey[600]}
							variant='body2'
							textAlign={'center'}
						>
							{officerDetails?.bandobas_officer?.police_user.rank},{' '}
							{officerDetails?.bandobas_officer?.police_user.department}
						</Typography>

						<Typography
							variant='subtitle2'
							textAlign={'center'}
							sx={{
								mt: 1.6,
								color: `${officerDetails?.location_serializer?.is_point_inside_polygon
									? theme.palette.success.dark
									: theme.palette.error.main
									}`
							}}
						>
							{(officerDetails?.location_serializer?.is_point_inside_polygon ? '' : 'NOT ') +
								'In assigned position'}
						</Typography>

						<Typography
							variant='subtitle2'
							textAlign={'center'}
							sx={{
								// mt: 0.8,
								color:
									efficiency?.efficiency_score > 50
										? theme.palette.success.dark
										: theme.palette.error.main
							}}
						>
							Efficiency: {efficiency?.efficiency_score}%
						</Typography>

						<Stack
							alignItems='center'
							justifyContent='space-evenly'
							direction='row'
							sx={{ mt: 2 }}
						>
							<PoliceInfoSquareIconBtn
								href={`tel:+91${officerDetails?.bandobas_officer?.police_user.phone}`}
							>
								<CallIcon />
							</PoliceInfoSquareIconBtn>

							<PoliceInfoSquareIconBtn
								href={`sms:+91${officerDetails?.bandobas_officer?.police_user.phone}`}
							>
								<SmsRoundedIcon />
							</PoliceInfoSquareIconBtn>

							<IconButton
								sx={{
									width: 40,
									height: 40,
									borderRadius: 1.6,
									backgroundColor: theme.palette.primary[100],
									color: theme.palette.primary.dark,
									'&:hover': {
										backgroundColor: theme.palette.primary.dark,
										color: theme.palette.primary.contrastText
									},
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}
								onClick={() =>
									navigate(`/dashboard/chat/${officerDetails?.bandobas_officer?.police_user.phone}`)
								}
							>
								<TryIcon />
							</IconButton>

							<PoliceInfoSquareIconBtn
								href={`mailto:${officerDetails?.bandobas_officer?.police_user.email}`}
							>
								<EmailIcon />
							</PoliceInfoSquareIconBtn>

							<PoliceInfoSquareIconBtn
								href={`https://wa.me/+91${officerDetails?.bandobas_officer?.police_user.phone}`}
							>
								<WhatsappIcon />
							</PoliceInfoSquareIconBtn>
						</Stack>
					</Stack>

					<Grid
						container
						spacing={1}
						alignItems='center'
						mt={2}
					>
						<Grid
							item
							xs={12}
							md={8}
						>
							<Stack
								direction='row'
								spacing={1}
								alignItems='center'
								justifyContent='center'
							>
								<Button
									variant='contained'
									sx={{
										bgcolor: theme.palette.primary.main,
										color: theme.palette.primary.contrastText,
										width: '65%'
									}}
									onClick={handleRequestNFCScan}
									disabled={startTimer || sendScanLoading}
								>
									{apiResponseReceived && startTimer ? (
										<Countdown
											date={targetTime}
											renderer={renderer}
										/>
									) : (
										'Send Scan'
									)}
								</Button>
								<Tooltip title='Authorize?'>
									<FormControlLabel
										control={
											<Checkbox
												color='primary'
												backgroundColor='primary'
												checked={isChecked}
												onChange={(e, value) => handleLockChange(e, value)}
												icon={<LockOpenRoundedIcon color='error' />}
												checkedIcon={
													<LockRoundedIcon sx={{ color: `${theme.palette.success.dark}` }} />
												}
											/>
										}
										label=''
									/>
								</Tooltip>
							</Stack>
						</Grid>

						<Grid
							item
							xs={12}
							md={4}
							alignContent='flex-end'
							display='flex'
							alignItems='flex-end'
							justifyContent='flex-end'
						>
							<TextField
								sx={{ width: '100%' }}
								variant='outlined'
								value={timeDifference}
								disabled={startTimer}
								onChange={handleTimeoutInputChange}
								label='Time (mins)'
								size='small'
							/>
						</Grid>
					</Grid>

					<Box sx={{ my: 1 }}>
						<WeaponList weapons={officerDetails?.bandobas_officer?.weapons} />
					</Box>

					<Box sx={{ mt: 0 }}>
						<Button
							variant='outlined'
							fullWidth
							sx={{
								borderColor: theme.palette.error.main,
								color: theme.palette.error.main,
								'&:hover': {
									backgroundColor: theme.palette.error.main,
									color: theme.palette.error.contrastText,
									borderColor: theme.palette.error.main
								}
							}}
							startIcon={<ReportProblemIcon />}
							onClick={() => {
								setSendAlertModalOpen(true);
							}}
						>
							Trigger Alert
						</Button>
						<Modal
							open={sendAlertModalOpen}
							onClose={() => setSendAlertModalOpen(false)}
							aria-labelledby='modal-modal-title'
							aria-describedby='modal-modal-description'
						>
							<Paper
								sx={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									width: 400,
									border: '2.8px solid ' + theme.palette.warning.dark,
									boxShadow: 24,
									p: 3,
									borderRadius: 5
								}}
							>
								<Typography
									variant='h1'
									align='center'
									color='error'
									sx={{ mb: 4 }}
								>
									Trigger Alert to Officer {officerId}
								</Typography>
								<TextField
									id='outlined-multiline-flexible'
									label='Enter your announcement here'
									multiline
									maxRows={4}
									rows={4}
									value={alertTextField}
									onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
										setAlertTextField(e.target.value)
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
										onClick={() => setSendAlertModalOpen(false)}
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
										onClick={handleSendAlertClick}
									>
										Send
									</Button>
								</Stack>
							</Paper>
						</Modal>
						<Modal
							open={nearbyOfficersModal}
							onClose={() => setNearbyOfficersModal(false)}
							aria-labelledby='modal-modal-title'
							aria-describedby='modal-modal-description'
						>
							<Paper
								sx={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									width: 400,
									border: '2.8px solid ' + theme.palette.secondary.dark,
									boxShadow: 24,
									p: 3,
									borderRadius: 5
								}}
							>
								<Typography
									variant='h1'
									align='center'
									color='secondary'
									sx={{ mb: 4 }}
								>
									{!showListofNearbyOfficers
										? `Get all nearby Officers near to ${officerId} ID`
										: `List of All Nearby Officers near to ${officerId} ID`}
								</Typography>
								{!showListofNearbyOfficers && (
									<TextField
										id='outlined-multiline-flexible'
										label='Enter radius'
										value={nearbyOfficersTextField}
										onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
											setNearbyOfficersTextField(e.target.value)
										}
									/>
								)}
								{showListofNearbyOfficers ? (
									<Autocomplete
										id='search-dropdown'
										options={allNearbyOfficers
											.map((option: PoliceUser) => option)
											.filter((option: PoliceUser) => option.police_user.id !== officerId)}
										value={selectedOfficerFromNearbyOfficers}
										getOptionLabel={option => option.police_user.name}
										filterOptions={(options, { inputValue }) => {
											const inputValueLowerCase = inputValue.toLowerCase();
											return options.filter(
												option =>
													option.police_user.phone
														.toLowerCase()
														.includes(inputValueLowerCase) ||
													option.police_user.department
														.toLowerCase()
														.includes(inputValueLowerCase) ||
													option.police_user.rank
														.toLowerCase()
														.includes(inputValueLowerCase) ||
													option.police_user.name.toLowerCase().includes(inputValueLowerCase)
											);
										}}
										onChange={(_, newValue) => setSelectedOfficerFromNearbyOfficers(newValue)}
										renderInput={params => (
											<TextField
												{...params}
												label={`Available officers within ${nearbyOfficersTextField} mtr radius`}
												size='medium'
												InputProps={{
													...params.InputProps
												}}
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
														setSelectedOfficerFromNearbyOfficers(option);
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
																		src={option.police_user.image_url}
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
																			{option.police_user.rank},{' '}
																			{option.police_user.department}
																		</Typography>
																	</Box>
																</Stack>
																{/* <Typography variant='body1'>
																	{option.weapons}
																</Typography> */}
															</>
														}
													/>
													<ListItemSecondaryAction>
														<IconButton
															edge='end'
															aria-label='Phone'
															onClick={() =>
																navigate(`/dashboard/chat/${option.police_user.phone}`)
															}
														>
															<TryIcon
																fontSize='small'
																sx={{ color: theme.palette.grey[500] }}
															/>
														</IconButton>
													</ListItemSecondaryAction>
												</ListItem>
											</List>
										)}
									/>
								) : (
									<></>
								)}
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
										onClick={() => setNearbyOfficersModal(false)}
									>
										Close
									</Button>
									{!showListofNearbyOfficers && (
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
											onClick={handleSendNearbyOfficersClick}
										>
											Get List
										</Button>
									)}
								</Stack>
							</Paper>
						</Modal>
					</Box>
					<Stack sx={{ mt: 2 }} direction='row' spacing={2}>
						<OfficerDetailsPDF officerId={officerId} />
						<OfficerDetailsSummary officerId={officerId.toString()} />
					</Stack>
					<Box >
					</Box>
					{!triggerSwapOfficer && (
						<Box sx={{ mt: 2 }}>
							<Button
								variant='outlined'
								fullWidth
								sx={{
									borderColor: theme.palette.glow1.main,
									color: theme.palette.glow1.main,
									'&:hover': {
										backgroundColor: theme.palette.glow1.main,
										color: theme.palette.primary.contrastText,
										borderColor: theme.palette.glow1.main
									}
								}}
								startIcon={<SwapHorizIcon />}
								onClick={() => setTriggerSwapOfficer(true)}
							>
								Swap Officer
							</Button>
						</Box>
					)}
					{triggerSwapOfficer && (
						<>
							<Box sx={{ mt: 2 }}>
								<TextField
									id='outlined-basic'
									label='Enter Police ID '
									variant='outlined'
									value={policeOfficerIdForSwapping}
									onChange={handlePoliceOfficerIdForSwappingChange}
								/>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Button
									variant='outlined'
									fullWidth
									color='glow1'
									// sx={{
									// 	borderColor: theme.palette.primary.main,
									// 	color: theme.palette.primary.main,
									// 	'&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }
									// }}
									startIcon={<SwapHorizIcon />}
									onClick={handleSwapPoliceOfficersClick}
								>
									Swap Officer with ID {policeOfficerIdForSwapping}
								</Button>
							</Box>
						</>
					)}
				</>
			)}
		</Box>
	) : (
		<></>
	);
};

export default PoliceInfoSidebarProfile;
