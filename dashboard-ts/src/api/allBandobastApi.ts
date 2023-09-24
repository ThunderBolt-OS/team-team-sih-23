import { djangoBaseUrl } from '../constants';

export const fetchBandobastData = async (accessToken: string) => {
	try {
		const response = await fetch(`${djangoBaseUrl}bandobast/`, {
			headers: {
				Authorization: `JWT ${accessToken}`
			}
		});

		if (!response.ok) {
			throw new Error('Error fetching data');
		}
		const jsonData = await response.json();
		return filterLocationData(jsonData);
	} catch (error) {
		throw new Error('Error fetching data');
	}
};

const filterLocationData = (jsonData: Array<any>) => {
	const filteredLocationData = jsonData.map((obj: { location_data: object }) => {
		const { location_data } = obj;
		if (location_data === 'null') {
			return [];
		} else {
			return JSON.parse(location_data);
		}
	});
};
