import { useContext, useEffect, useState } from 'react';

import { webSocketBaseUrl } from '../../../../../constants';
import { Marker } from 'react-map-gl';
import PoliceInfoSidebarProfile from '../../PoliceInfoSidebar/PoliceInfoSidebarProfile';
import { SidebarContext } from '../../../../../contexts/SidebarContext';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Avatar, Badge, IconButton, styled, useTheme } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { GlobalContext } from '../../../../../contexts/global';
import { HighlightContext } from '../../../../../contexts/HighlightContext';
import { AllOfficersOfBandobasType } from '../../../../../api-types';
import { GET } from '../../../../../api/fetch';
import { Theme } from '@mui/material/styles';
import { ShowDeviceOrOfficerContext } from '../../../../../contexts/ShowDeviceOrOfficer';

type Props = {
	officerId: number;
	department: string;
	officerImg: string;
	latLonCallback?: (latitude: number, longitude: number) => void;
	isOfficerHoveredOnCallback?: (isOfficerHoveredOn: boolean) => void;
};

interface StyledBadgeProps {
	status: 'success' | 'error';
	theme: Theme; // Use the correct type for your theme
}

const StyledBadge = styled(Badge)<StyledBadgeProps>(({ theme, status }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: status === 'success' ? `${theme.palette.success[600]}` : `${theme.palette.error.main}`,
		color: status === 'success' ? `${theme.palette.success[600]}` : `${theme.palette.error.main}`,
		// boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: 'ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""'
		}
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0
		}
	}
}));

export type SocketMessageType = {
	type: string;
	data:
	| {
		latitude: number;
		longitude: number;
		altitude: string;
		is_point_inside_polygon: boolean;
		batteryLevel: string;
	}
	| {
		expiry: string;
		id: number;
		isAuth: boolean;
		network_admin: number;
		police: number;
		police_scan_timestamp: string;
		request_time: string;
		status: 'on_time' | 'pending' | 'late';
	};
};

const OfficerLocation = ({ officerId, department, latLonCallback, isOfficerHoveredOnCallback, officerImg }: Props) => {
	// const [socket, setSocket] = useState<WebSocket | null>(null);
	const { setPoliceInfoSidebarProps } = useContext(SidebarContext);
	const { setReloadScanRequests } = useContext(GlobalContext);
	const { setOfficerLocationFromId } = useContext(HighlightContext);

	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);
	const [openPoliceInfo, setOpenPoliceInfo] = useState(false);
	const [assignedPosition, setAssignedPosition] = useState(true);
	const [status, setStatus] = useState<string>('');

	const { showOfficerImageOrStatusData } = useContext(ShowDeviceOrOfficerContext);

	const theme = useTheme();

	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const newSocket = new WebSocket(webSocketBaseUrl + 'ws/location/' + officerId + '/');

		// WebSocket event handlers
		newSocket.onopen = () => {
			console.log('WebSocket connection established.');
			// console.log(department);
		};

		newSocket.onmessage = event => {
			const data: SocketMessageType = JSON.parse(event.data);
			console.log('websocket data in officer location', data);
			if (data.type === 'location_update' || data.type === 'init_location_update') {
				if (!('latitude' in data.data)) return;

				setLatitude(data.data.latitude);
				setLongitude(data.data.longitude);

				if (data.data.is_point_inside_polygon === false) {
					setStatus('success');
				} else if (data.data.is_point_inside_polygon === true) {
					setStatus('error');
				}
				setOfficerLocationFromId(prev => {
					if (!('latitude' in data.data)) return prev;

					return {
						...prev,
						[officerId]: {
							latitude: data.data.latitude,
							longitude: data.data.longitude,
							isPointInsidePolygon: data.data.is_point_inside_polygon
						}
					};
				});
			}

			if (data.type === 'scan_request_update') {
				if (!('expiry' in data.data)) return;

				setReloadScanRequests(prev => prev + 1);

				enqueueSnackbar(`officer - \`${officerId}\` registered a scan ${data.data.status}`, {
					variant: data.data.status === 'on_time' ? 'success' : 'warning',
					autoHideDuration: 3000,
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
		};

		newSocket.onclose = () => {
			// console.log('WebSocket connection closed.');
		};

		// Cleanup function
		return () => {
			newSocket.close();
		};
	}, []);

	useEffect(() => {
		if (latitude !== 0 && longitude !== 0) {
			latLonCallback && latLonCallback(latitude, longitude);
		}
	}, [latitude, longitude]);

	useEffect(() => {
		setPoliceInfoSidebarProps({
			open: openPoliceInfo,
			setOpen: setOpenPoliceInfo,
			assignedPosition: assignedPosition,
			setAssignedPosition: setAssignedPosition,
			officerId: officerId
		});
	}, [openPoliceInfo, assignedPosition, officerId, counter]);

	return (
		<>
			<Marker
				latitude={latitude}
				longitude={longitude}
				style={{
					cursor: 'pointer'
				}}
				onClick={() => {
					// console.log('clicked on officer marker', officerId);
					setAssignedPosition(false);
					setOpenPoliceInfo(true);
					setCounter(prev => prev + 1);
				}}
			>
				<div
					className='pulsatingCircleFlows'
					onMouseEnter={() => {
						isOfficerHoveredOnCallback && isOfficerHoveredOnCallback(true);
					}}
					onMouseLeave={() => {
						isOfficerHoveredOnCallback && isOfficerHoveredOnCallback(false);
					}}
				>
					{showOfficerImageOrStatusData.showOfficerImageOrStatus === 'image' ? (
						<img
							src={`/officers/${department ? department : 'StatePolice'}.png`}
							// src={'/officers/' + department ? department : 'StatePolice' + '.png'}
							width={30}
							alt='Police Marker'
						/>
					) : (
						<StyledBadge
							status={status}
							overlap='circular'
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							// variant='dot'
							theme={theme}
						>
							<Avatar
								src={officerImg}
								sx={{ width: 41, height: 41 }}
							/>
						</StyledBadge>
					)}
				</div>
			</Marker>

			{/* <PoliceInfoSidebarProfile
				open={true}
				setOpen={setOpenPoliceInfo}
				assignedPosition={assignedPosition}
				setAssignedPosition={setAssignedPosition}
				officerId={20}
			/> */}
		</>
	);
};

export default OfficerLocation;
