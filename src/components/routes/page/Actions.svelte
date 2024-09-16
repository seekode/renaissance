<script lang="ts">
	import IconPhone from '~icons/ion/phone-portrait-outline';
	import IconMap from '~icons/ion/location-outline';

	import Button from '$components/ui/Button.svelte';

	const { startAppointment }: { startAppointment: () => void } = $props();
</script>

<div class="actions">
	<Button onclick={startAppointment}>Prendre rendez-vous</Button>
	<div>
		<a href="https://renaissance-salon.fr/"><IconMap /> 19 Rue Robert Lebelle </a>
		<a href="tel:0621240684"><IconPhone /> 06 21 24 06 84 </a>
	</div>
</div>

<style lang="scss" scoped>
	.actions {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10rem;

		div {
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
