import { Box, Paper, Typography, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { GET } from '../../api/fetch';
import { NumericalsResponseTypeDummy } from '../Statistics/Numericals/Numericals';
import { BandobasResponseType } from '../Dashboard/Map/BandobasArea/BandobasArea';

const dummyNumericals: NumericalsResponseTypeDummy = {
	num_of_officers: 241,
	num_nfc_devices: 4,
	late_scan_requests: 'Diesel',
	pending_scans: 6,
	on_time_scans: 369,
	geo_fence_violations: 571
};

const Section3 = () => {
	const [numericals, setNumericals] = useState<NumericalsResponseTypeDummy | null>(dummyNumericals);
	const theme = useTheme();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiResponse = await GET('bandobast/');

				if (apiResponse?.data?.length > 0) {
					const bandobas_id = apiResponse.data[0].id;
					const numericalApiResponse = await GET(`stats/numerical/${bandobas_id}`);
					console.info('this is useeffect of section3', numericalApiResponse);

					if (numericalApiResponse?.late_scan_requests >= 0) {
						console.log('this is section 3', numericalApiResponse);
						setNumericals(numericalApiResponse);
					}
				} else {
					const bandobas_id = localStorage.getItem('bandobastId');
					const numericalApiResponse = await GET(`stats/numerical/${bandobas_id}`);
					console.info('this is useeffect of section3', numericalApiResponse);

					if (numericalApiResponse?.late_scan_requests >= 0) {
						console.log('this is section 3', numericalApiResponse);
						setNumericals(numericalApiResponse);
					}
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	// const options: ApexOptions = {
	// 	series: [{
	// 		name: "Desktops",
	// 		data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
	// 	}],
	// 	chart: {
	// 		height: 350,
	// 		type: 'line',
	// 		zoom: {
	// 			enabled: false
	// 		}
	// 	},
	// 	dataLabels: {
	// 		enabled: false
	// 	},
	// 	stroke: {
	// 		curve: 'straight'
	// 	},
	// 	title: {
	// 		text: 'Categorization',
	// 		align: 'left'
	// 	},
	// 	grid: {
	// 		row: {
	// 			colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
	// 			opacity: 0.5
	// 		},
	// 	},
	// 	xaxis: {
	// 		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
	// 	}
	// };

	return (
		<Paper
			sx={{
				overflow: 'auto',
				// mb: 1,
				p: 0.5,
				height: '15vh',
				borderTopLeftRadius: '13px',
				borderTopRightRadius: '13px',
				borderBottomRightRadius: '0px',
				borderBottomLeftRadius: '0px'
			}}
		>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
					textAlign: 'center',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					mt: 1,
				}}
			>
				<Box
					sx={{
						border: `1px solid ${theme.palette.primary[50]}`,
						bgcolor: `#fff4ff`,
						borderRadius: '4px',
						padding: '8px',
						py: '9px'
					}}
				>
					<Typography
						variant='h5'
						sx={{ color: `${theme.palette.primary.main}` }}
					>
						Buses
					</Typography>
					<Typography
						variant='subtitle1'
						sx={{ fontSize: 26 }}
					>
						{numericals?.num_of_officers ? numericals?.num_of_officers : '-'}
					</Typography>
				</Box>
				<Box
					sx={{
						border: `1px solid ${theme.palette.primary[50]}`,
						bgcolor: `#fff4ff`,
						borderRadius: '4px',
						padding: '8px',
						py: '9px'
					}}
				>
					<Typography
						variant='h5'
						sx={{ color: `${theme.palette.primary.main}` }}
					>
						Carbon FootPrint:
					</Typography>
					<Typography
						variant='subtitle1'
						sx={{ fontSize: 26 }}
					>
						{numericals?.num_nfc_devices ? numericals?.num_nfc_devices : '-'}
					</Typography>
				</Box>
				<Box
					sx={{
						border: `1px solid ${theme.palette.primary[50]}`,
						bgcolor: `#fff4ff`,
						borderRadius: '4px',
						padding: '8px',
						py: '9px'
					}}
				>
					<Typography
						variant='h5'
						sx={{ color: `${theme.palette.primary.main}` }}
					>
						Avg. Fuel Used:
					</Typography>
					<Typography
						variant='subtitle1'
						sx={{ fontSize: 26 }}
					>
						{numericals?.late_scan_requests ? numericals?.late_scan_requests : '-'}
					</Typography>
				</Box>
				<Box
					sx={{
						border: `1px solid ${theme.palette.primary[50]}`,
						bgcolor: `#fff4ff`,
						borderRadius: '4px',
						padding: '8px',
						py: '9px'
					}}
				>
					<Typography
						variant='h5'
						sx={{ color: `${theme.palette.primary.main}` }}
					>
						Avg. BS Rating:
					</Typography>
					<Typography
						variant='subtitle1'
						sx={{ fontSize: 26 }}
					>
						{numericals?.pending_scans ? numericals?.pending_scans : '-'}
					</Typography>
				</Box>
				<Box
					sx={{
						border: `1px solid ${theme.palette.primary[50]}`,
						bgcolor: `#fff4ff`,
						borderRadius: '4px',
						padding: '8px',
						py: '9px'
					}}
				>
					<Typography
						variant='h5'
						sx={{ color: `${theme.palette.primary.main}` }}
					>
						Today's Commuters:
					</Typography>
					<Typography
						variant='subtitle1'
						sx={{ fontSize: 26 }}
					>
						{numericals?.on_time_scans ? numericals?.on_time_scans : '-'}
					</Typography>
				</Box>
				<Box
					sx={{
						border: `1px solid ${theme.palette.primary[50]}`,
						bgcolor: `#fff4ff`,
						borderRadius: '4px',
						padding: '8px',
						py: '9px'
					}}
				>
					<Typography
						variant='h5'
						sx={{ color: `${theme.palette.primary.main}` }}
					>
						No. of Trips
					</Typography>
					<Typography
						variant='subtitle1'
						sx={{ fontSize: 26 }}
					>
						{numericals?.geo_fence_violations ? numericals?.geo_fence_violations : '-'}
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

export default Section3;
