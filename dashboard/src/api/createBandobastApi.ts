import { djangoBaseUrl } from '../constants';

export const createBandobast = async (formData: any, accessToken: string | null) => {
	try {
		const response = await fetch(`${djangoBaseUrl}bandobast/create/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${accessToken}`
			},
			body: JSON.stringify(formData)
		});

		if (response.ok) {
			console.log('Bandobast created successfully');
		} else {
			console.log('Failed to create Bandobast');
			alert('Failed to create Bandobast');
		}
	} catch (error) {
		console.log('Error:', error);
		throw error;
	}
};
