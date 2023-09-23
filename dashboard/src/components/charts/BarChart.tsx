import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { chartColors } from './DonutChart';

interface BarChartProps {
	series: number[];
	labels: string[];
	height?: number;
	width?: string | number;
	colors?: string[];
}

const BarChart: React.FC<BarChartProps> = ({ series, labels, height = 150, width, colors = chartColors }) => {
	const options: ApexOptions = {
		colors: colors,
		tooltip: {
			fillSeriesColor: false,
			x: {
				show: false
			}
		},
		chart: {
			type: 'bar',
			toolbar: {
				show: false
			}
		},
		dataLabels: {
			enabled: false
		},
		grid: {
			borderColor: '#f1f1f1',
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
		plotOptions: {
			bar: {
				borderRadius: 4,
				horizontal: true
			}
		},
		xaxis: {
			categories: labels,
			tickPlacement: 'on',
			labels: {
				show: false
			},
			tooltip: {
				enabled: false
			}
		},
		yaxis: {
			labels: {
				style: {
					colors: '#9aa0ac'
				}
			}
		},
		legend: {
			show: true
		}
	};

	return (
		<Chart
			type='bar'
			options={options}
			series={series}
			height={height}
			width={width}
		/>
	);
};

export default BarChart;
