import React, { useContext, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {
	TextField,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Box,
	Typography,
	Stack,
	Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import { AllOfficersOfBandobasType } from '../../../../api-types';
import { GET } from '../../../../api/fetch';
import { useTheme } from '@mui/material/styles';
import BandoBastContext from '../../../../contexts/BandobastData';
import { webSocketBaseUrl } from '../../../../constants';
import { FlyToLocationDataContext } from '../../../../contexts/FlyToLocation';
import { useNavigate } from 'react-router-dom';

interface Props {
	bandobastId: number | null;
}

type SocketMessageType = {
	type: string;
	data: {
		latitude: number;
		longitude: number;
	};
};

type OptionType = {
	id: number;
	police_user: {
		id: number;
		name: string;
		phone: string;
		rank: string;
		department: string;
		image_url: string;
	};
	fcm_token: string;
	device_id: string;
	duty_start_time: string;
	duty_end_time: string;
	created_by: number;
	assigned_nfc_device: number;
	weapons: string;
	is_currently_assigned?: boolean | undefined;
};

const SearchableDropdown: React.FC<Props> = ({ bandobastId }) => {
	const [selectedOfficer, setSelectedOfficer] = useState<AllOfficersOfBandobasType | null>(null);
	const [policeOfficers, setPoliceOfficers] = useState<AllOfficersOfBandobasType>([]);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);
	const { updateFlyToLocationData } = useContext(FlyToLocationDataContext);
	const bandobasContext = useContext(BandoBastContext);
	// console.log("searchable bandobas contextt", bandobasContext)

	const navigate = useNavigate();
	const theme = useTheme();

	// useEffect(() => {
	// 	const fetchOfficers = async () => {
	// 		if (bandobastId) {
	// 			const getAllOfficersOfBandobasResponse: AllOfficersOfBandobasType =
	// 				await GET(`bandobas-officers/bandobas/${bandobastId}/`);
	// 			setPoliceOfficers(getAllOfficersOfBandobasResponse);
	// 			console.log('policeOfficers', getAllOfficersOfBandobasResponse);
	// 		}
	// 	};

	// 	fetchOfficers();
	// }, [bandobastId]);

	const handleSelectPoliceOfficer = (
		_e: React.SyntheticEvent<Element, Event>,
		newValue: AllOfficersOfBandobasType | null
	) => {
		setSelectedOfficer(newValue);
	};
	// console.log('bandobasContext', bandobasContext);

	const handleInvokeSocketConnection = (option: OptionType) => {
		const newSocket = new WebSocket(webSocketBaseUrl + 'ws/location/' + option.id + '/');

		// console.log('newSocket with ID', newSocket);

		// WebSocket event handlers
		newSocket.onopen = () => {
			// console.log('WebSocket connection with ID established.');
		};

		newSocket.onmessage = event => {
			const data: SocketMessageType = JSON.parse(event.data);
			// console.log('WebSocket message received:', data);

			if (data.type === 'location_update' || data.type === 'init_location_update') {
				setLatitude(data.data.latitude);
				setLongitude(data.data.longitude);
				updateFlyToLocationData({
					latitude: data.data.latitude,
					longitude: data.data.longitude,
					zoom: 16
				});
			}
		};

		newSocket.onclose = () => {
			// console.log('WebSocket connection with ID closed.');
		};
	};

	return (
		<Box>
			<Autocomplete
				id='search-dropdown'
				// size='medium'
				sx={{
					width: 400
					// height: 50
				}}
				options={
					bandobasContext && bandobasContext.FilteredOfficers.length > 0
						? bandobasContext.FilteredOfficers
						: []
				}
				value={selectedOfficer}
				getOptionLabel={option => option.police_user.name}
				filterOptions={(options, { inputValue }) => {
					const inputValueLowerCase = inputValue.toLowerCase();
					return options.filter(
						option =>
							option.police_user.phone.toLowerCase().includes(inputValueLowerCase) ||
							option.police_user.department.toLowerCase().includes(inputValueLowerCase) ||
							option.police_user.rank.toLowerCase().includes(inputValueLowerCase) ||
							option.police_user.name.toLowerCase().includes(inputValueLowerCase) ||
							option.weapons.toLowerCase().includes(inputValueLowerCase)
					);
				}}
				onChange={handleSelectPoliceOfficer}
				renderInput={params => (
					<TextField
						{...params}
						label='Enter Bus no. to search'
						size='small'
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<>
									{params.InputProps.endAdornment}

									<SearchIcon
										fontSize='small'
										sx={{
											color: theme.palette.primary.main,
											mr: 1
										}}
									/>
								</>
							)
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
								setSelectedOfficer(option);
								handleInvokeSocketConnection(option);
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
												// src={option.police_user.image_url}
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
													{option.police_user.rank}, {option.police_user.department}
												</Typography>
											</Box>
										</Stack>
										<Typography variant='body1'>{option.weapons}</Typography>
									</>
								}
							/>
							<ListItemSecondaryAction>
								<IconButton
									edge='end'
									aria-label='Phone'
									onClick={() => {
										navigate(`/dashboard/chat/${option.police_user.phone}`);
									}}
								>
									<EmailIcon
										fontSize='small'
										sx={{ color: theme.palette.grey[500] }}
									/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</List>
				)}
			/>
		</Box>
	);
};

export default SearchableDropdown;
