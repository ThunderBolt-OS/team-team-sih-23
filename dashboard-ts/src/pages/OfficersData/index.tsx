import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Tab, Tabs, Typography, Box, styled, useTheme } from '@mui/material';
import { Home as HomeIcon, Devices as DevicesIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledTabs = styled(Tabs)(({ theme }) => ({
	flex: 1,
	display: 'flex',
	justifyContent: 'space-between'
}));

const OfficersAndDeviceData: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const theme = useTheme();
	const tabs = [
		{
			label: 'Officers',
			path: '/dashboard/data/officers',
			icon: <HomeIcon />
		},
		{
			label: 'Devices',
			path: '/dashboard/data/devices',
			icon: <DevicesIcon />
		}
	];

	// Get the index of the default tab ("/dashboard/data/officers")
	const defaultTabIndex = tabs.findIndex(tab => tab.path === '/dashboard/data/officers');

	// Use state to manage the selected tab index
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(defaultTabIndex);

	useEffect(() => {
		// Navigate to the selected tab's route when the component mounts
		if (selectedTabIndex >= 0 && selectedTabIndex < tabs.length) {
			navigate(tabs[selectedTabIndex].path);
		}
	}, []);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		if (newValue >= 0 && newValue < tabs.length) {
			setSelectedTabIndex(newValue);
			navigate(tabs[newValue].path);
		}
	};

	return (
		<>
			{/* <Typography
				variant='h5'
				gutterBottom
			>
				Officers and Devices Data
			</Typography> */}
			<StyledTabs
				value={selectedTabIndex}
				onChange={handleChange}
				sx={{ height: 80, mt: 2 }}
				variant='fullWidth'
			>
				{tabs.map(tab => (
					<Tab
						key={tab.label}
						label={tab.label}
						icon={tab.icon}
						sx={{
							// bgcolor: `${theme.palette.primary.light}`,
							borderRadius: 4,
							boxShadow: '0px 4px 4px rgba(24, 24, 24, 0.08)',
							'&.Mui-selected': {
								bgcolor: `${theme.palette.primary[200]}`,
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
								color: `${theme.palette.grey[800]}`
							},
							width: '40%',
							'&:hover': {
								backgroundColor: `${theme.palette.primary[300]}`,
								color: `${theme.palette.primary.dark}`,
								boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.005)'
							},
							height: 40,
							marginRight: 8,
							marginLeft: 8,
							'&:last-child': { marginRight: 8, marginLeft: 0 }
						}}
						iconPosition='start'
						component={Link}
						to={tab.path}
					/>
				))}
			</StyledTabs>
			<Box mt={2}>
				<Outlet />
			</Box>
		</>
	);
};

export default OfficersAndDeviceData;
