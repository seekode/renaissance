import toast from '$lib/stores/toasts';
import {
	AppointmentStep,
	type ActivitiesList,
	type Activity,
	type AppointmentData,
	type Category,
	type CommandsList,
	type Maker,
	type MakersList,
	type Tarifs
} from '$lib/types/appointmentTypes';
import { ToastType } from '$lib/types/toastType';
import api from '$lib/utils/api';

export default function createAppointment(cancel: () => void, selectedCategory: null | Category) {
	// final data of appointment
	const data: AppointmentData = {};

	// DATA FOR EACH STEP
	let activitiesList = $state<ActivitiesList | null>(null);
	let tarifsList = $state<Tarifs[] | null>(null);
	let makersList = $state<MakersList | null>(null);
	let commandsList = $state<CommandsList | false | null>(null);

	// MANAGE APPOINTMENT STEPS
	let step: AppointmentStep = $state(
		selectedCategory ? AppointmentStep.ACTIVITY : AppointmentStep.CATEGORY
	); // current step of appointment taking
	let error = $state(false); // error in appointment taking
	const loading = $derived.by(() => {
		// appointment is in loading if data of current step is not loaded
		if (step === AppointmentStep.ACTIVITY && (activitiesList === null || tarifsList === null))
			return true;
		if (step === AppointmentStep.MAKER && makersList === null) return true;
		if (step === AppointmentStep.DATE && commandsList === null) return true;
		return false;
	});

	/**
	 * back to previous step of appointment taking
	 */
	const back = () => {
		if (step === AppointmentStep.CATEGORY) {
			cancel();
		}
		if (step === AppointmentStep.ACTIVITY) step = AppointmentStep.CATEGORY;
		if (step === AppointmentStep.MAKER) step = AppointmentStep.ACTIVITY;
		if (step === AppointmentStep.DATE) step = AppointmentStep.MAKER;
		if (step === AppointmentStep.DATA) step = AppointmentStep.DATE;
		if (step === AppointmentStep.SUMMARY) step = AppointmentStep.DATA;
	};

	/**
	 * restart appointment taking to first (category) step
	 */
	const restart = () => {
		step = AppointmentStep.CATEGORY;
		activitiesList = null;
		error = false;
	};

	/**
	 * set current step of appointment taking
	 * @param step step to set
	 */
	const setStep = (newStep: AppointmentStep) => (step = newStep);

	/**
	 * set category of appointment taking then start loading activities list
	 * @param category category to set
	 */
	const setCategory = async (category: number) => {
		try {
			data.category = category;
			activitiesList = null;
			const response = await api.get('activities/byCategories', [category.toString()]);

			if (!response || response.server.status !== 200) {
				error = true;
				return;
			}

			const newData: ActivitiesList = {};

			for (const item of response.json.data.activities) {
				if (!newData[item.name_subcategories]) newData[item.name_subcategories] = [];
				newData[item.name_subcategories].push(item);
			}

			activitiesList = newData;

			tarifsList = response.json.data.tarifs;
		} catch {
			error = true;
		}
	};

	/**
	 * set activity of appointment taking then start loading users list
	 * @param activity activity to set
	 */
	const setActivity = async (activity: Activity) => {
		try {
			data.activity = activity;

			const response = await api.get('users/makeActivity', [activity.id.toString()]);

			if (!response || response.server.status !== 200) {
				error = true;
				return;
			}

			const convertToTime = (dateString: string) => {
				const [hours, minutes] = dateString.split(':').map(Number);
				const date = new Date();
				date.setHours(hours, minutes, 0, 0);
				return date;
			};

			makersList = response.json.data.map(
				(maker: { [key: string]: string | { [key: string]: string }[] }) => {
					const newMaker = {
						...maker,
						schedule: (maker.schedule as { [key: string]: string | null }[]).map((schedule) => {
							return {
								id: schedule.id,
								day: schedule.day,
								start_am: schedule.start_am ? convertToTime(schedule.start_am) : null,
								end_am: schedule.end_am ? convertToTime(schedule.end_am) : null,
								start_pm: schedule.start_pm ? convertToTime(schedule.start_pm) : null,
								end_pm: schedule.end_pm ? convertToTime(schedule.end_pm) : null,
								id_users: schedule.id_users
							};
						})
					};

					return newMaker;
				}
			);
		} catch {
			error = true;
			activitiesList = null;
		}
	};

	/**
	 * set maker of appointment taking then start loading commands list
	 * @param maker maker to set
	 */
	const setMaker = async (maker: Maker) => {
		try {
			data.maker = maker;

			const response = await api.get('commands/ofUser', [maker.id.toString()]);

			if (!response || (response.server.status !== 200 && response.server.status !== 404)) {
				error = true;
				return;
			}

			if (response.server.status === 404) {
				if (response.json.code === 'no-commands') {
					commandsList = false;
					return;
				} else {
					error = true;
					return;
				}
			}

			commandsList = response.json.data.map((item: { [key: string]: string | number }) => ({
				...item,
				date: new Date(item.date)
			}));
		} catch {
			error = true;
		}
	};

	const setDate = (date: Date) => (data.date = date);

	const setData = (firstname: string, lastname: string, phone: string) => {
		data.data = { firstname, lastname, phone };
	};

	const submit = async () => {
		if (!data.maker) {
			toast({
				message: `Une erreur est survenue.`,
				type: ToastType.ERROR
			});
			setStep(AppointmentStep.MAKER);
			return;
		}
		if (!data.date) {
			toast({
				message: `Une erreur est survenue.`,
				type: ToastType.ERROR
			});
			setStep(AppointmentStep.DATE);
			return;
		}
		if (!data.data) {
			toast({
				message: `Une erreur est survenue.`,
				type: ToastType.ERROR
			});
			setStep(AppointmentStep.DATA);
			return;
		}

		const response = await api.post('commands/create', [], {
			firstname: data.data.firstname,
			lastname: data.data.lastname,
			phone: data.data.phone,
			id_make: data.maker.id_make,
			date: data.date.toISOString()
		});

		console.log(response);

		if (response && response.server.status === 200) {
			setStep(AppointmentStep.CONFIRM);
		} else {
			error = true;
		}
	};

	if (selectedCategory) setCategory(selectedCategory.id);

	return {
		get data() {
			return data;
		},
		get activitiesList() {
			return activitiesList;
		},
		get tarifsList() {
			return tarifsList;
		},
		get makersList() {
			return makersList;
		},
		get commandsList() {
			return commandsList;
		},
		get step() {
			return step;
		},
		get error() {
			return error;
		},
		get loading() {
			return loading;
		},
		back,
		restart,
		setStep,
		setCategory,
		setActivity,
		setMaker,
		setDate,
		setData,
		submit
	};
}
