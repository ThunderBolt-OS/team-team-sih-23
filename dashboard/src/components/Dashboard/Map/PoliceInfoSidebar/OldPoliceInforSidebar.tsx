import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Badge, Button, Chip, IconButton, TextField, Grid, Stack, Typography, Box } from '@mui/material';
import { GET, POST } from '../../../../api/fetch';
import calculateFutureTime from '../../../../utils/calculateFutureTime';
import calculateTargetTime from '../../../../utils/calculateTargetTime';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { CountdownRenderProps } from 'react-countdown';
import { GetBandobastOfficerByIdResponseType, RequestNFCScanType } from '../../../../api-types';
import { BandobastOfficersResponseType } from '../OfficersWithAssignedLocations/OfficerWithAssignedLocation';
import { useTheme } from '@mui/material/styles';
interface PoliceInfoSidebarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	assignedPosition: boolean;
	setAssignedPosition: (assignedPosition: boolean) => void;
	officerId: number;
}

const PoliceInfoSidebar: React.FC<PoliceInfoSidebarProps> = ({
	open,
	setOpen,
	assignedPosition,
	setAssignedPosition,
	officerId
}) => {
	const [textFieldVisible, setTextFieldVisible] = useState(false);
	const [timeDifference, setTimeDifference] = useState('5');
	const [startTimer, setStartTimer] = useState(false);
	const [apiResponseReceived, setApiResponseReceived] = useState(false);
	const [targetTime, setTargetTime] = useState(0);
	const [officerDetails, setOfficerDetails] = useState<GetBandobastOfficerByIdResponseType>();

	// Random component
	const Completionist: React.FC = () => {
		return <Typography variant='body1'>Time Ended</Typography>;
	};

	const theme = useTheme();

	useEffect(() => {
		(async () => {
			const apiResponse: GetBandobastOfficerByIdResponseType = await GET(
				'bandobas-officers/officer/' + officerId + '/'
			);

			if (apiResponse) {
				setOfficerDetails(apiResponse);
			}
		})();
	}, []);

	useEffect(() => {
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

	const handlePoliceIdInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const input = e.target.value;

		// Use a regular expression to check if the input contains only numeric characters
		const numericRegex = /^[0-9]*$/;
		if (numericRegex.test(input) || input === '') {
			// If the input is numeric or empty, update the state with the new value
			setTimeDifference(input);
			setApiResponseReceived(false);
		}
	};

	const handleRequestNFCScan = () => {
		const policeIdAndTimeDifferenceData = {
			// TODO: verify and test this
			police: JSON.stringify(officerId),
			expiry: calculateFutureTime(timeDifference)
		};

		(async () => {
			const RequestNFCScanResponse: RequestNFCScanType = await POST(
				`scan/create/`,
				policeIdAndTimeDifferenceData
			);
			if (RequestNFCScanResponse.status === 'pending') {
				console.log(RequestNFCScanResponse);
				setStartTimer(true);
				setApiResponseReceived(true);
				// setTimeDifference('5');

				const targetTime = calculateTargetTime(
					parseInt(timeDifference, 10) // Convert timeDifference to a number (in minutes)
				);
				setTargetTime(targetTime);
			}
		})();
	};

	return open ? (
		<div
			style={{
				position: 'absolute',
				top: 0,
				right: 0,
				zIndex: 100,
				backgroundColor: '#282A3A99',
				// backgroundColor: 'white',
				backdropFilter: 'blur(16px)',
				padding: 16,
				width: 304,
				height: '100%'
				// borderTopLeftRadius: '10px',
				// borderBottomLeftRadius: '10px'
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					<Typography
						variant='h4'
						sx={{ color: `${theme.palette.primary.main}` }}
					>
						Police Info
					</Typography>

					<IconButton
						sx={{ color: 'white' }}
						onClick={() => {
							setOpen(false); // Call setOpen with false to close the sidebar
							setAssignedPosition(true);
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>
			</div>
			<p style={{ color: `${theme.palette.primary.main}` }}>
				Police ID: <Chip label={officerDetails?.bandobas_officer.police_user.id} />
			</p>
			<p style={{ color: `${theme.palette.primary.main}` }}>
				Last NFC scan: <Chip label={`${officerDetails?.location_serializer.timestamp}`} />
			</p>
			<p style={{ color: `${theme.palette.primary.main}` }}>
				Department: <Chip label={officerDetails?.bandobas_officer.police_user.department} />
			</p>
			<p style={{ color: `${theme.palette.primary.main}` }}>
				Rank: <Chip label={officerDetails?.bandobas_officer.police_user.rank} />
			</p>

			<p style={{ color: `${theme.palette.primary.main}` }}>
				Equipment: <Chip label={'MK14'} />
			</p>
			<p style={{ color: `${theme.palette.primary.main}` }}>
				Currently:{' '}
				<Chip
					label={
						(officerDetails?.location_serializer.is_point_inside_polygon ? '' : 'NOT ') +
						'In assigned position'
					}
				/>
			</p>

			<Box
				sx={{
					flexDirection: 'row',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<Button
					variant='contained'
					// fullWidth
					onClick={handleRequestNFCScan}
					disabled={startTimer} // Disable the text field while timer is running
				>
					{/* <img
						src='/sensor.png'
						width={16}
						style={{ marginRight: 10 }}
						alt='Sensor Icon'
					/> */}
					{apiResponseReceived && startTimer ? (
						<Countdown
							date={targetTime}
							renderer={renderer}
						/>
					) : (
						'Send NFC Scan'
					)}
				</Button>

				<TextField
					label='Timeout (mins)'
					variant='outlined'
					value={timeDifference}
					onChange={handlePoliceIdInputChange}
					disabled={startTimer} // Disable the text field while timer is running
					size='small'
					style={{ width: 112 }}
				/>
			</Box>
		</div>
	) : (
		<></>
	);
};

export default PoliceInfoSidebar;
