import api from '$lib/utils/api';
import { writable, type Writable } from 'svelte/store';

export type Auth = {
	id: number;
	email: string;
	firstname: string;
	lastname: string;
	phone: string;
	admin: boolean;
	selectedProfile: {
		id: number;
		email: string;
		firstname: string;
		lastname: string;
		phone: string;
	};
};

export const auth: Writable<undefined | false | Auth> = writable<undefined | false | Auth>(
	undefined,
	(set) => {
		api.get('users/auth').then((response) => {
			if (response && response.server.status === 200) {
				set({
					...response.json.data,
					selectedProfile: {
						id: response.json.data.id,
						email: response.json.data.email,
						firstname: response.json.data.firstname,
						lastname: response.json.data.lastname,
						phone: response.json.data.phone
					}
				});
			} else {
				set(false);
			}
		});
	}
);
