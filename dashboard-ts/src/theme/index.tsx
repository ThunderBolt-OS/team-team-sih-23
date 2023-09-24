import React, { useContext, useState } from 'react';
import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material';

import OrionTheme from './OrionTheme';
const themes: Array<Theme> = [OrionTheme];

interface ThemeContextValue {
	setTheme: ((i: number) => void) | null;
}
export const ThemeContext = React.createContext<ThemeContextValue>({} as ThemeContextValue);

export const ThemeProvider = (props: { children: React.ReactNode }) => {
	const localStorageTheme = localStorage.getItem('appTheme');
	const initialThemeIndex: number = localStorageTheme ? parseInt(localStorageTheme) : 0;

	const [themeIndex, setThemeIndex] = useState(initialThemeIndex);

	const setTheme = (i: number) => {
		localStorage.setItem('appTheme', `${i}`);
		setThemeIndex(i);
	};

	return (
		<ThemeContext.Provider value={{ setTheme }}>
			<MuiThemeProvider theme={themes[themeIndex]}>{props.children}</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

export const ThemeConsumer = ThemeContext.Consumer;
