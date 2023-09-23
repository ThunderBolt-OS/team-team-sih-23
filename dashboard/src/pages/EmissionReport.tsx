import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import Numericals from '../components/Statistics/Numericals/Numericals';
import Departments from '../components/Statistics/Departments/Departments';
import Devices from '../components/Statistics/Devices/Devices';
import StackBarChart from '../components/charts/StackBarChart';
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

interface Option {
	trip: string;
	bus: string;
}

const options: Option[] = [
	{ trip: 'Trip 1', bus: 'Bus 1' },
	{ trip: 'Trip 2', bus: 'Bus 2' },
	{ trip: 'Trip 3', bus: 'Bus 3' }
];

const EmissionReport: React.FC = () => {
	const theme = useTheme();
	const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
	const [selectedBus, setSelectedBus] = useState<string | null>(null);

	const handleTripChange = (event: React.ChangeEvent<{}>, value: string | null) => {
		setSelectedTrip(value);
		// Find the corresponding bus for the selected trip
		const matchingBus = options.find(option => option.trip === value);
		if (matchingBus) {
			setSelectedBus(matchingBus.bus);
		} else {
			setSelectedBus(null);
		}
	};

	const handleBusChange = (event: React.ChangeEvent<{}>, value: string | null) => {
		setSelectedBus(value);
		// Find the corresponding trip for the selected bus
		const matchingTrip = options.find(option => option.bus === value);
		if (matchingTrip) {
			setSelectedTrip(matchingTrip.trip);
		} else {
			setSelectedTrip(null);
		}
	};

	return (
		<Box>
			<Stack
				direction='row'
				spacing={2}
				sx={{
					mt: 1
				}}
			>
				<Autocomplete
					fullWidth
					options={options.map(option => option.trip)}
					value={selectedTrip}
					onChange={handleTripChange}
					renderInput={params => (
						<TextField
							{...params}
							label='Select Trip'
							InputProps={{
								...params.InputProps,
								startAdornment: (
									<>
										<LocationOnRoundedIcon fontSize='small' />
										{params.InputProps.startAdornment}
									</>
								)
							}}
						/>
					)}
				/>
				<Autocomplete
					fullWidth
					options={options.map(option => option.bus)}
					value={selectedBus}
					onChange={handleBusChange}
					renderInput={params => (
						<TextField
							{...params}
							label='Select Bus'
							InputProps={{
								...params.InputProps,
								startAdornment: (
									<>
										<DirectionsBusRoundedIcon fontSize='small' />
										{params.InputProps.startAdornment}
									</>
								)
							}}
						/>
					)}
				/>
			</Stack>

			{!selectedTrip && !selectedBus ? (
				<Typography
					variant='h1'
					sx={{ mt: 35 }}
					align='center'
				>
					Select a trip and bus to view the emission report
				</Typography>
			) : (
				<>
					<Grid
						container
						spacing={2}
						sx={{
							mt: 1
						}}
					>
						<Numericals />
					</Grid>

					<Grid
						container
						sx={{
							mt: 1
						}}
						spacing={2}
					>
						<Grid
							item
							xs={12}
							md={6}
							lg={4}
						>
							<StackBarChart />
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
					</Grid>
				</>
			)}
		</Box>
	);
};

export default EmissionReport;
