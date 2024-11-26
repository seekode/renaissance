<script lang="ts">
	import Button from '$components/ui/Button.svelte';
	import Modal from '$components/ui/Modal.svelte';
	import type { Category } from '$lib/types/appointmentTypes';
	import { fade } from 'svelte/transition';

	type Props = {
		categories: null | Category[];
		selectCategory: (category: Category) => void;
	};

	const { categories, selectCategory }: Props = $props();

	let subCategories: null | Category[] = $state(null);

	const onclick = (category: Category) => {
		if (!categories) return;

		subCategories = null;
		const newSubCategories = categories.filter(
			(item) => item.id_categories && item.id_categories == category.id
		);

		if (newSubCategories.length > 0) {
			subCategories = newSubCategories;
			return;
		}

		selectCategory(category);
	};
</script>

<section>
	<img src="images/index/home.png" alt="Home" />
	<div>
		{#if categories}
			{@const displayedCategories = categories.filter((category) => !category.id_categories)}
			<div transition:fade>
				{#each displayedCategories as category}
					<Button custom onclick={() => onclick(category)}>
						{#if category.file}
							<img src={`images/categories_logo/${category.file}.svg`} alt={category.name} />
						{/if}
						{category.name}
					</Button>
				{/each}
			</div>
		{/if}
	</div>
</section>
{#if subCategories}
	<Modal onClose={() => (subCategories = null)}>
		{#each subCategories as category, index}
			<Button onclick={() => onclick(category)} custom>
				{#if category.file}
					<img src={`images/categories_logo/${category.file}.svg`} alt={category.name} />
				{/if}
				{category.name}
			</Button>
		{/each}
	</Modal>
{/if}

<style lang="scss">
	section {
		width: 55%;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;

		> img {
			height: calc(100% - 20rem);
			max-width: 90%;
			margin: 1rem;
			object-fit: contain;
			object-position: center;
		}

		> div {
			width: 90%;
			height: 20rem;
			max-width: 50rem;
			margin: 1rem;

			> div {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-content: center;
				flex-wrap: wrap;
				gap: 1rem;

				:global(button) {
					height: 3.5rem;
					width: 13rem;
					padding: 0.5rem 1rem;
					font-size: 1.8rem;
					gap: 0.5rem;
				}
			}
		}
	}

	@media screen and (orientation: landscape) {
		@media (max-height: 600px) {
			section {
				gap: 1rem;
			}
		}

		@media (max-width: 1350px) {
			section {
				gap: 1rem;

				> div {
					height: 20rem;
				}
			}
		}

		@media (max-width: 1100px) {
			section {
				width: 30%;
				justify-content: space-around;
				gap: 0;

				> img {
					height: calc(100% - 31rem);
				}

				> div {
					height: 100%;
				}

				@media (max-height: 600px) {
					> img {
						display: none;
					}
				}
			}
		}

		@media (max-width: 700px) {
			section {
				display: none;
			}
		}

		@media (max-height: 450px) {
			section {
				> img {
					display: block;
				}

				> div {
					display: none;
				}
			}
		}
	}

	@media screen and (orientation: portrait) {
		section {
			width: 100%;
			height: 50%;
			flex-direction: row;
			gap: 0;

			> img {
				max-width: calc(90% - 15rem);
				max-height: 90%;
				height: 100%;
			}

			> div {
				width: 15rem;
				height: 100%;
			}
		}

		@media (max-height: 950px) {
			section {
				> img {
					max-width: 90%;
				}

				> div {
					display: none;
				}
			}
		}

		@media (max-height: 800px) {
			section {
				height: 35%;
			}
		}

		@media (max-height: 550px) {
			section {
				display: none;
			}
		}

		@media (max-width: 800px) {
			section {
				> img {
					max-width: 90%;
				}

				> div {
					display: none;
				}
			}
		}
	}
</style>
