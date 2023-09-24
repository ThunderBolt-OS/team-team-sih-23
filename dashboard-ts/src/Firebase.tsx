import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyAVceMJoW6Zku3A4o8ycU6GZo0mt5MTtIw',
	authDomain: 'kavach-23-a3959.firebaseapp.com',
	projectId: 'kavach-23-a3959',
	storageBucket: 'kavach-23-a3959.appspot.com',
	messagingSenderId: '536105131175',
	appId: '1:536105131175:web:a83fb42f3238ecf1f44f82',
	measurementId: 'G-LTB6J7P3BC'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const AppMessaging = getMessaging(app);

export const get_fcm_token = async () => {
	const token = await getToken(AppMessaging);
	return token;
};

// const db = getFirestore(app);

// import { useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// const firebaseConfig = {
// 	// Your Firebase configuration object goes here
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const appMessaging = getMessaging(app);

// const handleNotificationClick = (data: any) => {
// 	const notification = new Notification(data.title, {
// 		body: data.body,
// 		icon: data.icon,
// 	});

// 	notification.onclick = () => {
// 		window.open(data.url, '_blank');
// 		notification.close();
// 	};
// };

// const App = () => {
// 	useEffect(() => {
// 		// Request permission for notifications when the component mounts
// 		Notification.requestPermission().then((permission) => {
// 			if (permission === 'granted') {
// 				console.log('Notification permission granted.');
// 			} else {
// 				console.log('Notification permission denied.');
// 			}
// 		});

// 		// Listen for incoming messages when the component mounts
// 		onMessage(appMessaging, (payload) => {
// 			// Check if the payload contains data and has the required fields
// 			if (payload.data && payload.data.url) {
// 				handleNotificationClick(payload.data);
// 			}
// 		});
// 	}, []);

// 	// Your component rendering and other logic here
// 	return <div>Your React app content goes here</div>;
// };

// export default App;
