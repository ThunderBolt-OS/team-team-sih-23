import { djangoBaseUrl } from '../constants';

export const login = async (username: string, password: string) => {
	const response = await fetch(`${djangoBaseUrl}auth/jwt/create/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username,
			password: password
		})
	});

	if (!response.ok) {
		throw new Error('Login failed');
	} else if (response.ok) {
		const { access, refresh } = await response.json();
		return { access, refresh };
	} else {
		throw new Error('Login failed');
	}
};
