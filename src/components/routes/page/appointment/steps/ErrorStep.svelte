<script lang="ts">
	import IconPhone from '~icons/ion/phone-portrait-outline';
	import IconMap from '~icons/ion/location-outline';
	import Button from '$components/ui/Button.svelte';
	import { AppointmentStep } from '$lib/types/appointmentTypes';

	const { restart }: { restart: () => void } = $props();
</script>

<h2>Erreur lors de la prise de rendez-vous</h2>
<p>Veuillez réessayer ou nous appelez directement</p>
<Button onclick={restart}>Prendre rendez-vous</Button>
<div>
	<a href="https://maps.app.goo.gl/8UZDFUC6t2Kt5gEF6"
		><IconMap />40 avenue Sainte marguerite 06200</a
	>
	<a href="tel:0686245170"><IconPhone />06.86.24.51.70</a>
</div>

<style lang="scss">
	h2 {
		color: $danger;
		text-align: center;
	}

	p {
		margin-bottom: 2rem;
		text-align: center;
	}

	div {
		margin-top: 2rem;
		display: flex;
		gap: 1rem;

		a {
			text-decoration: none;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	@media screen and (max-width: 500px) {
		div {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
