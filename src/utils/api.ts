enum Env {
	PROD = 'https://api.renaissance-salon.fr',
	DEV = 'http://localhost:5000'
}

const apiUrl = Env.DEV;

const fetchData = async (
	method: string,
	route: string,
	args?: string[],
	data?: { [key: string]: string }
) => {
	try {
		const urlData = args ? args.join('/') : '';

		const response = await fetch(`${apiUrl}/${route}${urlData ? `/${urlData}` : ''}`, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: method === 'GET' || data === null ? null : JSON.stringify(data)
		});

		const json = await response.json();

		return { server: response, json };
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const get = (route: string, args?: string[]) => fetchData('GET', route, args);

export const post = (route: string, args?: string[], data?: { [key: string]: string }) =>
	fetchData('POST', route, args, data);

export const put = (route: string, args?: string[], data?: { [key: string]: string }) =>
	fetchData('PUT', route, args, data);

export const del = (route: string, args?: string[], data?: { [key: string]: string }) =>
	fetchData('DELETE', route, args, data);

export default { get, post, put, del };
