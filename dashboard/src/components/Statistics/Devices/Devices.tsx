import { CircularProgress, Grid, useTheme } from '@mui/material';
import {
	AppCurrentVisits
	// @ts-ignore
} from '../../../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import { GET } from '../../../api/fetch';

type Props = {};

type DevicesResponseType = Array<{
	label: string;
	value: number;
}>;

const dummyDevices: DevicesResponseType = [
	{
		label: 'Mobile',
		value: 10
	},
	{
		label: 'Desktop',
		value: 10
	},
	{
		label: 'Tablet',
		value: 10
	},
	{
		label: 'Others',
		value: 10
	}
];

const Devices = ({}: Props) => {
	const theme = useTheme();

	const [devices, setDevices] = useState<DevicesResponseType | null>(dummyDevices);

	useEffect(() => {
		const bandobas_id = localStorage.getItem('bandobastId');
		GET(`stats/devices/${bandobas_id}`).then(res => {
			// console.log("asdfsfdaf", res)
			if (res?.length > 0) {
				// console.log("lakfdsafsdadsj", res)
				setDevices(res);
			}
		});
	}, []);

	return devices ? (
		<AppCurrentVisits
			title='Devices'
			type='pie'
			chartData={devices}
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
