<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Button from '$components/ui/Button.svelte';
	import Spinner from '$components/ui/Spinner.svelte';
	import { auth, type Auth } from '$lib/stores/auth';
	import api from '$lib/utils/api';
	import IconAppSharp from '~icons/ion/apps-sharp';
	import IconCalendar from '~icons/ion/calendar';
	import IconHome from '~icons/ion/home';
	import IconLogout from '~icons/ion/ios-power';

	type Profile = {
		id: number;
		email: string;
		firstname: string;
		lastname: string;
		phone: string;
	};

	// manage if user is logged in
	let isAuth: undefined | false | Auth = $state(undefined);

	// manage profile menu
	let profilesList: undefined | false | Profile[] = $state(undefined);
	let profiles = $state(false);
	const selectProfile = (profile: Profile) => {
		profiles = false;
		auth.update((value) => {
			if (!value) return value;

			return {
				...value,
				selectedProfile: profile
			};
		});
	};

	let menu = $state(false);

	auth.subscribe(async (value) => {
		// if logger not logged in, redirect to home page
		if (!browser) return;
		if (value === false) return goto('/');
		isAuth = value;

		if (!profiles && value && value.admin) {
			const response = await api.get('users/getAll');

			if (response && response.server.status === 200) {
				profilesList = response.json.data;
			}
		}
	});

	const navigate = (path: string) => {
		if (browser) goto(path);
		menu = false;
	};

	const logout = async () => {
		const response = await api.get('users/logout');
		if (response && response.server.status === 200) {
			auth.set(false);
		}
	};
</script>

<nav>
	<button onclick={() => (menu = !menu)}>
		<IconAppSharp />
	</button>
	<section class="menu" class:open={menu}>
		<div>
			<Button onclick={() => navigate('/workers')}><IconCalendar /></Button>
			<Button onclick={() => navigate('/')}><IconHome /></Button>
			<Button onclick={logout}><IconLogout /></Button>
		</div>
	</section>
	{#if isAuth && isAuth.admin}
		<button onclick={() => (profiles = !profiles)}>{isAuth.selectedProfile?.firstname}</button>
		<section class="profiles" class:open={profiles}>
			<div>
				{#if profilesList == undefined}
					<Spinner />
				{:else if profilesList == false}
					<Button onclick={() => (profiles = false)}>Aucun utilisateur</Button>
				{:else}
					{#each profilesList as profile}
						<Button width="80%" onclick={() => selectProfile(profile)}>{profile.firstname}</Button>
					{/each}
				{/if}
			</div>
		</section>
	{/if}
</nav>

<style lang="scss">
	nav {
		height: 3rem;
		padding: 0 0.5rem;
		position: fixed;
		z-index: 50;
		bottom: 0.5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		border-radius: 0.6rem;
		background: $black;

		&:before {
			content: '';
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 0.6rem;
			background: $black;
		}

		button {
			height: 100%;
			width: 100%;
			padding: 1rem;
			border: none;
			display: flex;
			justify-content: center;
			align-items: center;
			background: none;
			cursor: pointer;
			transition: 0.5s ease-in-out;

			&:hover {
				color: #f7ef8a;
			}
		}

		.menu {
			width: 100%;
			height: 100%;
			max-width: 20rem;
			max-height: 20rem;
			position: absolute;
			z-index: -2;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			border-radius: 0.6rem;
			background: $black;
			transition: 0.4s ease-in-out;
			box-shadow: $shadow;
			overflow-x: hidden;

			> div {
				width: calc(100vw - 4rem);
				height: calc(100% - 4rem);
				max-width: 50rem;
				padding: 2rem 1rem;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				justify-content: center;
				gap: 1rem;
				align-content: start;
				flex-wrap: wrap;
				transition: 0.4s ease-in-out;
				opacity: 0;
				overflow-y: scroll;
			}

			&.open {
				width: calc(100vw - 2rem);
				height: calc(100vh - 6rem);
				height: calc(100dvh - 6rem);
				bottom: calc(100% + 1rem);

				> div {
					opacity: 1;
				}
			}
		}

		.profiles {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -2;
			bottom: 0;
			left: 0;
			border-radius: 0.6rem;
			background: $black;
			transition: 0.5s ease-in-out;
			box-shadow: $shadow;

			&.open {
				height: 15rem;
			}

			> div {
				width: 100%;
				height: calc(100% - 5rem);
				padding: 1rem 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1rem;
				overflow-y: scroll;
			}
		}
	}
</style>
