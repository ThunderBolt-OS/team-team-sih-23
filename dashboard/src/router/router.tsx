import { createBrowserRouter, BrowserRouterProps } from 'react-router-dom';
import { SideBar } from '../components';
import {
	Dashboard,
	Login,
	Messages,
	OfficersAndDeviceData,
	Page404,
	Profile,
	EmissionStatistics,
	StepperFormDataLelo, EmissionReport
} from '../pages';

import PrivateRoute from './PrivateRoute';
import ChatScreen from '../pages/ChatScreen';
import OfficerRoute from '../pages/OfficerRoute/OfficerRoute';

const router: BrowserRouterProps = createBrowserRouter([
	{
		path: '/',
		element: <Login />
	},
	{
		path: '/dashboard',
		element: <SideBar />,
		children: [
			{
				path: '/dashboard/',
				element: <Dashboard />
			},
			{
				path: '/dashboard/emission-report',
				element: <EmissionReport />
			},
			{
				path: '/dashboard/statistics',
				element: <EmissionStatistics />
			},
			{
				path: '/dashboard/profile',
				element: <Profile />
			},
			{
				path: '/dashboard/chat/:phone',
				element: <ChatScreen />
			},
			{
				path: '/dashboard/officer/:officerId',
				element: <OfficerRoute />
			}
		]
	},
	{
		path: '/create-bandobast/',
		element: <StepperFormDataLelo />
	},
	{
		path: '*',
		element: <Page404 />
	}
]);

export default router;
