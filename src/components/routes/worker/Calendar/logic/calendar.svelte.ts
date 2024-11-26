import toast from '$lib/stores/toasts';
import type { CalendarCommandsList } from '$lib/types/CalendarTypes';
import { ToastType } from '$lib/types/toastType';

export default function createCalendar(planning: CalendarCommandsList) {
	const months = [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre'
	];
	const days = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'];

	// current month display
	let currentDate = $state(new Date());
	// manage if its foward or backward transition on change month
	let next = $state(true);

	let selectedDay: { week: number; day: number } = $state({ week: 0, day: 0 });

	let displayModal = $state(false);

	// array of weeks that contains array of days
	const calendarGrid = $derived.by(() => {
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();

		// daysInMonth is an array of all the days in the month
		const daysInMonth = [];
		const date = new Date(year, month, 1);
		while (date.getMonth() === month) {
			daysInMonth.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}

		// get wich day is the first day of the month
		const firstDay = daysInMonth[0].getDay();
		// Adjust the start of the week to Monday
		const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

		// get wich day is the last day of the month
		const lastDay = daysInMonth[daysInMonth.length - 1].getDay();
		// Adjust the end of the week to Sunday
		const adjustedLastDay = lastDay === 0 ? 6 : lastDay - 1;

		// create an array of days in the grid that form the previous month
		const previousMonthDays = adjustedFirstDay
			? Array.from({ length: adjustedFirstDay }, (_, i) => {
					const date = new Date(year, month, -i);
					return { date, isOutside: true };
				}).reverse()
			: [];

		// create an array of days in the grid that form the next month
		const nextMonthDays =
			adjustedLastDay < 6
				? Array.from({ length: 6 - adjustedLastDay }, (_, i) => {
						const date = new Date(year, month + 1, i + 1);
						return { date, isOutside: true };
					})
				: [];

		// create an array of days in the grid that form the current month
		const days = [
			...previousMonthDays,
			...daysInMonth.map((date) => ({ date, isOutside: false })),
			...nextMonthDays
		];

		// adding available days and unavailable days
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const threeMonthsLater = new Date(today);
		threeMonthsLater.setMonth(today.getMonth() + 3);

		const availableDays = days.map((date) => {
			date.date.setHours(0, 0, 0, 0);
			const available = date.date >= today && date.date <= threeMonthsLater;

			const meet = planning.filter(
				(command) => command.date.toDateString() == date.date.toDateString()
			);

			return { ...date, available, meet };
		});

		// sperare all days in the grid into weeks
		const weeks = [];
		for (let i = 0; i < availableDays.length; i += 7) {
			weeks.push(availableDays.slice(i, i + 7));
		}

		return weeks;
	});

	const canGoBack = () => {
		const current = new Date();
		return !(
			currentDate.getMonth() === current.getMonth() &&
			currentDate.getFullYear() === current.getFullYear()
		);
	};

	const canGoNext = () => {
		const last = new Date();
		last.setMonth(last.getMonth() + 3);

		return !(currentDate.getMonth() === last.getMonth());
	};

	const changeMonth = (offset: number) => {
		if (offset < 0 && !canGoBack()) return;
		if (offset > 0 && !canGoNext()) return;
		next = offset > 0;
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
	};

	const onSelectDate = (idWeek: number, idDay: number) => {
		const date = calendarGrid[idWeek][idDay].date;
		date.setHours(0, 0, 0, 0);

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const threeMonthsLater = new Date(today);
		threeMonthsLater.setMonth(today.getMonth() + 3);

		if (date < today)
			return toast({
				message: `A partir du ${today.getDate()} ${months[today.getMonth()]} minimum.`,
				type: ToastType.ERROR
			});

		if (date > threeMonthsLater)
			return toast({
				message: `Jusqu'au ${threeMonthsLater.getDate()} ${months[threeMonthsLater.getMonth()]} maximum.`,
				type: ToastType.ERROR
			});

		selectedDay = { week: idWeek, day: idDay };
		displayModal = true;
	};

	const getDayAndMonth = () => {
		const date = calendarGrid[selectedDay.week][selectedDay.day].date;

		return `${date.getDate()} ${months[date.getMonth()]}`;
	};

	const getHours = (date: Date) => {
		console.log(date);

		return `${date.getHours()}h${date.getMinutes() ? date.getMinutes() : '00'}`;
	};

	return {
		get currentDate() {
			return currentDate;
		},
		get selectedDay() {
			return selectedDay;
		},
		get calendarGrid() {
			return calendarGrid;
		},
		get next() {
			return next;
		},
		get months() {
			return months;
		},
		get days() {
			return days;
		},
		get displayModal() {
			return displayModal;
		},
		set displayModal(value) {
			displayModal = value;
		},
		canGoBack,
		canGoNext,
		changeMonth,
		onSelectDate,
		getDayAndMonth,
		getHours
	};
}
