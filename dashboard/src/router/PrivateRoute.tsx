import { Route, RouteProps, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import React from 'react';

interface PrivateRouteProps extends Omit<RouteProps, 'element'> {
	element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
	const { accessToken, refreshToken } = React.useContext(AuthContext);

	let navigate = useNavigate();

	if (!accessToken || !refreshToken) {
		React.useEffect(() => {
			navigate('/');
		}, []);
		return null;
	}

	return element;
};

export default PrivateRoute;
