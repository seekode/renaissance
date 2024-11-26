import { browser } from '$app/environment';
import { auth } from '$lib/stores/auth';

enum Env {
	PROD = 'https://api.renaissance-salon.fr',
	DEV = 'http://localhost:3000'
}

const apiUrl = Env.PROD;

const fetchData = async (
	method: string,
	route: string,
	args?: string[],
	data?: { [key: string]: string | number }
) => {
	if (!browser) return;
	try {
		const urlData = args ? args.join('/') : '';

		const response = await fetch(`${apiUrl}/${route}${urlData ? `/${urlData}` : ''}`, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: method === 'GET' || data === null ? null : JSON.stringify(data)
		});

		const json = await response.json();

		if (response.status === 401 && json.code == 'login-required') {
			auth.set(false);
		}

		return { server: response, json };
	} catch (error) {
		console.error(error);
		return false;
	}
};

const get = (route: string, args?: string[]) => fetchData('GET', route, args);

const post = (route: string, args?: string[], data?: { [key: string]: string | number }) =>
	fetchData('POST', route, args, data);

const put = (route: string, args?: string[], data?: { [key: string]: string | number }) =>
	fetchData('PUT', route, args, data);

const del = (route: string, args?: string[], data?: { [key: string]: string | number }) =>
	fetchData('DELETE', route, args, data);

export default { get, post, put, del };
