<script lang="ts">
	import Nav from '$components/routes/worker/Nav.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();
</script>

<section>
	{@render children()}
</section>
<Nav />

<style lang="scss">
	section {
		width: 100%;
		height: calc(100% - 4rem);
		height: calc(100dvh - 4rem);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
