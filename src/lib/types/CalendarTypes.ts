export type CalendarCommandsList = {
	id: number;
	before: number;
	after: number;
	available: number | null;
	available_after: number | null;
	date: Date;
	duration: number;
	id_activities: number;
	name: string;
	firstname: string;
	lastname: string;
	phone: string;
}[];
