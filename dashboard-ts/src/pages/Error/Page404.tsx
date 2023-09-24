import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Page404: React.FC = () => {
	const navigate = useNavigate();

	return (
		<section
			style={{
				padding: '40px 0',
				backgroundColor: '#fff',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh' // Adjust height to the desired value
			}}
		>
			<Container>
				<Grid
					container
					justifyContent='center'
				>
					<Grid
						item
						xs={10}
						md={8}
						lg={6}
					>
						<Box
							sx={{
								backgroundImage:
									'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
								height: '400px',
								backgroundPosition: 'center'
							}}
						>
							<Typography
								variant='h1'
								align='center'
							>
								404
							</Typography>
						</Box>
						<Box sx={{ textAlign: 'center', mt: 3 }}>
							<Typography variant='h3'>Looks like you're lost</Typography>
							<Typography variant='body1'>The page you are looking for is not available!</Typography>
							<Button
								sx={{
									mt: 2,
									width: '25%'
								}}
								onClick={() => navigate('/dashboard')}
							>
								Go To Home
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</section>
	);
};

export default Page404;
