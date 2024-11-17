<script lang="ts">
	import Button from '$components/ui/Button.svelte';
	import { AppointmentStep, type Category } from '$lib/types/appointmentTypes';

	type Props = {
		setCategory: (category: number) => void;
		setStep: (step: AppointmentStep) => void;
		categories: Category[];
	};

	const { setCategory, setStep, categories }: Props = $props();

	const showButtons = $state(Array(categories.length).fill(false));

	let cancelAnimation = false;
	let isUnmounted = false;

	$effect(() => {
		if (cancelAnimation) return;
		setTimeout(() => {
			categories.forEach((_, index) => {
				setTimeout(() => {
					if (cancelAnimation) return;
					showButtons[index] = true;
				}, index * 200);
			});
		}, 800);

		return () => (isUnmounted = true);
	});

	const onclick = (categoryIndex: number) => {
		cancelAnimation = true;
		setCategory(categoryIndex);
		categories.forEach((_, index) => {
			setTimeout(() => {
				if (isUnmounted) return;
				if (index === categories.length - 1) {
					setTimeout(() => setStep(AppointmentStep.ACTIVITY), 500);
				}
				showButtons[categories.length - 1 - index] = false;
			}, index * 200);
		});
	};
</script>

<div class="container">
	<h2>Que pouvons-nous faire pour vous ?</h2>
	<div class="buttons">
		{#each categories as category, index}
			<div class:is-visible={showButtons[index]}>
				<Button onclick={() => onclick(category.id)} custom>
					<img src={`images/categories_logo/${category.file}.svg`} alt={category.name} />
					{category.name}
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
