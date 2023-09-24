import { djangoBaseUrl } from '../constants';

export const fetchDevices = async (accessToken: string | null) => {
	try {
		const response = await fetch('http://localhost:8000/nfc-devices/bandobas/1/', {
			headers: {
				Authorization: `JWT ${accessToken}`
			}
		});

		if (!response.ok) {
			throw new Error('Error fetching data');
		}

		const data = await response.json();
		console.log('Data fetched:', data);
		return data.filter((device: any) => !device.is_assigned);
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

export const assignDevice = async (
	selectedDevice: string,
	police_id: string,
	timeOfDuty: string,
	name: string,
	mobile: string,
	accessToken: string | null
) => {
	try {
		const postData = {
			assigned_nfc_device: selectedDevice,
			police_id: police_id,
			timeOfDuty: timeOfDuty,
			name: 'test',
			mobile: '1234567890'
		};

		console.log('postData', postData);
		const response = await fetch('http://localhost:8000/bandobas-officers/create/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${accessToken}`
			},
			body: JSON.stringify(postData)
		});

		const responseData = await response.json();
		console.log('Device assigned:', responseData);
		// Perform any additional actions upon successful assignment
	} catch (error) {
		console.error('Error assigning device:', error);
		throw error;
	}
};
