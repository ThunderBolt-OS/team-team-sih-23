import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import {
	AppStackBarChart
	// @ts-ignore
} from '../../../sections/@dashboard/app';
import { GET } from '../../../api/fetch';

type Device = {
	label: string;
	value: number;
};

type DevicesState = {
	chartData: {
		series: number[];
		categories: string[];
	} | null;
};

const Devices: React.FC = () => {
	const theme = useTheme();

	const [devices, setDevices] = useState<DevicesState>({
		chartData: null
	});

	useEffect(() => {
		const bandobas_id = localStorage.getItem('bandobastId');
		GET(`stats/devices/${bandobas_id}`).then(res => {
			if (res?.length > 0) {
				setDevices(res);
			}
		});
	}, []);

	return devices ? (
		<AppStackBarChart
			title='Stack Bar Chart'
			type='bar'
			chartData={{
				series: devices.chartData?.series,
				categories: devices.chartData?.categories
			}}
			chartColors={[
				theme.palette.primary.main,
				theme.palette.info.main,
				theme.palette.warning.main,
				theme.palette.error.main
			]}
		/>
	) : null;
};

export default Devices;
