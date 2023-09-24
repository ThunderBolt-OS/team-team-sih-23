import React from 'react';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, useTheme } from '@mui/material';

interface DataItem {
	name: string;
	count: number;
}

interface SimpleTableProps {
	data: DataItem[];
}

const SimpleTable: React.FC<SimpleTableProps> = ({ data }) => {
	const theme = useTheme();

	const tableContainerStyles = {
		borderTop: '1px solid ' + `${theme.palette.primary.main}`,
		maxHeight: 100,
		borderRadius: 0,
		paddingBottom: 10
	};

	const tableCellStyles = {
		borderBottom: '1px solid ' + `${theme.palette.primary.main}`
	};

	return (
		<Box sx={{ width: '100%', mt: 0 }}>
			<TableContainer
				sx={tableContainerStyles}
				className='blue-styled-scrollbar'
			>
				<Table size='small'>
					<TableBody>
						{data.map((row, index) => (
							<TableRow
								key={index}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0
									}
								}}
							>
								<TableCell
									component='th'
									scope='row'
									sx={{
										...tableCellStyles,
										...{ fontSize: 14 }
									}}
								>
									{row.name}
								</TableCell>
								<TableCell
									sx={{
										...tableCellStyles,
										...{ fontSize: 14 }
									}}
									align='right'
								>
									{row.count}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default SimpleTable;
