import { CircularProgress, Grid } from '@mui/material';
import {
	AppWidgetSummary
	// @ts-ignore
} from '../../../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import { GET } from '../../../api/fetch';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';import LocationOffRoundedIcon from '@mui/icons-material/LocationOffRounded';

type Props = {};

export type NumericalsResponseType = {
	num_of_officers: number;
	num_nfc_devices: number;
	late_scan_requests: number;
	pending_scans: number;
	on_time_scans: number;
	geo_fence_violations: number;
};

const dummyNumericals: NumericalsResponseType = {
	num_of_officers: 10,
	num_nfc_devices: 10,
	late_scan_requests: 10,
	pending_scans: 10,
	on_time_scans: 10,
	geo_fence_violations: 10
};

const Numericals = ({}: Props) => {
	const [numericals, setNumericals] = useState<NumericalsResponseType | null>(dummyNumericals);

	useEffect(() => {
		const bandobas_id = localStorage.getItem('bandobastId');
		GET(`stats/numerical/${bandobas_id}`).then(res => {
			console.log('fdsad', res);
			if (res?.late_scan_requests >= 0) {
				console.log('lakdsj', res);
				setNumericals(res);
			}
		});
	}, []);

	if(numericals === null) 
		return 

	return (
		<>
			<Grid
				item
				xs={12}
				sm={6}
				md={2}
			>
				<AppWidgetSummary
					title='Carbon Mono Oxide Emission'
					total={numericals.num_of_officers ? numericals.num_of_officers : '-'}
					icon={<LocalPoliceIcon fontSize='large' />}
				/>
			</Grid>

			<Grid
				item
				xs={12}
				sm={6}
				md={2}
			>
				<AppWidgetSummary
					title='Hydro Carbon Emission'
					total={numericals.num_nfc_devices ? numericals.num_nfc_devices : '-'}
					color='secondary'
					icon={<SettingsRemoteIcon fontSize='large' />}
				/>
			</Grid>

			<Grid
				item
				xs={12}
				sm={6}
				md={2}
			>
				<AppWidgetSummary
					title='Nitrogen Oxide Emission'
					total={numericals.late_scan_requests ? numericals.late_scan_requests : '-'}
					color='error'
					icon={<AccessTimeRoundedIcon fontSize='large' />}
				/>
			</Grid>

			<Grid
				item
				xs={12}
				sm={6}
				md={2}
			>
				<AppWidgetSummary
					title='Particulate Matter'
					total={numericals.pending_scans ? numericals.pending_scans : '-'}
					color='warning'
					icon={<PendingActionsRoundedIcon fontSize='large' />}
				/>
			</Grid>

			<Grid
				item
				xs={12}
				sm={6}
				md={2}
			>
				<AppWidgetSummary
					title='Carbon Dioxide Emission'
					total={numericals.on_time_scans ? numericals.on_time_scans : '-'}
					color='success'
					icon={<CheckCircleOutlineRoundedIcon fontSize='large' />}
				/>
			</Grid>

			<Grid
				item
				xs={12}
				sm={6}
				md={2}
			>
				<AppWidgetSummary
					title='Type of Bus'
					total={numericals.geo_fence_violations ? numericals.geo_fence_violations : '-'}
					color='error'
					icon={<LocationOffRoundedIcon fontSize='large' />}
				/>
			</Grid>
		</>
	);
};

export default Numericals;
