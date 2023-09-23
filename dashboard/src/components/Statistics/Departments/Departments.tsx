import { CircularProgress, Grid, useTheme } from '@mui/material';
import {
	AppCurrentVisits
	// @ts-ignore
} from '../../../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import { GET } from '../../../api/fetch';

type Props = {};

type DepartmentsResponseType = {
	department_distribution: Array<{
		label: string;
		value: number;
	}>;
	rank_distribution: Array<{
		label: string;
		value: number;
	}>;
};

const dummyDepartments: DepartmentsResponseType = {
	department_distribution: [
		{
			label: 'Police',
			value: 10
		},
		{
			label: 'Fire',
			value: 10
		},
		{
			label: 'Ambulance',
			value: 10
		},
		{
			label: 'Traffic',
			value: 10
		}
	],
	rank_distribution: [
		{
			label: 'Police',
			value: 10
		},
		{
			label: 'Fire',
			value: 10
		},
		{
			label: 'Ambulance',
			value: 10
		},
		{
			label: 'Traffic',
			value: 10
		}
	]
};

const Departments = ({}: Props) => {
	const theme = useTheme();

	const [departments, setDepartments] = useState<DepartmentsResponseType | null>(dummyDepartments);

	useEffect(() => {
		const bandobas_id = localStorage.getItem('bandobastId');
		GET(`stats/departments/${bandobas_id}`).then(res => {
			// console.log("asdfsfdaf", res)
			if (res?.department_distribution) {
				// console.log("lakfdsafsdadsj", res)
				setDepartments(res);
			}
		});
	}, []);

	return departments ? (
		<AppCurrentVisits
			title='Departments'
			type='pie'
			chartData={departments.department_distribution}
			chartColors={[
				theme.palette.primary.main,
				theme.palette.info.main,
				theme.palette.warning.main,
				theme.palette.error.main
			]}
		/>
	) : null;
};

export default Departments;
