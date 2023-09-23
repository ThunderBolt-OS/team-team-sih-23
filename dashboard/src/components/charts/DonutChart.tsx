import React from 'react';
import Chart from 'react-apexcharts';

const COLORS: { [key: number]: string } = {
	1: '#C69749',
	2: '#735F32',
	3: '#FFBF9B',
	4: '#735F32'
};

export const chartColors = [COLORS[1], COLORS[2], COLORS[3], COLORS[4]];

interface DonutChartProps {
	height?: number;
	width?: number;
	labels: string[];
	series: number[];
	colors?: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({ height = 120, width = 120, labels, series, colors = chartColors }) => {
	const options = {
		colors: colors,
		stroke: {
			show: false
		},
		legend: {
			show: false
		},
		plotOptions: {
			pie: {
				expandOnClick: false,
				donut: {
					size: '75%',
					background: 'transparent',
					labels: {
						show: false,
						name: {
							show: false
						}
					}
				}
			}
		},
		labels: labels,
		dataLabels: {
			enabled: false
		}
	};

	return (
		<Chart
			options={options}
			series={series}
			type='donut'
			height={height}
			width={width}
		/>
	);
};

export default DonutChart;
