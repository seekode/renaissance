<script lang="ts">
	import Actions from '$components/routes/page/Actions.svelte';
	import Appointment from '$components/routes/page/appointment/Appointment.svelte';
	import PageBackground from '$components/routes/page/PageBackground.svelte';
	import Title from '$components/ui/Title.svelte';
	import { fade, fly } from 'svelte/transition';

	let active = false;
</script>

<main class:active>
	{#if !active}
		<div transition:fly={{ y: -100, duration: 500, delay: 500 }}>
			<Title />
		</div>
	{/if}
	{#if active}
		<div class="appointment" in:fade={{ duration: 500, delay: 500 }} out:fade={{ duration: 500 }}>
			<Appointment cancel={() => (active = false)} />
		</div>
	{/if}
	{#if !active}
		<div transition:fly={{ y: 100, duration: 500, delay: 500 }}>
			<Actions startAppointment={() => (active = true)} />
		</div>
	{/if}
</main>
<PageBackground />

<style lang="scss">
	main {
		width: calc(45% - 2rem);
		height: calc(100% - 2rem);
		padding: 1rem;
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		border-radius: 0 1.5rem 1.5rem 0;
		background: $black;
		box-shadow: 0 0 3.5rem 2rem rgba(0, 0, 0, 0.7);
		transition: 0.5s ease-in-out;

		&.active {
			width: 100%;
			height: 100%;
			padding: 0;
			border-radius: 0;
		}

		.appointment {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0rem;
			bottom: 0rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}

	@media screen and (orientation: landscape) {
		@media (max-width: 1100px) {
			main {
				width: calc(70% - 2rem);
			}
		}

		@media (max-width: 700px) {
			main {
				width: calc(100% - 2rem);
			}
		}
	}

	@media screen and (orientation: portrait) {
		main {
			width: calc(100% - 2rem);
			height: calc(50% - 2rem);
			position: absolute;
			top: auto;
			bottom: 0;
			border-radius: 1.5rem 1.5rem 0 0;
		}

		@media (max-height: 800px) {
			main {
				height: calc(65% - 2rem);
			}
		}

		@media (max-height: 550px) {
			main {
				height: calc(100% - 2rem);
			}
		}
	}
</style>
