export interface AppointmentData {
	category?: number;
	activity?: number;
	date?: number;
	data?: {
		firstname: string;
		lastname: string;
		phone: string;
	};
}

export enum AppointmentStep {
	CATEGORY = 0,
	ACTIVITY = 1,
	DATE = 2,
	DATA = 3,
	CONFIRM = 4
}

export interface ActivitiesList {
	[key: string]: {
		[key: string]: string;
	}[];
}
