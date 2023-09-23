import { Box, List, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { GET } from '../../api/fetch';
import { BandobasResponseType } from '../Dashboard/Map/BandobasArea/BandobasArea';
import { BandobastOfficersResponseType } from '../Dashboard/Map/OfficersWithAssignedLocations/OfficerWithAssignedLocation';
import { GlobalContext } from '../../contexts/global';

interface AllReq {
	id: number;
	status: string;
	isAuth: boolean;
	expiry: string;
	request_time: string;
	police_scan_timestamp: any;
	network_admin: number;
	police: number;
}

const Section1 = () => {
	const { reloadScanRequests } = useContext(GlobalContext);
	const [AllReqs, setAllReqs] = useState<AllReq[]>([]);

	useEffect(() => {
		(async () => {
			const apiResponse: BandobasResponseType = await GET('bandobast/');

			if (apiResponse?.data?.length > 0) {
				// TODO change data indexing location
				const bandobastId = apiResponse.data[0].id;
				// console.log('bandobastId', bandobastId);
				// console.log('apiResponse', apiResponse);

				const pendingReqs: AllReq[] = await GET('scan/requests/history/');
				// console.log('pendingReqs', pendingReqs);
				setAllReqs(pendingReqs);
			}
		})();
	}, [reloadScanRequests]);

	return (
		<TableContainer
			component={Paper}
			sx={{ height: '22vh', overflow: 'auto' }}
		>
			<Table
				sx={{ width: '100%' }}
				size='small'
				aria-label='a dense table'
				stickyHeader
			>
				<TableHead>
					<TableRow>
						<TableCell>id</TableCell>
						<TableCell>Expiry</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Last Scanned</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{AllReqs.length > 0 &&
						AllReqs.map(row => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell>{row.id}</TableCell>
								<TableCell>{new Date(row.expiry).toLocaleString()}</TableCell>
								<TableCell>{row.status === 'on_time' ? "On Time" : row.status}</TableCell>
								<TableCell>
									{row.police_scan_timestamp
										? new Date(row.police_scan_timestamp).toLocaleString()
										: '--'}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Section1;
