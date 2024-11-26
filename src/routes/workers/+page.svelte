<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Calendar from '$components/routes/worker/Calendar/Calendar.svelte';
	import { auth, type Auth } from '$lib/stores/auth';
	import { fade } from 'svelte/transition';
	import api from '$lib/utils/api';
	import type { CalendarCommandsList } from '$lib/types/CalendarTypes';

	let isAuth: undefined | false | Auth = $state(undefined);
	let planning: CalendarCommandsList | undefined = $state(undefined);

	const loadPlanning = async () => {
		if (!isAuth) return;

		const response = await api.get('users/planning', [isAuth.selectedProfile.id.toString()]);

		if (response && response.server.status === 200) {
			planning = response.json.data.map((item: { [key: string]: string | number }) => ({
				...item,
				date: new Date(item.date)
			}));
		}
	};

	auth.subscribe((value) => {
		isAuth = value;
		loadPlanning();
	});
</script>

{#if isAuth && planning}
	{#key planning}
		<section in:fade={{ duration: 500 }}>
			<Calendar {planning} />
		</section>
	{/key}
{/if}
<nav></nav>

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
