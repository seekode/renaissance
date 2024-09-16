<script lang="ts">
	import IconPhone from '~icons/ion/phone-portrait-outline';
	import IconMap from '~icons/ion/location-outline';
	import Button from '$components/ui/Button.svelte';
	import { AppointmentStep } from '$types/appointmentTypes';

	const { setStep }: { setStep: (step: AppointmentStep) => void } = $props();
</script>

<h2>Erreur lors de la prise de rendez-vous</h2>
<p>Veuillez réessayer ou nous appelez directement</p>
<Button onclick={() => setStep(AppointmentStep.CATEGORY)}>Prendre rendez-vous</Button>
<div>
	<a href="https://renaissance-salon.fr/"><IconMap /> 19 Rue Robert Lebelle </a>
	<a href="tel:0621240684"><IconPhone /> 06 21 24 06 84 </a>
</div>

<style lang="scss">
	h2 {
		color: $danger;
	}

	p {
		margin-bottom: 2rem;
	}

	div {
		margin-top: 1rem;
		display: flex;
		gap: 2rem;

		a {
			text-decoration: none;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>
