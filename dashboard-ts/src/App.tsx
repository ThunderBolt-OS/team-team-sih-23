import { CssBaseline } from '@mui/material';
import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import { SnackbarProvider } from 'notistack';
import router from './router/router';
import { CookiesProvider } from 'react-cookie';
import { LanguageProvider } from './contexts/Language';
import { MapStyleDataProvider } from './contexts/MapStyle';
import { ThemeProvider } from './theme';
import './App.css';
import GlobalProvider from './contexts/global';
import { MessageProvider } from './contexts/MessageContext';
import { get_fcm_token } from './Firebase';
import { POST } from './api/fetch';
import HighlightProvider from './contexts/HighlightContext';
import StopsProvider from './contexts/StopsProvider';
import BusRoutesProvider from './contexts/BusRoutesProvider';
import BusesProvider from './contexts/BusesProvider';

function App() {
	React.useEffect(() => {
		(async () => {
			const fcmToken = await get_fcm_token();

			// uncomment to update fcm token

			const res = await POST('network-admin/register-device/', {
				fcm_token: fcmToken
			});
			// console.log(res)
		})();
	}, []);

	return (
		<ThemeProvider>
			<CookiesProvider>
				<HighlightProvider>
					<GlobalProvider>
						<SnackbarProvider>
							<AuthProvider>
								<LanguageProvider>
									<MapStyleDataProvider>
										<MessageProvider>
											<StopsProvider>
												<BusRoutesProvider>
													<BusesProvider>
														<CssBaseline />
														{/* @ts-ignore */}
														<RouterProvider router={router} />
													</BusesProvider>
												</BusRoutesProvider>
											</StopsProvider>
										</MessageProvider>
									</MapStyleDataProvider>
								</LanguageProvider>
							</AuthProvider>
						</SnackbarProvider>
					</GlobalProvider>
				</HighlightProvider>
			</CookiesProvider>
		</ThemeProvider>
	);
}

export default App;
