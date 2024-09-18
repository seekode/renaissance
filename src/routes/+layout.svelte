<script lang="ts">
	import Seo from '$components/layouts/Seo.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();
</script>

<Seo />
{@render children()}
