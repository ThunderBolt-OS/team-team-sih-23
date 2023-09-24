import { createContext, useState, ReactNode, useEffect } from 'react';
import { AppMessaging } from '../Firebase';
import { onMessage } from 'firebase/messaging';
import { Modal, Paper, Typography, Stack, Button, useTheme, IconButton } from '@mui/material';
import {
	ColorLensRounded as ColorLensRoundedIcon,
	SosRounded as SosRoundedIcon,
	TranslateRounded as TranslateRoundedIcon,
	CloseRounded as CloseRoundedIcon,
	SendRounded as SendRoundedIcon
} from '@mui/icons-material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { data } from '../pages/dummyData';
import { Close as CloseIcon } from '@mui/icons-material';

interface GlobalContextType {
	bandobastId: string | null;
	setBandobastId: React.Dispatch<React.SetStateAction<string | null>>;

	reloadScanRequests: number;
	setReloadScanRequests: React.Dispatch<React.SetStateAction<number>>;
}

export const GlobalContext = createContext<GlobalContextType>({
	bandobastId: null,
	setBandobastId: () => {},

	reloadScanRequests: 0,
	setReloadScanRequests: () => {}
});

interface GlobalProviderProps {
	children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
	const theme = useTheme();

	const [bandobastId, setBandobastId] = useState<string | null>(null);

	const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);

	const [alertHeading, setAlertHeading] = useState<string>('');
	const [alertMessage, setAlertMessage] = useState<string>('');

	const [reloadScanRequests, setReloadScanRequests] = useState<number>(0);

	useEffect(() => {
		onMessage(AppMessaging, payload => {
			// console.log(payload)
			if (payload.data?.type === 'alert_from_bandobas_officer') {
				setAlertModalOpen(true);

				setAlertHeading(payload.notification?.title || '');
				setAlertMessage(payload.notification?.body || '');
			}

			if (payload.data?.type === 'geofence_crossed') {
				enqueueSnackbar(payload.notification?.body, {
					variant: 'warning',
					autoHideDuration: 3000,
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
		});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				bandobastId,
				setBandobastId,

				reloadScanRequests,
				setReloadScanRequests
			}}
		>
			{children}

			<Modal
				open={alertModalOpen}
				onClose={() => setAlertModalOpen(false)}
			>
				<Paper
					sx={{
						position: 'absolute',
						top: '32%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						border: '2.8px solid ' + theme.palette.warning.dark,
						boxShadow: 16,
						p: 3,
						borderRadius: 4
					}}
				>
					<Typography
						variant='h3'
						align='center'
						color='error'
						sx={{ mb: 3.2 }}
					>
						ALERT
					</Typography>
					<Typography
						sx={{ mb: 2.8 }}
						variant='h4'
						align='center'
					>
						From Officer {alertHeading}
					</Typography>
					<Typography
						sx={{ mb: 4.8 }}
						variant='h6'
						align='center'
					>
						{alertMessage}
					</Typography>
					<Stack
						direction='row'
						justifyContent='space-around'
						sx={{ mt: 2 }}
					>
						<Button
							startIcon={<CloseRoundedIcon />}
							variant='outlined'
							color='error'
							sx={{
								color: theme.palette.error.dark,
								'&:hover': {
									backgroundColor: theme.palette.error.main,
									color: theme.palette.common.white
								},
								width: '35%'
							}}
							onClick={() => setAlertModalOpen(false)}
						>
							Close
						</Button>
					</Stack>
				</Paper>
			</Modal>
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
