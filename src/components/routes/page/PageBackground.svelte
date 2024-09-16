<script lang="ts">
	import home from '$lib/images/index/home.png';
	import coiffure from '$lib/images/categories_logo/coiffure.svg';
	import massage from '$lib/images/categories_logo/massage.svg';
	import manucure from '$lib/images/categories_logo/manucure.png';
	import esthetique from '$lib/images/categories_logo/esthetique.svg';
	import epilation from '$lib/images/categories_logo/epilation.svg';
	import forfait from '$lib/images/categories_logo/forfait.svg';

	import Button from '$components/ui/Button.svelte';

	const buttons = [
		{ img: coiffure, text: 'Coiffure' },
		{ img: massage, text: 'Massage' },
		{ img: manucure, text: 'Manucure' },
		{ img: esthetique, text: 'Esthétique' },
		{ img: epilation, text: 'Épilation' },
		{ img: forfait, text: 'Forfait' }
	];
</script>

<section>
	<img src={home} alt="Home" />
	<div>
		{#each buttons as button}
			<Button>
				<img src={button.img} alt={button.text} />
				{button.text}
			</Button>
		{/each}
	</div>
</section>

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
			height: 100%;
			max-width: 90%;
			margin: 1rem;
			object-fit: contain;
			object-position: center;
		}

		div {
			width: 90%;
			height: 20rem;
			max-width: 50rem;
			margin: 1rem;
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
				justify-content: start;
				gap: 0.5rem;
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
				max-height: 90%;
			}

			> div {
				width: 15rem;
				height: 100%;
			}
		}

		@media (max-height: 950px) {
			section > div {
				display: none;
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
			section > div {
				display: none;
			}
		}
	}
</style>
