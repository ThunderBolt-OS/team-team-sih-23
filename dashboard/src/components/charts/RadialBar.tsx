import React from 'react';
import Chart from 'react-apexcharts';
import { chartColors } from './DonutChart';

const RadialBar: React.FC<{
	width?: number;
	hollowSize?: number;
	colors?: string[];
	series: number[];
}> = ({ width = 130, hollowSize = 20, colors = chartColors, series }) => {
	const options = {
		colors: colors,
		grid: {
			padding: {
				left: -10
			}
		},
		plotOptions: {
			radialBar: {
				hollow: {
					size: hollowSize + '%'
				},
				dataLabels: {
					show: false
				},
				track: {
					background: '#000'
				}
			}
		},
		stroke: {
			lineCap: 'round'
		},
		labels: ['Progress']
	};

	return (
		<Chart
			// options={options} //! need help in here
			series={series}
			type='radialBar'
			width={width}
		/>
	);
};

export default RadialBar;
