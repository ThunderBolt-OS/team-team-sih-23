import React, { useContext, useEffect, useMemo, useState } from 'react';

//MRT Imports
//import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table'; //default import deprecated
import { MaterialReactTable, type MRT_ColumnDef, type MRT_Row } from 'material-react-table';

import { ExportToCsv } from 'export-to-csv';

//Material UI Imports
import { Box, Button, IconButton, ListItemIcon, MenuItem, Typography } from '@mui/material';

//Date Picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Icons Imports
import { AccountCircle, Highlight, Send } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MyLocationIcon from '@mui/icons-material/MyLocation';

//Mock Data
// import { data } from '../dummyData';
import { OfficerData } from '../../api/OfficerDataInterface';
import { djangoBaseUrl } from '../../constants';
import { GET, POST } from '../../api/fetch';
import { BandobasResponseType } from '../../components/Dashboard/Map/BandobasArea/BandobasArea';
import { BandobastOfficersResponseType } from '../../components/Dashboard/Map/OfficersWithAssignedLocations/OfficerWithAssignedLocation';
import { HighlightContext } from '../../contexts/HighlightContext';

const OfficersDataTable = () => {
	const [OfficerData, setOfficerData] = useState<OfficerData[]>([]);

	const { officerLocationFromId } = useContext(HighlightContext);
	// console.log(officerLocationFromId)
	const csvOptions = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true,
		useBom: true,
		useKeysAsHeaders: true
		// TODO: Fix this
		// headers: ["OfficerData.map((c) => c.header)"],
	};

	const csvExporter = new ExportToCsv(csvOptions);

	const columns = useMemo<MRT_ColumnDef<OfficerData>[]>(
		() => [
			{
				id: 'officer', //id used to define `group` column
				header: 'Officer Details',
				columns: [
					{
						accessorFn: row => `${row.police_user_name}`, //accessorFn used to join multiple data into a single cell
						id: 'name', //id is still required when using accessorFn instead of accessorKey
						header: 'Name',
						size: 200,
						Cell: ({ renderedCellValue, row }) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem'
								}}
							>
								<img
									alt='avatar'
									height={30}
									src={row.original.police_user_image_url}
									loading='lazy'
									style={{
										borderRadius: '50%',
										maxWidth: 30,
										minWidth: 30,
										maxHeight: 30,
										minHeight: 30
									}}
								/>
								{/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
								<span>{row.original.police_user_name}</span>
							</Box>
						)
					},
					{
						accessorKey: 'police_user_email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						header: 'In Position',
						size: 200,
						Cell: ({ row }) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem'
								}}
							>
								{/* <span>{(officerLocationFromId[row.original.id]?.isPointInsidePolygon)?.toString()}</span> */}
								{(officerLocationFromId[row.original.id]?.isPointInsidePolygon) ? <img src='/check.png' width={30} /> :
									<img src='/cross.png' width={30} />}
							</Box>
						)
					},
					{
						accessorKey: 'police_user_email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						header: 'Email',
						size: 200
					},
					{
						accessorKey: 'police_user_department', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						header: 'Department',
						size: 64
					},
					{
						accessorKey: 'police_user_rank', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						header: 'Rank',
						size: 64
					},
					{
						accessorFn: row => `${row.weapons}`, //accessorFn used to join multiple data into a single cell
						id: 'weapons', //id is still required when using accessorFn instead of accessorKey
						header: 'Weapons',
						size: 320,
						Cell: ({ row }) => (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1rem'
								}}
							>
								<span>{row.original.weapons}</span>
							</Box>
						)
					}
				]
			},
			{
				id: 'id2',
				header: 'Duty Info',
				columns: [
					{
						accessorFn: row => new Date(row.duty_start_time), //convert to Date for sorting and filtering
						id: 'startTime',
						header: 'Start Time',
						filterFn: 'lessThanOrEqualTo',
						sortingFn: 'datetime',
						size: 164,
						Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleString(), //render Date as a string
						Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
						//Custom Date Picker Filter from @mui/x-date-pickers
						Filter: ({ column }) => (
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									onChange={newValue => {
										column.setFilterValue(newValue);
									}}
									slotProps={{
										textField: {
											helperText: 'Filter Mode: Less Than',
											sx: { minWidth: '120px' },
											variant: 'standard'
										}
									}}
									value={column.getFilterValue()}
								/>
							</LocalizationProvider>
						)
					},
					{
						accessorFn: row => new Date(row.duty_end_time), //convert to Date for sorting and filtering
						id: 'endTime',
						header: 'End Time',
						filterFn: 'lessThanOrEqualTo',
						sortingFn: 'datetime',
						size: 164,
						Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleString(), //render Date as a string
						Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
						//Custom Date Picker Filter from @mui/x-date-pickers
						Filter: ({ column }) => (
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									onChange={newValue => {
										column.setFilterValue(newValue);
									}}
									slotProps={{
										textField: {
											helperText: 'Filter Mode: Less Than',
											sx: { minWidth: '120px' },
											variant: 'standard'
										}
									}}
									value={column.getFilterValue()}
								/>
							</LocalizationProvider>
						)
					},
					{
						accessorKey: 'instructions', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						header: 'Instructions',
						size: 164
					}
				]
			},
			{
				id: 'id',
				header: 'Assigned Device Info',
				columns: [
					{
						accessorKey: 'assigned_nfc_device_device_type',
						// filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
						// filterFn: 'between',
						header: 'Device Type',
						size: 64,
						//custom conditional format and styling
						Cell: ({ cell }) => (
							<Box
								component='span'
								sx={theme => ({
									backgroundColor:
										cell.getValue<string>() == 'nfc'
											? theme.palette.primary.main
											: cell.getValue<string>() == 'ble'
												? theme.palette.primary.dark
												: cell.getValue<string>() == 'geo'
													? theme.palette.primary.light
													: cell.getValue<string>() == 'qr'
														? theme.palette.grey[800]
														: 'transparent',
									borderRadius: '0.24rem',
									alignSelf: 'center',
									justifySelf: 'center',
									color: '#fff',
									maxWidth: '9ch',
									p: '0.24rem',
									px: '0.64rem'
								})}
							>
								{cell.getValue<string>().toUpperCase()}
							</Box>
						)
					},
					{
						accessorKey: 'assigned_nfc_device_name', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						header: 'Device Name',
						size: 160
					},
					{
						// accessorFn: row => `https://www.google.com/maps/@${row.assigned_nfc_device_latitude},${row.assigned_nfc_device_longitude},21z?entry=ttu`, //accessorFn used to join multiple data into a single cell
						id: 'device_location', //id is still required when using accessorFn instead of accessorKey
						header: 'Location',
						size: 64,
						Cell: ({ renderedCellValue, row }) => (
							<Button
								component='a'
								href={`https://www.google.com/maps/@${row.original.assigned_nfc_device_latitude},${row.original.assigned_nfc_device_longitude},21z?entry=ttu`}
								sx={{
									width: 40,
									height: 40,
									borderRadius: 1.6,
									'&:hover': {
										// backgroundColor: theme.palette.secondary.dark,
										color: 'white'
									}
								}}
							>
								<MyLocationIcon />
							</Button>
						)
					},
					{
						// accessorFn: row => `https://www.google.com/maps/@${row.assigned_nfc_device_latitude},${row.assigned_nfc_device_longitude},21z?entry=ttu`, //accessorFn used to join multiple data into a single cell
						id: 'last_location', //id is still required when using accessorFn instead of accessorKey
						header: 'Location History',
						size: 64,
						Cell: ({ renderedCellValue, row }) => (
							<Button
								component='a'
								href={`/dashboard/officer/${row.original.id}`}
								sx={{
									width: 40,
									height: 40,
									borderRadius: 1.6,
									'&:hover': {
										// backgroundColor: theme.palette.secondary.dark,
										color: 'white'
									}
								}}
							>
								<MyLocationIcon />
							</Button>
						)
					},
					{
						accessorKey: 'assigned_nfc_device_radius_in_meters', //hey a simple column for once
						header: 'Radius (m)',
						size: 64
					},
					{
						accessorFn: row => new Date(row.assigned_nfc_device_expires_at), //convert to Date for sorting and filtering
						id: 'deviceExpiryTime',
						header: 'Device Epiry Time',
						size: 128,
						filterFn: 'lessThanOrEqualTo',
						sortingFn: 'datetime',
						Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleString(), //render Date as a string
						Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
						//Custom Date Picker Filter from @mui/x-date-pickers
						Filter: ({ column }) => (
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									onChange={newValue => {
										column.setFilterValue(newValue);
									}}
									slotProps={{
										textField: {
											helperText: 'Filter Mode: Less Than',
											sx: { minWidth: '120px' },
											variant: 'standard'
										}
									}}
									value={column.getFilterValue()}
								/>
							</LocalizationProvider>
						)
					}
				]
			},

			{
				id: 'lastScan',
				header: 'Recent Scan Request',
				columns: [
					{
						accessorKey: 'last_scan_request_id', //hey a simple column for once
						header: 'Scan ID',
						size: 64
					},
					{
						accessorFn: row => new Date(row.last_scan_request_request_time), //convert to Date for sorting and filtering
						id: 'requestTime',
						header: 'Request Time',
						filterFn: 'lessThanOrEqualTo',
						size: 164,
						sortingFn: 'datetime',
						Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleString(), //render Date as a string
						Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
						//Custom Date Picker Filter from @mui/x-date-pickers
						Filter: ({ column }) => (
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									onChange={newValue => {
										column.setFilterValue(newValue);
									}}
									slotProps={{
										textField: {
											helperText: 'Filter Mode: Less Than',
											sx: { minWidth: '120px' },
											variant: 'standard'
										}
									}}
									value={column.getFilterValue()}
								/>
							</LocalizationProvider>
						)
					},
					{
						accessorKey: 'last_scan_request_isAuth',
						header: '2x Auth',
						size: 64,
						//custom conditional format and styling
						Cell: ({ cell }) => (
							<Box
								component='span'
								sx={theme => ({
									backgroundColor:
										cell.getValue<boolean>() == true
											? theme.palette.success.main
											: theme.palette.warning.main,
									borderRadius: '0.24rem',
									alignSelf: 'center',
									justifySelf: 'center',
									color: '#fff',
									maxWidth: '9ch',
									p: '0.24rem',
									px: '0.64rem'
								})}
							>
								{cell.getValue<boolean>() ? 'Yes' : 'No'}
							</Box>
						)
					},
					{
						accessorKey: 'last_scan_request_status',
						header: 'Status',
						size: 64,
						//custom conditional format and styling
						Cell: ({ cell }) => (
							<Box
								component='span'
								sx={theme => ({
									backgroundColor:
										cell.getValue<string>() == 'pending'
											? theme.palette.warning.contrastText
											: cell.getValue<string>() == 'on_time'
												? theme.palette.success.main
												: cell.getValue<string>() == 'late'
													? theme.palette.warning.main
													: 'transparent',
									borderRadius: '0.24rem',
									alignSelf: 'center',
									justifySelf: 'center',
									color: '#fff',
									maxWidth: '9ch',
									p: '0.24rem',
									px: '0.64rem'
								})}
							>
								{cell.getValue<string>()?.toUpperCase()}
							</Box>
						)
					},
					{
						accessorKey: 'last_scan_request_police_scan_timestamp', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						enableClickToCopy: true,
						header: 'Scan Timestamp',
						size: 128
					}
				]
			}
		],
		[]
	);

	useEffect(() => {
		(async () => {
			const apiResponse: BandobasResponseType = await GET('bandobast/');

			// console.log('get bandobast response', apiResponse);

			if (apiResponse?.data?.length > 0) {
				// TODO change data indexing location
				const bandobastId = apiResponse.data[0].id;
				const data: OfficerData[] = await GET('bandobas-officers/bandobas/detail/' + bandobastId + '/');
				setOfficerData(data);
			}
		})();
	}, []);
	return (
		<MaterialReactTable
			columns={columns}
			data={OfficerData}
			enableColumnFilterModes
			enableColumnOrdering
			enableGrouping
			enablePinning
			enableRowActions={false}
			enableRowSelection
			initialState={{ showColumnFilters: true }}
			muiTableContainerProps={{ sx: { maxHeight: '64vh' } }}
			positionToolbarAlertBanner='bottom'
			renderDetailPanel={({ row }) => (
				<Box
					sx={{
						display: 'flex',
						width: '100vh',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}
				>
					<img
						alt='officer'
						height={128}
						width={128}
						src={row.original.police_user_image_url}
						loading='lazy'
						style={{ borderRadius: 8 }}
					/>
					<Box sx={{ textAlign: 'center' }}>
						<Typography
							variant='h1'
							mb={1}
						>
							{row.original.police_user_name}
						</Typography>
						<Typography
							variant='h3'
							mb={2}
						>
							{row.original.rank}, {row.original.department}
						</Typography>
						<Typography variant='h4'>
							{row.original.police_user_email}, {row.original.police_user_phone}
						</Typography>
					</Box>
				</Box>
			)}
			renderRowActionMenuItems={({ closeMenu }) => [
				<MenuItem
					key={0}
					onClick={() => {
						// View profile logic...
						closeMenu();
					}}
					sx={{ m: 0 }}
				>
					<ListItemIcon>
						<AccountCircle />
					</ListItemIcon>
					View Profile
				</MenuItem>
				// <MenuItem
				// 	key={1}
				// 	onClick={() => {
				// 		// Send email logic...
				// 		closeMenu();
				// 	}}
				// 	sx={{ m: 0 }}
				// >
				// 	<ListItemIcon>
				// 		<Send />
				// 	</ListItemIcon>
				// 	Send Email
				// </MenuItem>
			]}
			renderTopToolbarCustomActions={({ table }) => {
				const handleDeactivate = () => {
					table.getSelectedRowModel().flatRows.map(row => {
						// alert('deactivating ' + row.getValue('name'));
						// todo actual id
						const id = row.original.id;

						POST(`notification/send/${id}`, {
							heading: 'access revoked',
							body: 'destroy token',
							notif_type: 'sos_all' // sos_all | alert | destroy | announcement_all
						}).then(res => {
							console.log('deactivate response', res);
						});
					});
				};

				const handleActivate = () => {
					table.getSelectedRowModel().flatRows.map(row => {
						alert('activating ' + row.getValue('name'));
					});
				};

				const handleContact = () => {
					table.getSelectedRowModel().flatRows.map(row => {
						alert('contact ' + row.getValue('name'));
					});
				};

				const handleExportRows = (rows: MRT_Row[]) => {
					// export only the selected rows
					csvExporter.generateCsv(rows.map(row => row.original));
				};

				const handleExportData = () => {
					csvExporter.generateCsv(OfficerData);
				};

				return (
					<div style={{ display: 'flex', gap: '0.5rem' }}>
						<Button
							color='error'
							disabled={!table.getIsSomeRowsSelected()}
							onClick={handleDeactivate}
							variant='contained'
						>
							Deactivate
						</Button>
						{/* <Button
							color='success'
							disabled={!table.getIsSomeRowsSelected()}
							onClick={handleActivate}
							variant='contained'
						>
							Activate
						</Button> */}
						<Button
							color='primary'
							//export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
							onClick={handleExportData}
							startIcon={<FileDownloadIcon />}
							variant='contained'
						>
							Export All Data
						</Button>
						<Button
							disabled={table.getPrePaginationRowModel().rows.length === 0}
							//export all rows, including from the next page, (still respects filtering and sorting)
							onClick={() =>
								// @ts-ignore
								handleExportRows(table.getPrePaginationRowModel().rows)
							}
							startIcon={<FileDownloadIcon />}
							variant='contained'
						>
							Export All Rows
						</Button>
						<Button
							disabled={table.getRowModel().rows.length === 0}
							//export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
							// @ts-ignore
							onClick={() => handleExportRows(table.getRowModel().rows)}
							startIcon={<FileDownloadIcon />}
							variant='contained'
						>
							Export Page Rows
						</Button>
						<Button
							disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
							//only export selected rows
							// @ts-ignore
							onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
							startIcon={<FileDownloadIcon />}
							variant='contained'
						>
							Export Selected Rows
						</Button>
						<Button
							color='warning'
							disabled={!table.getIsSomeRowsSelected()}
							onClick={handleContact}
							variant='contained'
						>
							Alert
						</Button>
					</div>
				);
			}}
		/>
	);
};

export default OfficersDataTable;
