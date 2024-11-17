export type Maker = {
	id: number;
	firstname: string;
	lastname: string;
	start_am: Date;
	end_am: Date;
	start_pm: Date;
	end_pm: Date;
};

export interface AppointmentData {
	category?: number;
	activity?: Activity;
	maker?: Maker;
	date?: Date;
	data?: {
		firstname: string;
		lastname: string;
		phone: string;
	};
}

export enum AppointmentStep {
	CATEGORY,
	ACTIVITY,
	MAKER,
	DATE,
	DATA,
	SUMMARY,
	CONFIRM
}

export interface Category {
	id: number;
	name: string;
	file: string;
}

export interface Activity {
	id: number;
	name: string;
	description: string;
	before: number;
	duration: number;
	available: number | null;
	available_after: number | null;
	after: number;
	id_subcategories: number;
	name_subcategories: string;
}

export interface ActivitiesList {
	[key: string]: Activity[];
}

export interface Tarifs {
	id: number;
	name: string;
	price: number;
}

export type MakersList = Maker[];

export type CommandsList = {
	id: number;
	available: number | null;
	available_after: number | null;
	before: number;
	after: number;
	date: Date;
	duration: number;
	id_activities: number;
}[];

export type TimeSlot = {
	hours: number;
	minutes: {
		minutes: 0 | 10 | 20 | 30 | 40 | 50;
		available: boolean;
	}[];
}[];
