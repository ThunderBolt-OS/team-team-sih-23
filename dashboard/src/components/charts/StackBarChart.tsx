import { Box, Grid, Paper } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexCharts from 'react-apexcharts';

type Props = {

};


const StackBarChart: React.FC<Props> = () => {
	const chartData = {
		series: [
			{
				name: 'PRODUCT A',
				data: [44, 55, 41, 67, 22, 43]
			},
			{
				name: 'PRODUCT B',
				data: [13, 23, 20, 8, 13, 27]
			},
			{
				name: 'PRODUCT C',
				data: [11, 17, 15, 15, 21, 14]
			},
			{
				name: 'PRODUCT D',
				data: [21, 7, 25, 13, 22, 8]
			}
		]
	};

	const chartOptions: ApexOptions = {
		chart: {
			type: 'bar',
			stacked: true,
			// toolbar: {
			// 	show: true
			// },
			zoom: {
				enabled: true
			}
		},
		// responsive: [
		// 	{
		// 		options: {
		// 			legend: {
		// 				position: 'bottom',
		// 				offsetX: -10,
		// 				offsetY: 0
		// 			}
		// 		}
		// 	}
		// ],
		plotOptions: {
			bar: {
				horizontal: false,
				borderRadius: 10,
				dataLabels: {
					total: {
						enabled: true,
						style: {
							fontSize: '13px',
							fontWeight: 900
						}
					}
				}
			}
		},
		xaxis: {
			type: 'datetime',
			categories: [
				'01/01/2011 GMT',
				'01/02/2011 GMT',
				'01/03/2011 GMT',
				'01/04/2011 GMT',
				'01/05/2011 GMT',
				'01/06/2011 GMT'
			]
		},
		legend: {
			position: 'right',
			offsetY: 40
		},
		fill: {
			opacity: 1
		}
	};

	return (
		<Paper>
			<Grid container>
				<Grid
					item
					xs={6}
					md={6}
				>
					<ReactApexCharts
						options={chartOptions}
						series={chartData.series}
						type='bar'
						height={420}
						width={450}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default StackBarChart;
