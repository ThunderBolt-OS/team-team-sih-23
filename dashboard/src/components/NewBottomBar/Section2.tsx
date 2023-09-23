import {
	Box,
	Button,
	ButtonBase,
	Grid,
	IconButton,
	Modal,
	Paper,
	Stack,
	TextField,
	Typography,
	styled,
	useTheme
} from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { OfficerData } from '../../api/OfficerDataInterface';
import { AllOfficersOfBandobasType } from '../../api-types';
import { GET, POST } from '../../api/fetch';
import { GlobalContext } from '../../contexts/global';
import ChatIcon from '@mui/icons-material/Chat';
import RoomIcon from '@mui/icons-material/Room';
import { useNavigate } from 'react-router-dom';
import { HighlightContext } from '../../contexts/HighlightContext';
import { FlyToLocationDataContext } from '../../contexts/FlyToLocation';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { CloseRounded as CloseRoundedIcon, SendRounded as SendRoundedIcon } from '@mui/icons-material';
import { closeSnackbar, useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';


type SendSOSNotificationToAllType = {
	message: string;
};

const Img = styled('img')({
	margin: 'auto',
	display: 'block',
	maxWidth: '100%',
	maxHeight: '100%'
});

const Section2 = () => {
	const { bandobastId } = useContext(GlobalContext);

	const [apiResponseData, setApiResponseData] = useState<AllOfficersOfBandobasType | null>(null);
	const [data, setData] = useState<AllOfficersOfBandobasType | null>(null);

	const navigate = useNavigate();
	const { officerLocationFromId } = useContext(HighlightContext);
	const { updateFlyToLocationData } = useContext(FlyToLocationDataContext);
	const [sendAlertModalOpen, setSendAlertModalOpen] = useState(false);
	const [alertTextField, setAlertTextField] = useState<string>('');

	const theme = useTheme();
	const { enqueueSnackbar } = useSnackbar();

	const [scrollIndex, setScrollIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const scrollInterval = setInterval(() => {
			setScrollIndex(index => {
				const nextIndex = (index + 1) % (data?.length || 1);
				container.scrollTo({
					top: nextIndex * 100, // Adjust the scroll amount based on your content
					behavior: 'smooth'
				});
				return nextIndex;
			});
		}, 1500); // Adjust the interval as needed

		return () => {
			clearInterval(scrollInterval);
		};
	}, [data]);

	useEffect(() => {
		if (!bandobastId) return;

		(async () => {
			const apiResponse: AllOfficersOfBandobasType = await GET(`bandobas-officers/bandobas/${bandobastId}/`);
			setApiResponseData(apiResponse);
		})();
	}, [bandobastId]);

	useEffect(() => {
		if (!apiResponseData) return;

		const idList = Object.keys(officerLocationFromId).map(value => parseInt(value));
		const officersToShow: AllOfficersOfBandobasType = [];

		if (apiResponseData?.length > 0) {
			apiResponseData.forEach(officer => {
				if (idList.includes(officer.id)) officersToShow.push(officer);
			});

			console.log('officersToShow', officersToShow);

			setData(officersToShow);
		}
	}, [apiResponseData, officerLocationFromId]);

	const handleMessageOnClick = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>, officerPhnNumber: number) => {
		navigate(`/dashboard/chat/${officerPhnNumber}/`);
	};

	const handleFlyToOfficersLocation = (policeUserId: number) => {
		console.log(officerLocationFromId, policeUserId, officerLocationFromId[policeUserId]);

		const latitude: number = officerLocationFromId[policeUserId].latitude;
		const longitude: number = officerLocationFromId[policeUserId].longitude;

		console.log(longitude, latitude);

		updateFlyToLocationData({
			latitude: latitude,
			longitude: longitude,
			zoom: 18.5
		});
	};

	const handleSendAlertClick = (officerId: number) => {
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
	return (
		<Paper
			sx={{
				overflow: 'auto',
				m: 1,
				p: 1,
				height: '82vh',
			}}
		ref={containerRef}
		>
			{data?.map((officer, index) => (
				<Box
					sx={{ width: '100%' }}
					key={index}
				>
					<Box
						key={index}
						// elevation={3}
						sx={{ overflow: 'auto', p: 1, mb: 1, border: '1px solid lightgrey', borderRadius: '5px' }}
					>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={2}
							>
								<Img
									alt='complex'
									src={officer.police_user.image_url}
									sx={{ width: 40, height: 40, borderRadius: 2, objectFit: 'cover' }}
								/>
							</Grid>
							<Grid
								item
								xs={5}
								md={5}
							>
								<Typography
									variant='h4'
									textAlign={'center'}
									sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
								>
									{officer.police_user.name}
								</Typography>
							</Grid>
							<Grid
								item
								xs={5}
								md={5}
							// spacing={2}
							>
								<IconButton
									onClick={e => handleMessageOnClick(e, parseInt(officer.police_user.phone, 10))}
									sx={{ mr: 1,width: 35, height: 35 }}
								>
									<ChatIcon/>
								</IconButton>
								<IconButton
									onClick={() => {
										handleFlyToOfficersLocation(officer.id);
									}}
									sx={{ mr: 1,width: 35, height: 35 }}
								>
									<RoomIcon/>
								</IconButton>
								<IconButton
									onClick={() => {
										setSendAlertModalOpen(true);
									}}
								sx={{ width: 35, height: 35 }}
								>
									<WarningRoundedIcon/>
								</IconButton>
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
											Trigger Alert to Officer {officer.id}
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
												onClick={() => handleSendAlertClick(officer.id)}
											>
												Send
											</Button>
										</Stack>
									</Paper>
								</Modal>
							</Grid>
							{/* <Grid item>
								<Typography
									variant='body2'
									color='text.secondary'
								>
									{officer.weapons}
								</Typography>
							</Grid> */}
						</Grid>
						<Box>
							{/* {officer.assigned_nfc_device_latitude},{officer.assigned_nfc_device_longitude} */}
						</Box>
					</Box>
				</Box>
			))}
		</Paper>
	);
};

export default Section2;
