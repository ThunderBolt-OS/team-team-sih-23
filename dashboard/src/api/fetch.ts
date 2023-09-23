import { djangoBaseUrl } from '../constants';

const BASE_URL = djangoBaseUrl;

const getRequest = async (
	url: string,
	object: Record<string, any> = {},
	controller?: AbortController
): Promise<any> => {
	const token = localStorage.getItem('accessToken');
	const headers: Record<string, string> = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...(token && { Authorization: `JWT ${token}` })
	};

	let finalUrl = url;
	if (Object.keys(object).length > 0) {
		const queryString = serializeObject(object);
		finalUrl = `${url}?${queryString}`;
	}
	console.log('final url', finalUrl);
	try {
		const response = await fetch(`${BASE_URL}${finalUrl}`, {
			method: 'GET',
			headers: headers,
			signal: controller?.signal
		});
		const json = await response.json();
		return json;
	} catch (error) {
		// console.error(error);
		throw error;
	}
};

const postRequest = async (url: string, object?: Record<string, any>): Promise<any> => {
	const token = localStorage.getItem('accessToken');
	const headers: Record<string, string> = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...(token && { Authorization: `JWT ${token}` })
	};

	const body = JSON.stringify(object);

	try {
		const response = await fetch(`${BASE_URL}${url}`, {
			method: 'POST',
			headers: headers,
			body: body
		});
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const putRequest = async (url: string, object?: Record<string, any>): Promise<any> => {
	const token = localStorage.getItem('accessToken');
	const headers: Record<string, string> = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...(token && { Authorization: `JWT ${token}` })
	};

	const body = JSON.stringify(object);

	try {
		const response = await fetch(`${BASE_URL}${url}`, {
			method: 'PUT',
			headers: headers,
			body: body
		});
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const serializeObject = (object: Record<string, any>): string => {
	return Object.entries(object)
		.map(([key, val]) => `${key}=${val}`)
		.join('&');
};

export const GET = getRequest;
export const POST = postRequest;
export const PUT = putRequest;
export const serialize = serializeObject;
