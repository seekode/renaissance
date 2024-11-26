<script lang="ts">
	import IconPhone from '~icons/ion/phone-portrait-outline';
	import IconMap from '~icons/ion/location-outline';
	import Button from '$components/ui/Button.svelte';
	import type { Category } from '$lib/types/appointmentTypes';
	import Spinner from '$components/ui/Spinner.svelte';
	import { fade } from 'svelte/transition';

	type Props = {
		startAppointment: () => void;
		categories: null | Category[];
	};

	const { startAppointment, categories }: Props = $props();
</script>

<div class="actions">
	<div>
		<Button onclick={startAppointment} custom>Prendre rendez-vous</Button>
		{#if !categories}
			<div class="loadCat" transition:fade>
				<Spinner />
			</div>
		{/if}
	</div>
	<div>
		<a href="https://maps.app.goo.gl/8UZDFUC6t2Kt5gEF6"
			><IconMap />40 avenue Sainte marguerite 06200</a
		>
		<a href="tel:0686245170"><IconPhone />06.86.24.51.70</a>
	</div>
</div>

<style lang="scss" scoped>
	.actions {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		gap: 10rem;

		.loadCat {
			width: 100%;
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			background: $black;
		}

		> div {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 3rem;

			a {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				text-decoration: none;
				color: $white;
				transition: 0.3s ease-in-out;

				&:hover {
					@include text-gold;
				}
			}
		}
	}

	@media screen and (orientation: landscape) {
		@media (max-height: 700px) {
			.actions {
				gap: 5rem;
			}
		}

		@media (max-height: 450px) {
			.actions {
				padding-bottom: 1rem;

				div {
					display: none;
				}
			}
		}
	}

	@media screen and (orientation: portrait) {
		.actions {
			gap: 5rem;
		}

		@media (max-height: 800px) {
			.actions {
				gap: 3rem;
			}
		}

		@media (max-width: 400px) {
			.actions div {
				gap: 1rem;
			}
		}

		@media (max-width: 350px) {
			.actions div {
				flex-direction: column;
			}
		}
	}
</style>
