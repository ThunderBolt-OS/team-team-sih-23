import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Paper, TextField, IconButton, Typography, useTheme } from '@mui/material';
import { Visibility, VisibilityOff, Close as CloseIcon } from '@mui/icons-material';
import { closeSnackbar, useSnackbar } from 'notistack';
import { AuthContext } from '../contexts/AuthProvider';
import { GET, POST } from '../api/fetch';
import LoginIcon from '@mui/icons-material/Login';
import { FetchAllBandobastType, AllBandobastType } from '../types/api-types';
export type GetOTP = {
	success: string;
	info: string;
};

export type SendOTP = {
	refresh: string;
	access: string;
};

const Login = () => {
	const navigate = useNavigate();
	const { setAccessToken, setRefreshToken } = useContext(AuthContext);
	const { enqueueSnackbar } = useSnackbar();
	const [phoneNumber, setPhoneNumber] = useState('');
	const [otp, setOtp] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [toggleOTP, setToggleOTP] = useState(false);
	const [isPhnNumberValid, setIsPhnNumberValid] = useState(false);
	const theme = useTheme();

	const handleGetOTP = () => {
		// getting the phn number for otp
		const phnNumberFormData = {
			phone: parseInt(phoneNumber)
		};

		(async () => {
			const createOTPResponseAPI: GetOTP = await POST(`auth/generate-otp`, phnNumberFormData);
			if (createOTPResponseAPI.success === 'ok') {
				// console.log('successfully generated OTP');
				setToggleOTP(true);
				enqueueSnackbar('OTP sent successfully', {
					variant: 'success',
					autoHideDuration: 2000,
					action: key => (
						<IconButton
							onClick={() => closeSnackbar(key)}
							size='small'
							color='inherit'
						>
							<CloseIcon />
						</IconButton>
					),
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right'
					}
				});
			} else {
				enqueueSnackbar('Re Enter the Valid Phone Number', {
					variant: 'error',
					autoHideDuration: 2000,
					action: key => (
						<IconButton
							onClick={() => closeSnackbar(key)}
							size='small'
							color='inherit'
						>
							<CloseIcon />
						</IconButton>
					),
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right'
					}
				});
			}
		})();
	};
	const phoneNumberRegex = /^\d{10}$/;
	const isPhoneNumberValid = (phoneNumber: string) => {
		return phoneNumberRegex.test(phoneNumber);
	};

	const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newPhoneNumber = e.target.value;
		setPhoneNumber(newPhoneNumber);

		// Check if the phone number has 10 digits
		const isValidPhoneNumber = isPhoneNumberValid(newPhoneNumber);

		// Enable/disable the button based on phone number validation
		if (isValidPhoneNumber) {
			setIsPhnNumberValid(false);
		} else {
			setIsPhnNumberValid(true);
		}
	};

	const handleEnterOTPChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setOtp(e.target.value);
	};

	const handleSentOTP = () => {
		// getting the phn number and otp for login
		const phnNumberAndOTPFormData = {
			phone: parseInt(phoneNumber),
			otp: parseInt(otp)
		};

		(async () => {
			const sendOTPResponseAPI: SendOTP = await POST(`auth/validate-otp`, phnNumberAndOTPFormData);
			if (sendOTPResponseAPI.access) {
				// console.log('successfully validated OTP');
				setToggleOTP(false);
				setAccessToken(sendOTPResponseAPI.access);
				setRefreshToken(sendOTPResponseAPI.refresh);
				// logging the response
				// console.log(sendOTPResponseAPI);

				// navigate('/dashboard');
				(async () => {
					const loginRedirect = await fetch(`http://localhost:8008/bandobast`, {
						headers: {
							Authorization: `JWT ${sendOTPResponseAPI.access}`
						}
					});
					const loginRedirectResponse: FetchAllBandobastType = await loginRedirect.json();
					console.info('loginRedirectResponse', loginRedirectResponse);
					if (loginRedirectResponse.data.length === 0) {
						navigate('/create-bandobast');
					} else {
						navigate('/dashboard');
					}
				})();
				enqueueSnackbar('Successfully Logged in', {
					variant: 'success',
					autoHideDuration: 2000,
					action: key => (
						<IconButton
							onClick={() => closeSnackbar(key)}
							size='small'
							color='inherit'
						>
							<CloseIcon />
						</IconButton>
					),
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right'
					}
				});
			} else {
				enqueueSnackbar('Re Enter the Valid Phone Number', {
					variant: 'error',
					autoHideDuration: 2000,
					action: key => (
						<IconButton
							onClick={() => closeSnackbar(key)}
							size='small'
							color='inherit'
						>
							<CloseIcon />
						</IconButton>
					),
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right'
					}
				});
			}
		})();
	};

	const handleNavigatetoDashboardOrCreateBandobast = () => {
		(async () => {
			const getDetailsAboutBandobastApiResponse: FetchAllBandobastType = await GET(`bandobast`, {});
			if (getDetailsAboutBandobastApiResponse) {
				// console.log('successfully got details about bandobast');
				// console.log(getDetailsAboutBandobastApiResponse);
				if (getDetailsAboutBandobastApiResponse.data.length === 0) {
					// console.log('No bandobast created yet');
					navigate('/create-bandobast');
				} else {
					// console.log('Bandobast already created');
					navigate('/dashboard');
				}
			}
		})();
	};

	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100vw'
			}}
		>
			<Paper
				sx={{
					padding: 5
				}}
			>
				<Typography
					variant='h3'
					sx={{
						mt: 0,
						mb: 2,
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					Login
				</Typography>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<TextField
						label={'Phone Number'}
						sx={{
							marginBottom: 3,
							width: 400,
							// bgcolor: phoneNumber.length === 10 ? '' : `${theme.palette.warning.light}`,
							'& input': {
								borderColor: phoneNumber.length === 10 ? '' : 'red',
								color: phoneNumber.length === 10 ? '' : 'red',
								borderRadius: '5px'
							}
						}}
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
					/>
					{
						// only show this otp field when toggleOTP is true
						toggleOTP && (
							<TextField
								label={'Enter OTP'}
								sx={{ marginBottom: 3, width: 400 }}
								value={otp}
								type={showPassword ? 'text' : 'password'}
								onChange={handleEnterOTPChange}
								InputProps={{
									endAdornment: (
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge='end'
											color='inherit'
										>
											{/* Toggle eye icon to reveal otp */}
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									)
								}}
							/>
						)
					}
					{
						// only show this button when toggleOTP is false and show the otp button when toggleOTP is true
						!toggleOTP ? (
							<Button
								variant={'contained'}
								size={'large'}
								onClick={handleGetOTP}
								onKeyDown={e => (e.key === 'Enter' ? handleGetOTP : '')}
								disabled={isLoading || isPhnNumberValid} // Disable the button when loading
							>
								{isLoading ? (
									<CircularProgress size={24} /> // Show a loading spinner
								) : (
									'Send OTP'
								)}
							</Button>
						) : (
							<Button
								variant={'contained'}
								startIcon={<LoginIcon />}
								size={'large'}
								onClick={handleSentOTP}
								onKeyDown={e => (e.key === 'Enter' ? handleSentOTP : 'x')}
								disabled={isLoading} // Disable the button when loading
							>
								{isLoading ? (
									<CircularProgress size={24} /> // Show a loading spinner
								) : (
									'Login'
								)}
							</Button>
						)
					}
				</Box>
			</Paper>
		</div>
	);
};

export default Login;
