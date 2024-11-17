<script lang="ts">
	import Button from '$components/ui/Button.svelte';

	type Props = {
		cancel: () => void;
	};

	const { cancel }: Props = $props();
</script>

<section>
	<h2>Votre rendez-vous est confirmé !</h2>
	<Button onclick={cancel}>Retourner au menu</Button>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
</style>
