import React, { useState, useContext } from 'react';
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Button,
	ListItemIcon,
	Paper,
	IconButton,
	Typography
} from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MapIcon from '@mui/icons-material/Map';
// import theme from '../theme/theme';
import { useTheme } from '@mui/material/styles';
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';
import LanguageContext from '../contexts/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import TableChartIcon from '@mui/icons-material/TableChart';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import PersonIcon from '@mui/icons-material/Person';
import { Cookies } from 'react-cookie';
import RealTimeBandobasScore from './RealTimeBandobasScore/RealTimeBandobasScore';

const routes = [
	{
		name: 'Dashboard',
		path: '/dashboard',
		icon: <GridViewRoundedIcon />
	},
	// {
	// 	name: 'New Bandobast',
	// 	path: '/create-bandobast',
	// 	icon: <MapIcon />
	// },
	{
		name: 'Data Dashboard',
		path: '/dashboard/data',
		icon: <TableChartIcon />
	},
	{
		name: 'Emission Report',
		path: '/dashboard/emission-report',
		icon: <AssignmentIndIcon />
	},
	{
		name: 'Emission Statistics',
		path: '/dashboard/statistics',
		icon: <LeaderboardRoundedIcon />
	}
	// {
	// 	name: 'Officer',
	// 	path: '/dashboard/officer',
	// 	icon: <PersonIcon />
	// }
];

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [sidebarVisible, setSidebarVisible] = useState(true);
	const languageContext = useContext(LanguageContext);
	const theme = useTheme();
	const toggleSidebar = () => {
		setSidebarVisible(prevValue => !prevValue);
	};

	const isCurrentNavActive = (path: string) => {
		const currentRoute = useLocation().pathname;
		if (currentRoute.includes('/dashboard/data/')) {
			if (path == '/dashboard/data') return true;
		}
		if (currentRoute === path) return true;
		else return false;
	};

	const handleLogout = () => {
		localStorage.clear();

		navigate('/');
	};

	return (
		<Box
			sx={{
				display: 'flex',
				maxHeight: '100vh',
				overflow: 'hidden'
			}}
		>
			{/* Sidebar content */}
			<Box
				sx={{
					p: 2,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					transition: 'width 0.4s ease',
					overflow: 'hidden',
					width: sidebarVisible ? '256px' : '80px'
				}}
			>
				{/* if the sidebar is not visible ie its strip  */}
				<Box
					sx={{
						display: 'flex',
						alignItems: sidebarVisible ? 'center' : '',
						justifyContent: 'center'
					}}
				>
					<IconButton
						onClick={toggleSidebar}
						sx={{
							backgroundColor: 'transparent',
							'&:hover': {
								backgroundColor: 'transparent'
							}
						}}
					>
						{/* <img
							src={sidebarVisible ? '/newLogo.png' : '/logo.png'}
							alt='Logo'
							style={{
								width: sidebarVisible ? '11%' : '11%',
								transform: sidebarVisible ? 'scale(1)' : 'rotate(0deg)'
							}}
						/> */}
					</IconButton>
					{/* <Typography
						variant='h1'
						align='center'
						sx={{
							marginBottom: 0,
							display: sidebarVisible ? 'block' : 'none'
						}}
					>
						Chakra View
					</Typography> */}
				</Box>
				{!sidebarVisible && (
					<Box>
						<>
							{routes.map((route, index) => (
								<IconButton
									key={index}
									color={location.pathname === route.path ? 'primary' : undefined}
									onClick={() => navigate(route.path)}
									sx={{
										display: 'flex',
										justifyContent: 'center',
										my: 2.4
									}}
								>
									{route.icon}
								</IconButton>
							))}
						</>
					</Box>
				)}

				<List sx={{ mb: 4 }}>
					{routes.map((r, index) => (
						<ListItem
							key={r.name + index}
							disablePadding
							sx={{
								display: sidebarVisible ? 'block' : 'none',
								bgcolor: isCurrentNavActive(r.path) ? `${theme.palette.primary.light}` : 'initial',
								'&.hover': {
									bgcolor: `${theme.palette.primary.main}`
								},
								borderRadius: '8px',
								marginBlock: '8px'
							}}
						>
							<ListItemButton
								// sx={{
								// 	color: isCurrentNavActive(r.path)
								// 		? `${theme.palette.primary.dark}`
								// 		: `${theme.palette.primary.main}`,
								// }}
								onClick={() => navigate(r.path)}
							>
								<ListItemIcon
									sx={{
										color: isCurrentNavActive(r.path)
											? `${theme.palette.primary.dark}`
											: `${theme.palette.primary.light}`,

										display: 'block',
										width: sidebarVisible ? 'auto' : '32px',
										height: '24px',
										marginLeft: '8px',
										marginRight: '8px'
									}}
								>
									{r.icon}
								</ListItemIcon>
								<ListItemText
									primary={languageContext && languageContext?.TextWrapper(r.name)}
									sx={{
										color: `${theme.palette.primary.main}`,
										display: sidebarVisible ? 'block' : 'none'
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				{/* {sidebarVisible ? <RealTimeBandobasScore /> : <></>} */}

				{sidebarVisible ? (
					<Button
						variant='outlined'
						color='error'
						fullWidth
						onClick={() => handleLogout()}
						endIcon={<LogoutIcon />}
					>
						Logout
					</Button>
				) : (
					<IconButton
						color='error'
						sx={{
							display: 'flex',
							justifyContent: 'center',
							width: '86%'
						}}
						onClick={() => handleLogout()}
					>
						<LogoutIcon />
					</IconButton>
				)}

				{/* <Button
					variant='outlined'
					color='error'
					fullWidth
					onClick={() => handleLogout()}
					endIcon={<LogoutIcon />}
				>
					Logout
				</Button> */}
			</Box>

			<Box
				sx={{
					flex: 1,
					width: '100%',
					overflow: 'hidden'
				}}
			>
				<Paper
					sx={{
						padding: 1,
						backgroundColor: theme.palette.grey[200],
						height: '100vh'
					}}
				>
					<Outlet />
				</Paper>
			</Box>
		</Box>
	);
};

export default Sidebar;
