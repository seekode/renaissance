<script lang="ts">
	import Button from '$components/ui/Button.svelte';
	import type { AppointmentData } from '$lib/types/appointmentTypes';

	type Props = {
		appoitment: AppointmentData;
		restart: () => void;
		submit: () => void;
	};

	const { appoitment, restart, submit }: Props = $props();

	const months = [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre'
	];
	const days = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'];
</script>

<section>
	<div class="summary">
		<h2>{appoitment.activity?.name}</h2>
		<p>
			{days[appoitment.date!.getDay()]}
			{appoitment.date!.getDate()}
			{months[appoitment.date!.getMonth()]}
			{appoitment.date!.getFullYear()}
		</p>
		<p>{appoitment.maker?.firstname} {appoitment.maker?.lastname}</p>
		<div>
			<b>Reservé par :</b>
			<p>{appoitment.data?.firstname} {appoitment.data?.lastname}</p>
			<p>{appoitment.data?.phone}</p>
		</div>
	</div>
	<div class="actions">
		<button onclick={restart}>Recommencer</button>
		<Button onclick={submit}>Confirmer</Button>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;

		.summary {
			width: 30rem;
			max-width: calc(95vw - 4rem);
			padding: 1rem 2rem;
			border: 1px solid $success;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			border-radius: 0.5rem;

			h2 {
				@include allura;
				@include text-gold;
				font-size: 2rem;
			}

			div {
				margin-top: 5rem;
				align-self: flex-start;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}
		}

		.actions {
			display: flex;
			gap: 2rem;

			button {
				color: $danger;
				border: none;
				background: none;
				cursor: pointer;
			}
		}
	}
</style>
