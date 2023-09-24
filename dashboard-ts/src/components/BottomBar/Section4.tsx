import { Box, Grid, Paper, Typography, Divider } from '@mui/material';
import React from 'react';
import BarChart from '../charts/BarChart';
import DonutChart from '../charts/DonutChart';
import RadialBar from '../charts/RadialBar';
import LineChart from '../charts/LineChart';

type Props = {};

const Section4 = (props: Props) => {
	return (
		<Paper>
			<Typography
				sx={{
					mt: 0.6,
					ml: 2
				}}
				variant='h6'
				align='left'
			>
				Bus Report
			</Typography>
			<Divider />
			<Grid container>
				<Grid
					item
					xs={4}
					md={4}
					sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					<BarChart
						series={[400, 430, 448]}
						labels={['NAC Bus', 'Ac Bus', 'CNG Bus']}
					/>
				</Grid>
				<Grid
					item
					xs={4}
					md={4}
					sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					<DonutChart
						series={[23, 45, 12]}
						labels={['NAC Bus', 'Ac Bus', 'CNG Bus']}
						width={180}
						height={180}
					/>
				</Grid>
				{/* <Grid
					item
					xs={4}
					md={4}
				>
					<LineChart series={[]} />
				</Grid> */}
			</Grid>
		</Paper>
	);
};

export default Section4;
