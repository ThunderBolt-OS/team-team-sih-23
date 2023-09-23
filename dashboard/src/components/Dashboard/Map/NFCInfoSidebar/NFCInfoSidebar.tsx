import { Avatar, Box, Button, Chip, IconButton, Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import CloseIcon from '@mui/icons-material/Close';
import { GET } from '../../../../api/fetch';
import { GetDeviceByID } from '../../../../api-types';

export interface NFCInfoSidebarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	assignedPosition: boolean;
	setAssignedPosition: (assignedPosition: boolean) => void;
	nfcId: number;
}

const NFCInfoSidebar: React.FC<NFCInfoSidebarProps> = ({
	open,
	setOpen,
	assignedPosition,
	setAssignedPosition,
	nfcId
}) => {
	const theme = useTheme();
	const [nfcDetails, setNfcDetails] = useState<GetDeviceByID>();

	useEffect(() => {
		(async () => {
			const apiResponse: GetDeviceByID = await GET('nfc-devices/' + nfcId + '/');
			if (apiResponse?.id) {
				setNfcDetails(apiResponse);
			}
		})();
	}, [nfcId]);

	return open ? (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				// height: '100%',
				height: '75vh',
				overflowY: 'auto',
				// bottom: 50,
				right: 0,
				zIndex: 8100,
				p: 1,
				boxShadow: 1,
				borderTopRightRadius: 3,
				borderBottomRightRadius: 3,
				width: 256,
				backgroundColor: '#FAFEFF44',
				backdropFilter: 'blur(40px)'
			}}
		>
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
					{nfcDetails?.device_type === 'nfc' ? (
						<Avatar
							src='/home/map/assigned/nfc.png'
							sx={{ width: 56, height: 56 }}
						/>
					) : nfcDetails?.device_type === 'ble' ? (
						<Avatar
							src='/home/map/assigned/ble.png'
							sx={{ width: 56, height: 56 }}
						/>
					) : nfcDetails?.device_type === 'geo' ? (
						<Avatar
							src='/home/map/assigned/geo.png'
							sx={{ width: 56, height: 56 }}
						/>
					) : (
						<Avatar
							src='/home/map/assigned/qr.png'
							sx={{ width: 56, height: 56 }}
						/>
					)}
				</Stack>

				<Typography
					variant='h3'
					textAlign={'center'}
					sx={{
						// fontSize: '1.1rem',
						color: `${theme.palette.common.black}`,
						mt: 2
					}}
				>
					Device Name: {nfcDetails?.name}
				</Typography>

				<Typography
					variant='h4'
					textAlign={'center'}
					sx={{
						// fontSize: '1.1rem',
						color: `${theme.palette.common.black}`,
						mt: 1
					}}
				>
					ID: {nfcDetails?.id}
				</Typography>

				<Typography
					variant='subtitle2'
					textAlign={'center'}
					sx={{
						mt: 2,
						color: `${nfcDetails?.is_assigned ? theme.palette.success.dark : theme.palette.error.main}`
					}}
				>
					{nfcDetails?.is_assigned ? 'In assigned position' : 'Not in assigned position'}
				</Typography>

				<Typography
					variant='h4'
					textAlign={'center'}
					sx={{
						// fontSize: '1.1rem',
						color: `${theme.palette.text.primary}`,
						mt: 1.6
					}}
				>
					Type: {nfcDetails?.device_type.toUpperCase()}
				</Typography>

				<Typography
					variant='h5'
					textAlign={'center'}
					sx={{
						// fontSize: '1.1rem',
						color: `${theme.palette.text.primary}`,
						mt: 2
					}}
				>
					Radius: {nfcDetails?.radius_in_meters} mtrs
				</Typography>

				<Typography
					color={theme.palette.grey[600]}
					variant='body2'
					textAlign={'center'}
				>
					Altitude: {nfcDetails?.altitude} {' mtrs'}
				</Typography>
			</Stack>
		</Box>
	) : (
		// <div
		// 	style={{
		// 		position: 'absolute',
		// 		top: 0,
		// 		right: 0,
		// 		backgroundColor: '#FAFEFF44',
		// 		backdropFilter: 'blur(40px)',
		// 		zIndex: 8001,
		// 		padding: 16,
		// 		width: 304,
		// 		height: '100%'
		// 	}}
		// >
		// 	<Box
		// 		style={{
		// 			display: 'flex',
		// 			justifyContent: 'space-between'
		// 		}}
		// 	>
		// 		<Box
		// 			sx={{
		// 				display: 'flex',
		// 				width: '100%',
		// 				alignItems: 'center',
		// 				justifyContent: 'space-between'
		// 			}}
		// 		>
		// 			<Typography
		// 				variant='h1'
		// 				sx={{ color: `${theme.palette.primary.main}` }}
		// 			>
		// 				Device Info
		// 			</Typography>

		// 			<IconButton
		// 				// sx={{ color: 'white' }}
		// 				color='primary'
		// 				onClick={() => {
		// 					setOpen(false); // Call setOpen with false to close the sidebar
		// 					setAssignedPosition(true);
		// 				}}
		// 			>
		// 				<CloseIcon />
		// 			</IconButton>
		// 		</Box>
		// 	</Box>
		// 	<Stack
		// 		direction='row'
		// 		alignItems={'center'}
		// 		justifyContent={'center'}
		// 		sx={{ mt: 2 }}
		// 	>
		// 		{nfcDetails?.device_type === 'nfc' ? (
		// 			<Avatar
		// 				src='/home/map/assigned/nfc.png'
		// 				sx={{ width: 65, height: 65 }}
		// 			/>
		// 		) : nfcDetails?.device_type === 'ble' ? (
		// 			<Avatar
		// 				src='/home/map/assigned/ble.png'
		// 				sx={{ width: 65, height: 65 }}
		// 			/>
		// 		) : nfcDetails?.device_type === 'geo' ? (
		// 			<Avatar
		// 				src='/home/map/assigned/geo.png'
		// 				sx={{ width: 65, height: 65 }}
		// 			/>
		// 		) : (
		// 			<Avatar
		// 				src='/home/map/assigned/qr.png'
		// 				sx={{ width: 65, height: 65 }}
		// 			/>
		// 		)}
		// 	</Stack>
		// 	<Stack
		// 		sx={{ mt: 4 }}
		// 		spacing={3}
		// 	>
		// 		<Typography
		// 			variant='h4'
		// 			sx={{
		// 				color: `${theme.palette.primary.main}`
		// 			}}
		// 		>
		// 			Device ID{' '}
		// 			<Chip
		// 				label={nfcDetails?.id}
		// 				sx={{
		// 					backgroundColor: theme.palette.primary.light,
		// 					color: theme.palette.primary.main
		// 					// width: '100%'
		// 				}}
		// 			/>
		// 		</Typography>
		// 		<Typography
		// 			variant='h4'
		// 			sx={{ color: `${theme.palette.primary.main}` }}
		// 		>
		// 			NFC Name:{' '}
		// 			<Chip
		// 				label={nfcDetails?.name}
		// 				sx={{
		// 					backgroundColor: theme.palette.primary.light,
		// 					color: theme.palette.primary.main
		// 					// width: '100%'
		// 				}}
		// 			/>
		// 		</Typography>
		// 		<Typography
		// 			variant='h4'
		// 			sx={{ color: `${theme.palette.primary.main}` }}
		// 		>
		// 			Device Type:{' '}
		// 			<Chip
		// 				label={nfcDetails?.device_type.toUpperCase()}
		// 				sx={{
		// 					backgroundColor: theme.palette.primary.light,
		// 					color: theme.palette.primary.main
		// 					// width: '100%'
		// 				}}
		// 			/>
		// 		</Typography>
		// 		<Typography
		// 			variant='h4'
		// 			sx={{ color: `${theme.palette.primary.main}` }}
		// 		>
		// 			Altitude:{' '}
		// 			<Chip
		// 				label={nfcDetails?.altitude}
		// 				sx={{
		// 					backgroundColor: theme.palette.primary.light,
		// 					color: theme.palette.primary.main
		// 					// width: '100%'
		// 				}}
		// 			/>{' '}
		// 			mtrs
		// 		</Typography>
		// 		<Typography
		// 			variant='h4'
		// 			sx={{ color: `${theme.palette.primary.main}` }}
		// 		>
		// 			Assigned:{' '}
		// 			<Chip
		// 				label={nfcDetails?.is_assigned ? 'Assigned' : 'Not Assigned'}
		// 				sx={{
		// 					backgroundColor: nfcDetails?.is_assigned
		// 						? theme.palette.success.main
		// 						: theme.palette.error.main
		// 				}}
		// 			/>
		// 		</Typography>
		// 	</Stack>
		// </div>
		<></>
	);
};

export default NFCInfoSidebar;
