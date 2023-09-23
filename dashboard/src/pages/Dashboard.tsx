import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import MapContainer from '../components/Dashboard/Map/MapContainer';
import BottomBar from '../components/BottomBar';
import Section1 from '../components/BottomBar/Section1';
import Section2 from '../components/BottomBar/Section2';
import Section3 from '../components/BottomBar/Section3';
import Section4 from '../components/BottomBar/Section4';
import { WidthFull } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { BandoBastProvider } from '../contexts/BandobastData';
import { FlyToLocationDataProvider } from '../contexts/FlyToLocation';
import { ShowDeviceOrOfficerContextProvider } from '../contexts/ShowDeviceOrOfficer';

const Dashboard = () => {
	return (
		<BandoBastProvider>
			<Box
				sx={{
					height: '100vh'
					// width: '100%'
				}}
			>
				<Section3 />

				<Grid container>
					<Grid
						item
						xs={12}
						md={12}
					>
						<Stack direction='column'>
							<Box>
								<MapContainer />
							</Box>
							<Box>
								<Section4 />
							</Box>
						</Stack>
					</Grid>
					{/* <Grid
						item
						xs={6}
						md={4}
					>
						<Section2 />
					</Grid> */}
				</Grid>
				{/* <BottomBar /> */}
				{/* <Box
					sx={{
						// position: 'absolute',
						// bottom: '20',
						zIndex: 10000,
						width: '100%',
						height:'100%'
						// overflow: 'hidden'
					}}
				>
				</Box>

				{/* <Box>
					<Button
						onClick={() => {
							if (socket) {
								socket.send(JSON.stringify({ message: 'Hello' }));
							}
						}}
						sx={{ position: 'absolute', top: '5%', left: '5%' }}
					>
						send
					</Button>
				</Box> */}
			</Box>
		</BandoBastProvider>
	);
};

export default () => {
	return (
		<ShowDeviceOrOfficerContextProvider>
			<FlyToLocationDataProvider>
				<Dashboard />
			</FlyToLocationDataProvider>
		</ShowDeviceOrOfficerContextProvider>
	);
};
