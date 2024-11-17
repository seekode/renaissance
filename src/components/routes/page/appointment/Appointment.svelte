<script lang="ts">
	import IconArrowBack from '~icons/ion/arrow-back';
	import IconClose from '~icons/ion/close';
	import IconAccount from '~icons/ion/person';
	import { AppointmentStep, type Category } from '$lib/types/appointmentTypes';
	import Spinner from '$components/ui/Spinner.svelte';
	import { fade, type TransitionConfig } from 'svelte/transition';
	import ErrorStep from './steps/ErrorStep.svelte';
	import CategoriesStep from './steps/CategoriesStep.svelte';
	import ActivitiesStep from './steps/ActivitiesStep.svelte';
	import createAppointment from './logic/appointment.svelte';
	import MakerStep from './steps/MakerStep.svelte';
	import DateStep from './steps/DateStep/DateStep.svelte';
	import DataStep from './steps/DataStep.svelte';
	import Summary from './steps/Summary.svelte';
	import ConfirmStep from './steps/ConfirmStep.svelte';

	type Props = {
		cancel: () => void;
		categories: Category[];
		selectedCategory: null | Category;
	};

	const { cancel, categories, selectedCategory }: Props = $props();

	const appointment = createAppointment(cancel, selectedCategory);

	// transition
	const inTransition: TransitionConfig = { duration: 300, delay: 300 };
	const outTransition: TransitionConfig = { duration: 300 };
</script>

<nav>
	<div>
		<IconArrowBack onclick={appointment.back} />
		<IconClose onclick={cancel} />
	</div>
	<IconAccount />
</nav>
<!-- ERROR -->
{#if appointment.error}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<ErrorStep restart={appointment.restart} />
	</div>
	<!-- LOADING -->
{:else if appointment.loading}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<Spinner />
	</div>
	<!-- CATEGORIES -->
{:else if appointment.step === AppointmentStep.CATEGORY}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<CategoriesStep
			{categories}
			setCategory={appointment.setCategory}
			setStep={appointment.setStep}
		/>
	</div>
	<!-- ACTIVITIES -->
{:else if appointment.step === AppointmentStep.ACTIVITY && appointment.activitiesList && appointment.tarifsList}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<ActivitiesStep
			tarifsList={appointment.tarifsList}
			activitiesList={appointment.activitiesList}
			setActivity={appointment.setActivity}
			setStep={appointment.setStep}
		/>
	</div>
	<!-- MAKER -->
{:else if appointment.step === AppointmentStep.MAKER && appointment.makersList}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<MakerStep
			makersList={appointment.makersList}
			setMaker={appointment.setMaker}
			setStep={appointment.setStep}
		/>
	</div>
{:else if appointment.step === AppointmentStep.DATE && appointment.data.maker && appointment.data.activity && appointment.commandsList !== null}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<DateStep
			activity={appointment.data.activity}
			commandsList={appointment.commandsList}
			maker={appointment.data.maker}
			setDate={appointment.setDate}
			setStep={appointment.setStep}
		/>
	</div>
{:else if appointment.step === AppointmentStep.DATA && appointment.data.date}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<DataStep setData={appointment.setData} setStep={appointment.setStep} />
	</div>
{:else if appointment.step === AppointmentStep.SUMMARY && appointment.data.data}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<Summary
			appoitment={appointment.data}
			restart={appointment.restart}
			submit={appointment.submit}
		/>
	</div>
{:else if appointment.step === AppointmentStep.CONFIRM}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<ConfirmStep {cancel} />
	</div>
{:else}
	<div class="container" in:fade={inTransition} out:fade={outTransition}>
		<ErrorStep restart={appointment.restart} />
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
		width: calc(100% - 2rem);
		height: calc(100% - 4rem);
		padding: 1rem;
		position: absolute;
		top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
