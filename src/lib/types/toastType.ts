export enum ToastType {
	INFO = 'info',
	SUCCESS = 'success',
	ERROR = 'error'
}

export interface ToastProps {
	message: string;
	type?: ToastType;
}
