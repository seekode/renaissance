<script lang="ts">
	import Seo from '$components/layouts/Seo.svelte';
	import Toast from '$components/layouts/Toast.svelte';
	import { toasts } from '$lib/stores/toasts';
	import type { ToastProps } from '$lib/types/toastType';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<Seo />
<Toast />
{@render children()}
