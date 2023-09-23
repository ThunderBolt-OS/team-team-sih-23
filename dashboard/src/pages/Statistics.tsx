/* eslint-disable react/jsx-boolean-value */
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
// components
// import ChatBot from 'react-simple-chatbot';
// import { ThemeProvider } from '@mui/material/styles';
// sections
import {
	// AppTasks,
	AppNewsUpdate,
	AppOrderTimeline,
	AppCurrentVisits,
	AppWebsiteVisits,
	AppTrafficBySite,
	AppWidgetSummary,
	AppCurrentSubject,
	AppConversionRates
	// @ts-ignore
} from '../sections/@dashboard/app';
import Numericals from '../components/Statistics/Numericals/Numericals';
import Departments from '../components/Statistics/Departments/Departments';
import Devices from '../components/Statistics/Devices/Devices';

// ----------------------------------------------------------------------

export default function Statistics() {
	const theme = useTheme();

	const steps = [
		{
			id: '1',
			message: 'Hello, Welcome Mr. Modiji',
			trigger: '2'
		},
		{
			id: '2',
			options: [
				{ value: 1, label: 'Deiffernce between applications and my tenders ?', trigger: '4' },
				{ value: 2, label: 'How to see an accident or an issue ?', trigger: '3' }
			]
		},
		{
			id: '3',
			message: 'Click the map button to see. you can also share this lcation to concerned authority.',
			trigger: '2'
		},
		{
			id: '4',
			message:
				'Applications are proposals built by contractors without the tender issued by government. Tenders are issued by the government where contractors apply and place bids.',
			end: true
		}
	];

	return (
		<Box sx={{ overflow: 'auto', height: '100vh' }}>
			<Container
				maxWidth='xl'
				sx={{ py: 4 }}
			>
				<Grid
					container
					spacing={3}
				>
					<Numericals />

					<Grid
						item
						xs={12}
						md={6}
						lg={8}
					>
						<AppWebsiteVisits
							title='Scan Distribution'
							subheader='(+43%) than last year'
							chartLabels={[
								'01/01/2022',
								'02/01/2022',
								'03/01/2022',
								'04/01/2022',
								'05/01/2022',
								'06/01/2022',
								'07/01/2022',
								'08/01/2022',
								'09/01/2022',
								'10/01/2022',
								'11/01/2022'
							]}
							chartData={[
								{
									name: 'Officers',
									type: 'area',
									fill: 'gradient',
									data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
								},
								{
									name: 'Total Scans',
									type: 'line',
									fill: 'solid',
									data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
								},
								{
									name: 'Pending Scans',
									type: 'line',
									fill: 'gradient',
									data: [40, 50, 35, 42, 32, 50, 31, 41, 26, 23, 53]
								},
								{
									name: 'Late Scans',
									type: 'line',
									fill: 'solid',
									data: [20, 45, 23, 41, 23, 25, 12, 42, 34, 61, 25]
								},
								{
									name: 'On Time Scans',
									type: 'line',
									fill: 'solid',
									data: [42, 12, 36, 40, 35, 23, 45, 16, 48, 41, 62]
								}
							]}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={4}
					>
						<Departments />
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={4}
					>
						<Devices />
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={4}
					>
						<AppCurrentVisits
							title='Geo Location Violations'
							type='pie'
							chartData={[
								{ label: 'Yes', value: 4344 },
								{ label: 'No', value: 1545 }
							]}
							chartColors={[
								theme.palette.primary.main,
								theme.palette.info.main,
								theme.palette.warning.main,
								theme.palette.error.main
							]}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={4}
					>
						<AppCurrentSubject
							title='Department wise scan performance'
							chartLabels={['Mumbai Police', 'State Police', 'CISF', 'CRPF', 'SPG', 'NSG']}
							chartData={[
								{ name: 'On Time', data: [80, 50, 30, 40, 55, 62] },
								{ name: 'Pending', data: [20, 30, 40, 80, 21, 36] },
								{ name: 'Late', data: [44, 76, 78, 13, 32, 48] }
							]}
							chartColors={[...Array(3)].map(() => theme.palette.text.secondary)}
						/>
					</Grid>

					{/* <ChatBot steps={steps} floating={true} recognitionEnable={true} /> */}
				</Grid>
			</Container>
		</Box>
	);
}
