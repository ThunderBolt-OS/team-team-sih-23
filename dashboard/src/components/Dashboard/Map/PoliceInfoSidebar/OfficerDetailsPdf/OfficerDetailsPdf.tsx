import React from 'react';
import { djangoBaseUrl } from '../../../../../constants';
import { Button, useTheme } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

interface Props {
	officerId: number;
}

const OfficerDetailsPDF = ({ officerId }: Props) => {
	const theme = useTheme();

	const downloadPDF = async () => {
		const request_url = djangoBaseUrl + `officer-details/${officerId}/download`;

		try {
			const response = await fetch(request_url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/pdf'
				}
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const blob = await response.blob();
			const filename = response.headers.get('Content-Disposition')?.split(';')[1]?.trim().split('=')[1];
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = filename || `officer_${officerId}_details.pdf`;
			a.click();

			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<Button
			variant='outlined'
			fullWidth
			sx={{
				borderColor: theme.palette.primary.main,
				color: theme.palette.primary.main,
				'&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }
			}}
			startIcon={<DownloadRoundedIcon />}
			onClick={downloadPDF}
		>
			Logs
		</Button>
	);
};

export default OfficerDetailsPDF;
