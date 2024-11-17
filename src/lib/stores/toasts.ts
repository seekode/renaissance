import type { ToastProps } from '$lib/types/toastType';
import { writable } from 'svelte/store';

export const toasts = writable<ToastProps[]>([]);

export const toast = (props: ToastProps, duration: number = 3000) => {
	toasts.update((all) => {
		setTimeout(() => {
			toasts.update((all) => {
				return all.filter((toast) => toast !== props);
			});
		}, duration);
		return [...all, props];
	});
};

export default toast;
