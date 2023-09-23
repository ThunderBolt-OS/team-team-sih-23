import React from 'react';
import BarChart from './charts/BarChart';
import DonutChart from './charts/DonutChart';
import LineChart from './charts/LineChart';
import RadialBar from './charts/RadialBar';
import SimpleTable from './SimpleTable';

interface Dimension {
	height?: number;
	width: number;
}

const dimensions: Dimension[] = [
	{
		height: 100,
		width: 100
	},
	{
		height: 80,
		width: 200
	},
	{
		height: 90,
		width: 210
	},
	{
		width: 100
	}
];

const BottomCharts: React.FC = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'stretch'
			}}
		>
			{/* chart 1 */}
			<div style={{ border: '1px solid #C69749', paddingInline: '10px' }}>
				<h3 style={{ marginBottom: 10 }}>Categorization</h3>
				<div style={{ display: 'flex' }}>
					<DonutChart
						labels={['Police Force 1', 'Police Force 2', 'Police Force 3']}
						series={[20, 30, 50]}
						width={dimensions[0].width}
						height={dimensions[0].height}
					/>
					<SimpleTable
						data={[
							{
								name: 'Police Force 1',
								count: 20
							},
							{
								name: 'Police Force 2',
								count: 30
							},
							{
								name: 'Police Force 3',
								count: 40
							}
						]}
					/>
				</div>
			</div>

			{/* chart 2 */}
			<div style={{ border: '1px solid #C69749', paddingInline: '10px' }}>
				<h3 style={{ marginBottom: 10 }}>Police In Location Overtime</h3>
				<div style={{ display: 'flex' }}>
					<LineChart
						series={[
							{
								name: '',
								data: [10, 20, 30, 35, 40]
							}
						]}
						width={dimensions[1].width}
						height={dimensions[1].height}
					/>
					<SimpleTable
						data={[
							{
								name: new Date().toLocaleTimeString(),
								count: 20
							},
							{
								name: new Date(new Date().getTime() + 10 * 60000).toLocaleTimeString(),
								count: 30
							},
							{
								name: new Date(new Date().getTime() + 20 * 60000).toLocaleTimeString(),
								count: 40
							},
							{
								name: new Date(new Date().getTime() + 30 * 60000).toLocaleTimeString(),
								count: 40
							},
							{
								name: new Date(new Date().getTime() + 40 * 60000).toLocaleTimeString(),
								count: 40
							}
						]}
					/>
				</div>
			</div>

			{/* chart 3 */}
			<div style={{ border: '1px solid #C69749', paddingInline: '10px' }}>
				<h3 style={{ marginBottom: 0 }}>Artilary Distribution</h3>
				<div style={{ display: 'flex' }}>
					<BarChart
						series={[
							{
								name: '',
								data: [10, 20, 30, 35, 20]
							}
						]}
						labels={['Pistols', 'Rifles', 'Sticks', 'Guns']}
						width={dimensions[2].width}
						height={dimensions[2].height}
					/>
				</div>
			</div>

			{/* chart 4 */}
			<div style={{ border: '1px solid #C69749', paddingInline: '10px' }}>
				<h3 style={{ marginBottom: 0 }}>Location Log</h3>
				<div style={{ display: 'flex' }}>
					<RadialBar
						series={[10, 70, 20]}
						width={dimensions[3].width}
					/>
					<SimpleTable
						data={[
							{
								name: new Date().toLocaleTimeString(),
								count: 20
							},
							{
								name: new Date(new Date().getTime() + 10 * 60000).toLocaleTimeString(),
								count: 30
							},
							{
								name: new Date(new Date().getTime() + 20 * 60000).toLocaleTimeString(),
								count: 40
							},
							{
								name: new Date(new Date().getTime() + 30 * 60000).toLocaleTimeString(),
								count: 40
							},
							{
								name: new Date(new Date().getTime() + 40 * 60000).toLocaleTimeString(),
								count: 40
							}
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default BottomCharts;
