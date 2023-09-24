import React from 'react';
import Chart from 'react-apexcharts';
import { chartColors } from './DonutChart';

interface LineChartProps {
	height?: number;
	width?: number;
	series: number[]; // Update the type to number[]
	colors?: string[];
	areaFormat?: boolean;
}
const LineChart: React.FC<LineChartProps> = ({
	height = 90,
	width,
	series,
	colors = chartColors,
	areaFormat = false
}) => {
	const options = {
		tooltip: {
			fillSeriesColor: false,
			x: {
				show: false
			}
		},
		chart: {
			type: 'line',
			toolbar: {
				show: false
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: 'smooth',
			colors: colors,
			width: 2
		},
		grid: {
			//borderColor: '#f1f1f1',
			xaxis: {
				lines: {
					show: false
				}
			},
			yaxis: {
				lines: {
					show: false
				}
			}
		},
		markers: {
			size: 1
		},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
			tickPlacement: 'on',
			labels: {
				show: false
			},
			tooltip: {
				enabled: false
			}
		},
		yaxis: {
			show: false,
			title: {
				text: 'Temperature'
			},
			min: 5,
			max: 40,
			tooltip: {
				enabled: false
			}
		},
		legend: {
			show: false
		}
	};

	return (
		<Chart
			// options={options}
			series={[{ data: series }]} // Wrap the series data in an array of objects
			type={areaFormat ? 'area' : 'line'}
			height={height}
			width={width}
		/>
	);
};

export default LineChart;
