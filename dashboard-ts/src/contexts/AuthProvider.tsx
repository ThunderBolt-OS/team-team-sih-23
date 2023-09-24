import { createContext, useState, useEffect, ReactNode } from 'react';
import { useCookies } from 'react-cookie';

interface AuthContextType {
	accessToken: string | null;
	refreshToken: string | null;
	setAccessToken: (accessToken: string | null) => void;
	setRefreshToken: (refreshToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
	accessToken: null,
	refreshToken: null,
	setAccessToken: () => {},
	setRefreshToken: () => {}
});

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [, setCookie] = useCookies(['accessToken', 'refreshToken']);

	const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('accessToken') || null);
	const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem('refreshToken') || null);

	// * bhai thora Update karle apna local storage jab tokens changes
	useEffect(() => {
		if (accessToken) {
			localStorage.setItem('accessToken', accessToken);
			setCookie('accessToken', accessToken, { path: '/' });
		}
		if (refreshToken) {
			localStorage.setItem('refreshToken', refreshToken);
			// setCookie('refreshToken', refreshToken, { path: '/' });
		}
	}, [accessToken, refreshToken]);

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				refreshToken,
				setAccessToken,
				setRefreshToken
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
