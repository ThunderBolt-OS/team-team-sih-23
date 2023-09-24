import React, { useState, useEffect, useRef } from 'react';
import { djangoBaseUrl } from '../../../../../constants';
import { Button, useTheme } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

const OfficerDetailsSummaryPdf = ({ officerId }: { officerId: string }) => {
	const [isLoading, setIsLoading] = useState(true);
	const pdfContainerRef = useRef<HTMLIFrameElement | null>(null);
	const theme = useTheme();

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		const headers: Record<string, string> = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token && { Authorization: `JWT ${token}` })
		};

		// Fetch the HTML content from your Django backend
		fetch(djangoBaseUrl + `officer-details/${officerId}/summary`, {
			method: 'GET',
			headers: headers
		})
			.then(response => response.text())
			.then(async html => {
				// Inject the HTML content into the container element
				if (pdfContainerRef.current) {
					pdfContainerRef.current.contentDocument?.open();
					pdfContainerRef.current.contentDocument?.write(html);
					pdfContainerRef.current.contentDocument?.close();

					// Wait for the HTML content to be completely loaded
					pdfContainerRef.current.addEventListener('load', () => {
						console.log('ferer');
						// Now you can trigger the HTML content download
					});
				}
			})
			.catch(error => {
				console.error('An error occurred', error);
				setIsLoading(false);
			});
	}, []);

	const handleGeneratePDF = () => {
		window.open(djangoBaseUrl + `officer-details/${officerId}/summary`, '_blank')

		// const content = pdfContainerRef.current?.contentDocument?.documentElement?.outerHTML;
		// if (content) {
		// 	const blob = new Blob([content], { type: 'text/html' });
		// 	const url = URL.createObjectURL(blob);

		// 	const a = document.createElement('a');
		// 	a.href = url;
		// 	a.download = 'downloaded_content.html';
		// 	a.click();
		// 	setIsLoading(false);
		// }
	};

	return (
		<div>
			{/* Container for injecting HTML */}
			<iframe
				ref={pdfContainerRef}
				title='PDF Container'
				style={{ display: 'none' }}
			></iframe>

			{/* {isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
				</div>
			)} */}
			<Button
				onClick={handleGeneratePDF}
				variant='outlined'
				fullWidth
				sx={{
					borderColor: theme.palette.primary.main,
					color: theme.palette.primary.main,
					'&:hover': {
						backgroundColor: theme.palette.primary.main,
						color: theme.palette.primary.contrastText
					}
				}}
				startIcon={<DownloadRoundedIcon />}
			>
				Summary
			</Button>
		</div>
	);
};

export default OfficerDetailsSummaryPdf;
