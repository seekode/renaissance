<script lang="ts">
	import { AppointmentStep, type Maker, type MakersList } from '$lib/types/appointmentTypes';

	type Props = {
		makersList: MakersList;
		setMaker: (maker: Maker) => void;
		setStep: (step: AppointmentStep) => void;
	};

	const { makersList, setMaker, setStep }: Props = $props();

	let cancelAnimation = false;
	const showMakers = $state(Array(makersList.length).fill(false));

	$effect(() => {
		makersList.forEach((_, index) => {
			setTimeout(() => {
				if (cancelAnimation) return;
				showMakers[index] = true;
			}, index * 200);
		});
	});

	const onclick = (makerIndex: Maker) => {
		cancelAnimation = true;
		setMaker(makerIndex);
		makersList.forEach((_, index) => {
			setTimeout(() => {
				if (index === makersList.length - 1) {
					setTimeout(() => setStep(AppointmentStep.DATE), 500);
				}
				showMakers[makersList.length - 1 - index] = false;
			}, index * 200);
		});
	};
</script>

<div class="container">
	<h2>Avec qui souhaitez-vous faire le rendez-vous ?</h2>
	{#each makersList as maker, index}
		<button class:is-visible={showMakers[index]} onclick={() => onclick(maker)}
			>{maker.firstname}</button
		>
	{/each}
</div>

<style lang="scss">
	.container {
		width: 100%;
		flex: 1;
		padding-top: 4rem;
		padding-bottom: 4rem;
		display: flex;
		justify-content: center;
		align-content: center;
		gap: 3rem;
		flex-wrap: wrap;
		overflow-y: auto;

		h2 {
			width: 100%;
			margin-bottom: 1rem;
			text-align: center;
		}

		button {
			width: 15rem;
			height: 5rem;
			border: 1px solid $white;
			font-size: 1rem;
			background: $black;
			box-shadow: $shadow;
			border-radius: 0.6rem;
			cursor: pointer;
			flex: 0 0 auto;
			opacity: 0;
			visibility: hidden;
			transform: translateY(3rem);
			transition: 0.5s ease-in-out;

			&.is-visible {
				opacity: 1;
				transform: translateY(0);
				visibility: visible;
			}
		}
	}

	@media screen and (max-width: 600px) {
		.container {
			flex-direction: column;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: start;
		}
	}
</style>
