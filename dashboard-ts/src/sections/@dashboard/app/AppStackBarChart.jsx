import PropTypes from 'prop-types';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Box, Button } from '@mui/material';
import { fNumber } from '../../../utils/formatNumber';
import { useChart } from '../../chart';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
	height: CHART_HEIGHT,
	marginTop: theme.spacing(5),
	'& .apexcharts-canvas svg': { height: CHART_HEIGHT },
	'& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
		overflow: 'visible'
	},
	'& .apexcharts-legend': {
		height: LEGEND_HEIGHT,
		alignContent: 'center',
		position: 'relative !important',
		borderTop: `solid 1px ${theme.palette.divider}`,
		top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
	}
}));

const AppStackBarChart = ({ title, subheader, chartData }) => {
	const theme = useTheme();

	const chartOptions = useChart({
		colors: chartData.series.map(item => theme.palette.primary.main), // Change the colors as needed
		labels: chartData.series.map(item => item.name),
		stroke: { colors: [theme.palette.background.paper] },
		legend: { floating: true, horizontalAlign: 'center' },
		dataLabels: { enabled: true, dropShadow: { enabled: false } },
		tooltip: {
			fillSeriesColor: false,
			y: {
				formatter: seriesName => fNumber(seriesName),
				title: {
					formatter: seriesName => `${seriesName}`
				}
			}
		},
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
			categories: chartData.categories // Use categories from props
		},
		legend: {
			position: 'right',
			offsetY: 40
		},
		fill: {
			opacity: 1
		}
	});

	return (
		<Card>
			<CardHeader
				title={title}
				subheader={subheader}
			/>

			<StyledChartWrapper dir='ltr'>
				<ReactApexChart
					type='bar'
					series={chartData.series}
					options={chartOptions}
					height={280}
				/>
			</StyledChartWrapper>

			<Box sx={{ p: 0, textAlign: 'right' }}>
				<Button
					size='small'
					color='inherit'
				/>
			</Box>
		</Card>
	);
};

AppStackBarChart.propTypes = {
	title: PropTypes.string,
	subheader: PropTypes.string,
	chartData: PropTypes.shape({
		series: PropTypes.arrayOf(PropTypes.object),
		categories: PropTypes.arrayOf(PropTypes.string)
	})
};

export default AppStackBarChart;
