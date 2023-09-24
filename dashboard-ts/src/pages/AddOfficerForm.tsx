import { useState, useEffect, useContext } from 'react';
import {
	Box,
	Grid,
	Typography,
	TextField,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	useTheme,
	styled
} from '@mui/material';
import { AuthContext } from '../contexts/AuthProvider';
import { fetchDevices, assignDevice } from '../api/officerApi';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	color: `${theme.palette.primary.main}`,
	'&:hover': {
		backgroundColor: `${theme.palette.primary.light}`,
		borderRadius: 9,
		color: `${theme.palette.primary.contrastText}`
	}
}));

const imgUrl = '/officer2.png';

const AddOfficerForm = () => {
	const { accessToken } = useContext(AuthContext);
	const [devices, setDevices] = useState<any[]>([]);
	const [selectedDevice, setSelectedDevice] = useState<string>('');
	const theme = useTheme();

	const fetchData = async () => {
		try {
			const data = await fetchDevices(accessToken);
			setDevices(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const handleDeviceChange = (event: SelectChangeEvent<string>) => {
		setSelectedDevice(event.target.value as string);
	};

	const handleAssignDevice = async () => {
		// try {
		// 	await assignDevice(selectedDevice, accessToken);
		// } catch (error) {
		// 	console.error('Error assigning device:', error);
		// }
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection='column'
			p={4}
		>
			<Box mb={4}>
				<img
					src={imgUrl}
					alt='officer'
				/>
			</Box>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
				>
					<Typography variant='h4'>NFC Installation Form</Typography>
				</Grid>

				<Grid
					item
					xs={12}
					md={6}
				>
					<FormControl fullWidth>
						<InputLabel id='device-label'>BLE device id / NFC tag id</InputLabel>
						<Select
							labelId='device-label'
							id='device-select'
							value={selectedDevice}
							onChange={handleDeviceChange}
						>
							{devices.map(device => (
								<StyledMenuItem
									key={device.id}
									value={device.id}
								>
									{device.name}
								</StyledMenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<TextField
						fullWidth
						label='Police Officer ID'
						id='policeOfficerID'
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<TextField
						fullWidth
						label='Time of Duty'
						id='timeOfDuty'
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<Button
						variant='contained'
						onClick={handleAssignDevice}
						disabled={!selectedDevice}
						fullWidth
					>
						Assign Device
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AddOfficerForm;
