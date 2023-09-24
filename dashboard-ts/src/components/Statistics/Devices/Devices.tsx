import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { GET } from '../../../api/fetch';
import {
	AppCurrentVisits
	// @ts-ignore
} from '../../../sections/@dashboard/app';

type Props = {};

type DevicesResponseType = Array<{
	label: string;
	value: number;
}>;

const dummyDevices: DevicesResponseType = [
	{
		label: 'On-Time Arrival',
		value: 7
	},
	{
		label: 'Late Arrival',
		value: 4
	},
	{
		label: 'Pending Stations',
		value: 2
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
			title='Station Arrival Status '
			type='pie'
			chartData={devices}
			chartColors={[
				theme.palette.success[600],
				theme.palette.error.main,
				// theme.palette.warning.main,
				theme.palette.display1.dark
			]}
		/>
	) : null;
};

export default Devices;
