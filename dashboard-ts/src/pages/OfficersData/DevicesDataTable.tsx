import { Box, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AccountCircle, Send } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { GET } from '../../api/fetch';
import { BandobasResponseType } from '../../components/Dashboard/Map/BandobasArea/BandobasArea';
import { DeviceData } from '../../api/interfaces/devicesDataInterface';

const DevicesDataTable: React.FC = () => {
	const [DeviceData, setDeviceData] = useState<DeviceData[]>([]);

	const columns = useMemo<MRT_ColumnDef<DeviceData>[]>(
		() => [
			{
				id: 'Devices', //id used to define `group` column
				header: '',
				columns: [
					{
						accessorKey: 'id', //accessorFn used to join multiple data into a single cell
						id: 'id', //id is still required when using accessorFn instead of accessorKey
						header: 'ID',
						size: 128,
						enableClickToCopy: true
					},
					{
						accessorKey: 'is_assigned', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						header: 'Assigned',
						size: 128,
						Cell: ({ cell }) => (
							<Box
								// component='span'
								sx={theme => ({
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
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
						accessorFn: row => new Date(row.expires_at), //convert to Date for sorting and filtering
						id: 'expiryTime',
						header: 'Expiry Time',
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
						accessorKey: 'device_type', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
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
						id: 'device_location', //id is still required when using accessorFn instead of accessorKey
						header: 'Location',
						size: 64,
						Cell: ({ renderedCellValue, row }) => (
							<Button
								component='a'
								href={`https://www.google.com/maps/@${row.original.latitude},${row.original.longitude},21z?entry=ttu`}
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
						accessorKey: 'altitude', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						header: 'Altitude',
						size: 128
					},
					{
						accessorKey: 'radius_in_meters', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
						header: 'Radius',
						size: 128,
						Cell: ({ row }) => (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									textAlign: 'center'
								}}
							>
								{row.original.radius_in_meters} m
							</Box>
						)
					}
				]
			}
		],
		[]
	);

	useEffect(() => {
		(async () => {
			const apiResponse: BandobasResponseType = await GET('bandobast/');

			if (apiResponse?.data?.length > 0) {
				// TODO change data indexing location
				const bandobastId = apiResponse.data[0].id;
				const data: DeviceData[] = await GET('nfc-devices/bandobas/' + bandobastId + '/');
				setDeviceData(data);
			}
		})();
	}, []);
	return (
		<MaterialReactTable
			columns={columns}
			data={DeviceData}
			enableColumnFilterModes
			enableColumnOrdering
			enableGrouping
			enablePinning
			enableRowActions={false}
			enableRowSelection
			initialState={{ showColumnFilters: true }}
			muiTableContainerProps={{ sx: { maxHeight: '64vh' } }}
			positionToolbarAlertBanner='bottom'
			// renderDetailPanel={({ row }) => (
			// 	<Box
			// 		sx={{
			// 			display: 'flex',
			// 			justifyContent: 'space-around',
			// 			alignItems: 'center'
			// 		}}
			// 	>
			// 		<img
			// 			alt='avatar'
			// 			height={200}
			// 			src={row.original.police_user.image_url}
			// 			loading='lazy'
			// 			style={{ borderRadius: '50%' }}
			// 		/>
			// 		<Box sx={{ textAlign: 'center' }}>
			// 			<Typography variant='h4'>
			// 				Signature Catch Phrase:
			// 			</Typography>
			// 			<Typography variant='h1'>
			// 				&quot;{row.original.department}&quot;
			// 			</Typography>
			// 		</Box>
			// 	</Box>
			// )}
			// renderRowActionMenuItems={({ closeMenu }) => [
			// 	<MenuItem
			// 		key={0}
			// 		onClick={() => {
			// 			// View profile logic...
			// 			closeMenu();
			// 		}}
			// 		sx={{ m: 0 }}
			// 	>
			// 		<ListItemIcon>
			// 			<AccountCircle />
			// 		</ListItemIcon>
			// 		View Profile
			// 	</MenuItem>,
			// 	<MenuItem
			// 		key={1}
			// 		onClick={() => {
			// 			// Send email logic...
			// 			closeMenu();
			// 		}}
			// 		sx={{ m: 0 }}
			// 	>
			// 		<ListItemIcon>
			// 			<Send />
			// 		</ListItemIcon>
			// 		Send Email
			// 	</MenuItem>
			// ]}
			renderTopToolbarCustomActions={({ table }) => {
				const handleDeactivate = () => {
					table.getSelectedRowModel().flatRows.map(row => {
						alert('deactivating ' + row.getValue('name'));
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
						<Button
							color='success'
							disabled={!table.getIsSomeRowsSelected()}
							onClick={handleActivate}
							variant='contained'
						>
							Activate
						</Button>
						<Button
							color='info'
							disabled={!table.getIsSomeRowsSelected()}
							onClick={handleContact}
							variant='contained'
						>
							Contact
						</Button>
					</div>
				);
			}}
		/>
	);
};

export default DevicesDataTable;
