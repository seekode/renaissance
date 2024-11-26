<script lang="ts">
	import Seo from '$components/layouts/Seo.svelte';
	import Toast from '$components/layouts/Toast.svelte';
	import Spinner from '$components/ui/Spinner.svelte';
	import { auth, type Auth } from '$lib/stores/auth';
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	type Props = {
		children: Snippet;
		data: { url: string };
	};

	const { children, data }: Props = $props();

	let isAuth: undefined | false | Auth = $state(undefined);

	auth.subscribe((value) => (isAuth = value));
</script>

<Seo />
<Toast />
{#if typeof isAuth === 'undefined'}
	<section transition:fade={{ duration: 500 }}>
		<Spinner />
	</section>
{:else}
	{#key data.url}
		<main in:fly={{ x: -200, duration: 1000 }} out:fly={{ x: 200, duration: 1000 }}>
			{@render children()}
		</main>
	{/key}
{/if}

<style lang="scss">
	section {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center;
		background: $black;
	}

	main {
		width: 100vw;
		height: 100vh;
		height: 100dvh;
		position: absolute;
		top: 0;
		left: 0;
		overflow-x: hidden;
	}
</style>
