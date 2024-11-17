import toast from '$lib/stores/toasts';
import {
	AppointmentStep,
	type Activity,
	type CommandsList,
	type Maker,
	type TimeSlot
} from '$lib/types/appointmentTypes';
import { ToastType } from '$lib/types/toastType';

export default function createCalendar(
	commandsList: CommandsList | false,
	maker: Maker,
	activity: Activity,
	setDate: (date: Date) => void,
	setStep: (step: AppointmentStep) => void
) {
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
	let displayModal = $state(false);
	let selectedDay: { week: number; day: number } | false = $state(false);

	// current month display
	let currentDate = $state(new Date());
	// manage if its foward or backward transition on change month
	let next = $state(true);

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
		// get wich day is the last day of the month
		const lastDay = daysInMonth[daysInMonth.length - 1].getDay();

		// create an array of days in the grid that form the previous month
		const previousMonthDays = firstDay
			? Array.from({ length: firstDay }, (_, i) => {
					const date = new Date(year, month, -i);
					return { date, isOutside: true };
				}).reverse()
			: [];

		// create an array of days in the grid that form the next month
		const nextMonthDays =
			lastDay < 6
				? Array.from({ length: 6 - lastDay }, (_, i) => {
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
			const available = date.date > today && date.date <= threeMonthsLater;

			const timeSlots: TimeSlot = [
				...generateTimeSlots(maker.start_am, maker.end_am, date.date),
				...generateTimeSlots(maker.start_pm, maker.end_pm, date.date)
			];

			return { ...date, available, timeSlots };
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

		if (date <= today)
			return toast({
				message: `A partir du ${today.getDate() + 1} ${months[today.getMonth()]} minimum.`,
				type: ToastType.ERROR
			});

		if (date > threeMonthsLater)
			return toast({
				message: `Jusqu'au ${threeMonthsLater.getDate()} ${months[threeMonthsLater.getMonth()]} maximum.`,
				type: ToastType.ERROR
			});

		if (!isDayAvailable(idWeek, idDay)) {
			return toast({
				message: `Ce jour est déjà plein.`,
				type: ToastType.ERROR
			});
		}

		selectedDay = { week: idWeek, day: idDay };

		displayModal = true;
	};

	const isDayAvailable = (idWeek: number, idDay: number): boolean => {
		for (const timeSlot of calendarGrid[idWeek][idDay].timeSlots) {
			for (const minutes of timeSlot.minutes) {
				if (minutes?.available) {
					return true;
				}
			}
		}
		return false;
	};

	const generateTimeSlots = (start: Date, end: Date, day: Date) => {
		const slots: TimeSlot = [];
		const current = new Date(start);

		const commandsOfDay: CommandsList = !commandsList
			? []
			: commandsList.filter(
					(c) => c.date.getMonth() === day.getMonth() && c.date.getDate() === day.getDate()
				);

		let unavailableStartSlots = Math.ceil(activity.before / 10);

		while (current < end) {
			const hours = current.getHours();
			const minutes = current.getMinutes();
			let slot = slots.find((s) => s.hours === hours);
			if (!slot) {
				slot = { hours, minutes: [] };
				slots.push(slot);
			}

			if (
				minutes == 0 ||
				minutes == 10 ||
				minutes == 20 ||
				minutes == 30 ||
				minutes == 40 ||
				minutes == 50
			) {
				let available = true;

				if (unavailableStartSlots > 0) {
					available = false;
					unavailableStartSlots--;
				} else {
					for (const command of commandsOfDay) {
						const start = new Date(command.date);
						start.setMinutes(start.getMinutes() - activity.after - 9.9);
						const end = new Date(command.date);
						end.setMinutes(
							end.getMinutes() + command.before + command.duration + command.after + activity.before
						);

						const blockTime = new Date(start);
						blockTime.setHours(hours, minutes, 0, 0);
						const blockStartTime = blockTime.getTime();

						if (blockStartTime >= start.getTime() && blockStartTime < end.getTime()) {
							available = false;
							break;
						}
					}
				}

				slot.minutes.push({ minutes, available: available });
			}
			current.setMinutes(current.getMinutes() + 10);
		}

		let unavailableEndSlots = Math.ceil(activity.after / 10);
		for (let i = slots.length - 1; i >= 0 && unavailableEndSlots > 0; i--) {
			for (let j = slots[i].minutes.length - 1; j >= 0 && unavailableEndSlots > 0; j--) {
				slots[i].minutes[j].available = false;
				unavailableEndSlots--;
			}
		}

		const checkAvailable = (i: number, y: number): boolean => {
			const slotNeed = Math.ceil(activity.duration / 10);
			let slotCount = 0;
			let firstLoop = true;

			for (let iTemp = i; iTemp < slots.length; iTemp++) {
				const slotTemp = slots[iTemp];

				for (let yTemp = firstLoop ? y : 0; yTemp < slotTemp.minutes.length; yTemp++) {
					firstLoop = false;
					const minutesSlotTemp = slotTemp.minutes[yTemp];

					if (minutesSlotTemp?.available) {
						slotCount++;
						if (slotCount >= slotNeed) {
							return true;
						}
					} else {
						return false;
					}
				}
			}
			return false;
		};

		for (let i = 0; i < slots.length; i++) {
			const slot = slots[i];

			for (let y = 0; y < slot.minutes.length; y++) {
				const minutesSlot = slot.minutes[y];
				if (minutesSlot?.available) minutesSlot.available = checkAvailable(i, y);
			}
		}

		return slots;
	};

	const onSelectSlote = (hours: number, minutes: number, available: boolean) => {
		if (!available)
			return toast({
				message: `Cette heure n'est pas disponible.`,
				type: ToastType.ERROR
			});

		if (!selectedDay)
			return toast({
				message: `Le jour n'est pas sélectionné.`,
				type: ToastType.ERROR
			});

		const date = new Date(calendarGrid[selectedDay.week][selectedDay.day].date);
		date.setHours(hours, minutes - activity.after, 0, 0);
		setDate(date);
		setStep(AppointmentStep.DATA);
	};

	return {
		months,
		days,
		get displayModal() {
			return displayModal;
		},
		get selectedDay() {
			return selectedDay;
		},
		set displayModal(value) {
			displayModal = value;
		},
		get currentDate() {
			return currentDate;
		},
		get calendarGrid() {
			return calendarGrid;
		},
		get next() {
			return next;
		},
		get isDayAvailable() {
			return isDayAvailable;
		},
		canGoBack,
		canGoNext,
		changeMonth,
		onSelectDate,
		onSelectSlote
	};
}
