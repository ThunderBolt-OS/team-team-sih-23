import React, { useState, useContext } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Stack, Grid, Container, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import { StepperFormDataContext, StepperFormDataContextProvider } from '../../contexts/StepperFormData';
import { StepperMapContainer } from '../../components';
import { defaultInitialView, mapBoxGLAccessToken } from '../../constants';
import MapIcon from '@mui/icons-material/Map';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const CustomStepIcon = (props: any) => {
	const theme = useTheme();

	const { active, completed, icon, color } = props;

	return (
		<Box
			sx={{
				width: 40,
				height: 40,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '50%',
				backgroundColor: completed
					? theme.palette.success.main
					: active
						? theme.palette.primary.main
						: theme.palette.grey[300], // You can customize the background color here
				color: completed || active ? theme.palette.common.white : theme.palette.text.primary,
				position: 'relative',
				zIndex: 1,
				'&::before': {
					content: "''",
					position: 'absolute',
					top: '50%',
					left: 0,
					right: 0,
					height: 2,
					backgroundColor: completed
						? theme.palette.success.main
						: active
							? theme.palette.primary.main
							: theme.palette.grey[300], // You can customize the line color here
					zIndex: -1
				},
				...(active && {
					boxShadow: '0 0 0 8px rgba(103, 58, 183, 0.16)'
				}) // Customize the active step shadow
			}}
		>
			{icon}
		</Box>
	);
};

const StepperForm: React.FC = () => {
	const theme = useTheme();

	const navigate = useNavigate();

	const { formData, updateFormData } = useContext(StepperFormDataContext);

	const [activeStep, setActiveStep] = useState(formData.stepperStep.activeStep);

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 2);
		// update the stepperStep in the context
		updateFormData({
			stepperStep: {
				activeStep: activeStep + 2
			}
		});
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
		// update the stepperStep in the context
		updateFormData({
			stepperStep: {
				activeStep: activeStep - 1
			}
		});
	};

	const handleStepClick = (step: number) => {
		setActiveStep(step);
		// update the stepperStep in the context
		updateFormData({
			stepperStep: {
				activeStep: step
			}
		});
	};

	const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
		// clear the stored bandobastId from the local storage
		// localStorage.removeItem('bandobastId');
		navigate('/dashboard');
	};

	return (
		<Box
			sx={{
				pt: 2,
				backgroundColor: theme.palette.grey[200],
				minHeight: '100vh'
			}}
		>
			<Container>
				<Stepper
					activeStep={activeStep}
					alternativeLabel
				>
					<Step
						// onClick={() => handleStepClick(0)}
						sx={{
							color: activeStep === 0 ? theme.palette.secondary.main : theme.palette.text.primary
						}}
					>
						<StepLabel
							StepIconComponent={() => (
								<CustomStepIcon
									icon={<MapIcon />}
									color={theme.palette.secondary.main}
									active={activeStep === 0}
									completed={activeStep > 0}
								/>
							)}
						>
							Create Bandobast
						</StepLabel>
					</Step>
					{/* <Step
						// onClick={() => handleStepClick(1)}
						sx={{
							color: activeStep === 1 ? theme.palette.secondary.main : theme.palette.text.primary
						}}
					>
						<StepLabel
							StepIconComponent={() => (
								<CustomStepIcon
									icon={<AssignmentIndIcon />}
									color={theme.palette.secondary.main}
									active={activeStep === 1}
									completed={activeStep > 1}
								/>
							)}
						>
							Add Security Covers
						</StepLabel>
					</Step> */}
					<Step
						// onClick={() => handleStepClick(2)}
						sx={{
							color: activeStep === 2 ? theme.palette.secondary.main : theme.palette.text.primary
						}}
					>
						<StepLabel
							StepIconComponent={() => (
								<CustomStepIcon
									icon={<PersonAddIcon />}
									color={theme.palette.secondary.main}
									active={activeStep === 2}
									completed={activeStep > 2}
								/>
							)}
						>
							Add NFCs & Police Personnel
						</StepLabel>
					</Step>
				</Stepper>
				<Box sx={{ mt: 2 }}>
					<Grid container>
						<Grid
							item
							xs={12}
							md={6}
						>
							<StepperMapContainer />
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
						>
							<form>
								{activeStep === 0 && <Step1Form />}
								{/* {activeStep === 1 && <Step2Form />} */}
								{activeStep === 2 && <Step3Form />}
								<Grid
									item
									xs={12}
									md={12}
								>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-evenly',
											mt: 4,
											mb: 5
										}}
									>
										{activeStep === 1 && <Button
											sx={{ width: '40%' }}
											variant='contained'
											onClick={handleNext}
										>
											Next
										</Button>}
										{/* {activeStep !== 0 && (
											<Button
												sx={{ width: '30%' }}
												variant='contained'
												onClick={handleBack}
											>
												Back
											</Button>
										)} */}
										{/* {activeStep < 2 ? (
											<Button
												sx={{ width: '40%' }}
												variant='contained'
												onClick={handleNext}
											>
												Next
											</Button>
										) : ( */}
										<Button
											sx={{ width: '40%' }}
											variant='contained'
											onClick={handleRedirect}
										>
											Go to Dashboard
										</Button>
										{/* )} */}
									</Box>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</Box>
	);
};

const markerStyle = {
	cursor: 'pointer'
};

// initial state on the map
const mapInitialViewState = defaultInitialView;

export const mapContainerStyles = {
	// marginLeft: '100px',
	height: 500,
	width: 500
};

const StepperFormDataLelo = () => {
	return (
		<StepperFormDataContextProvider>
			<StepperForm />
		</StepperFormDataContextProvider>
	);
};

export default StepperFormDataLelo;
