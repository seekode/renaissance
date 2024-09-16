<script lang="ts">
	import IconArrowBack from '~icons/ion/arrow-back';
	import IconClose from '~icons/ion/close';
	import IconAccount from '~icons/ion/person';
	import {
		AppointmentStep,
		type ActivitiesList,
		type AppointmentData
	} from '$types/appointmentTypes';
	import AError from '$components/routes/page/appointment/AError.svelte';
	import ACategoriesStep from '$components/routes/page/appointment/ACategoriesStep.svelte';
	import Spinner from '$components/ui/Spinner.svelte';
	import { fade, type TransitionConfig } from 'svelte/transition';
	import { get } from '$utils/api';
	import APackagesStep from './APackagesStep.svelte';

	const { cancel }: { cancel: () => void } = $props();

	// data of appointment
	const appointmentData: AppointmentData = {};
	let error = $state(false);
	let appointmentSteps = $state<AppointmentStep>(AppointmentStep.CATEGORY);
	let activitiesList = $state<ActivitiesList | null>(null);

	// if appointment is loading
	let loading = $derived.by(() => {
		if (appointmentSteps === AppointmentStep.ACTIVITY && activitiesList === null) return true;
		return false;
	});

	// actions of appointment
	const back = () => {
		if (appointmentSteps === AppointmentStep.CATEGORY) {
			cancel();
		}
		if (appointmentSteps === AppointmentStep.ACTIVITY) {
			appointmentSteps = AppointmentStep.CATEGORY;
		}
		if (appointmentSteps === AppointmentStep.DATE) {
			appointmentSteps = AppointmentStep.CATEGORY;
		}
		if (appointmentSteps === AppointmentStep.DATA) {
			appointmentSteps = AppointmentStep.DATE;
		}
	};
	const setStep = (step: AppointmentStep) => (appointmentSteps = step);
	const setCategory = async (category: number) => {
		try {
			appointmentData.category = category;
			activitiesList = null;
			const response = await get('activities/byCategories', [category.toString()]);

			if (!response || response.server.status !== 200) {
				error = true;
				activitiesList = null;
				return;
			}

			const data = response.json.data as { [key: string]: string }[];
			const newData: ActivitiesList = {};

			for (const item of data) {
				if (!newData[item.name_subcategories]) newData[item.name_subcategories] = [];

				newData[item.name_subcategories].push(item);
			}

			activitiesList = newData;
		} catch (error) {
			error = true;
			activitiesList = null;
		}
	};

	// transition
	const inTransition: TransitionConfig = { duration: 300, delay: 300 };
	const outTransition: TransitionConfig = { duration: 300 };
</script>

<nav>
	<div>
		<IconArrowBack onclick={back} />
		<IconClose onclick={cancel} />
	</div>
	<IconAccount />
</nav>
{#if error}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<AError {setStep} />
	</div>
{:else if loading}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<Spinner />
	</div>
{:else if appointmentSteps === AppointmentStep.CATEGORY}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<ACategoriesStep {setCategory} {setStep} />
	</div>
{:else if appointmentSteps === AppointmentStep.ACTIVITY && activitiesList}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<APackagesStep {activitiesList} />
	</div>
{:else}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<AError {setStep} />
	</div>
{/if}

<style lang="scss">
	nav {
		width: calc(100% - 2rem);
		height: 2rem;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		div {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		:global(svg) {
			cursor: pointer;
			transition: 0.2s;

			&:hover {
				color: #f7ef8a;
			}
		}
	}
	.container {
		width: 100%;
		height: calc(100% - 2rem);
		position: absolute;
		top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
