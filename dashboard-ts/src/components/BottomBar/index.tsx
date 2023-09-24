import { Box, Grid } from '@mui/material';
import React from 'react';
import Section1 from './Section1';
import Section3 from './Section3';
import Section2 from './Section2';

const BottomBar = () => {
	return (
		<Box
			sx={
				{
					// bottom: 80,
					// zIndex: 10000
				}
			}
		>
			<Grid container>
				<Grid
					item
					xs={4}
					md={4}
					paddingBottom={1}
					paddingTop={1}
				>
					<Section1 />
				</Grid>
				<Grid
					item
					xs={4}
					md={4}
				>
					<Section2 />
				</Grid>
				<Grid
					item
					xs={4}
					md={4}
				>
					<Section3 />
				</Grid>
			</Grid>
		</Box>
	);
};

export default BottomBar;
