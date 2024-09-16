<script lang="ts">
	import coiffure from '$lib/images/categories_logo/coiffure.svg';
	import massage from '$lib/images/categories_logo/massage.svg';
	import manucure from '$lib/images/categories_logo/manucure.png';
	import esthetique from '$lib/images/categories_logo/esthetique.svg';
	import epilation from '$lib/images/categories_logo/epilation.svg';
	import forfait from '$lib/images/categories_logo/forfait.svg';
	import Button from '$components/ui/Button.svelte';
	import { AppointmentStep } from '$types/appointmentTypes';

	type Props = {
		setCategory: (category: number) => void;
		setStep: (step: AppointmentStep) => void;
	};

	const { setCategory, setStep }: Props = $props();

	const buttons = [
		{ img: coiffure, text: 'Coiffure', id: 2 },
		{ img: massage, text: 'Massage', id: 3 },
		{ img: manucure, text: 'Manucure', id: 4 },
		{ img: esthetique, text: 'Esthétique', id: 5 },
		{ img: epilation, text: 'Épilation', id: 6 },
		{ img: forfait, text: 'Forfait', id: 1 }
	];

	const showButtons = $state(Array(buttons.length).fill(false));

	let cancelAnimation = false;

	$effect(() => {
		if (cancelAnimation) return;
		setTimeout(() => {
			buttons.forEach((_, index) => {
				setTimeout(() => {
					if (cancelAnimation) return;
					showButtons[index] = true;
				}, index * 200);
			});
		}, 800);
	});

	const onclick = (categoryIndex: number) => {
		cancelAnimation = true;
		setCategory(categoryIndex);
		buttons.forEach((_, index) => {
			setTimeout(() => {
				if (index === buttons.length - 1) {
					setTimeout(() => setStep(AppointmentStep.ACTIVITY), 500);
				}
				showButtons[buttons.length - 1 - index] = false;
			}, index * 200);
		});
	};
</script>

<div class="container">
	<h2>Que pouvons-nous faire pour vous ?</h2>
	<div class="buttons">
		{#each buttons as button, index}
			<div class:is-visible={showButtons[index]}>
				<Button onclick={() => onclick(button.id)}>
					<img src={button.img} alt={button.text} />
					{button.text}
				</Button>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5rem;
		overflow-y: scroll;

		h2 {
			text-align: center;
		}

		.buttons {
			max-width: 50rem;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			gap: 0.5rem;

			div {
				opacity: 0;
				// visibility: hidden;
				transform: translateY(3rem);
				transition: 0.5s ease-in-out;

				&.is-visible {
					opacity: 1;
					transform: translateY(0);
					visibility: visible;
				}

				:global(button) {
					height: 3.5rem;
					width: 15rem;
					padding: 0.5rem 1rem;
					font-size: 1.8rem;
					justify-content: start;
				}
			}
		}
	}

	@media screen and (orientation: landscape) {
		@media (max-width: 800px) {
			.container {
				gap: 3rem;
			}
		}

		@media (max-width: 520px) {
			.container {
				padding-bottom: 1rem;
				justify-content: start;
			}
		}
	}

	@media screen and (orientation: portrait) {
		@media (max-width: 520px) {
			.container {
				padding-bottom: 1rem;
				gap: 3rem;
				justify-content: start;
			}
		}
	}
</style>
