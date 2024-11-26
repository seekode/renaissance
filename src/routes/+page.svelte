<script lang="ts">
	import { goto } from '$app/navigation';
	import Actions from '$components/routes/page/Actions.svelte';
	import Appointment from '$components/routes/page/Appointment/Appointment.svelte';
	import PageBackground from '$components/routes/page/PageBackground.svelte';
	import Button from '$components/ui/Button.svelte';
	import Input from '$components/ui/Input.svelte';
	import Modal from '$components/ui/Modal.svelte';
	import Title from '$components/ui/Title.svelte';
	import { auth, type Auth } from '$lib/stores/auth';
	import toast from '$lib/stores/toasts';
	import type { Category } from '$lib/types/appointmentTypes';
	import { ToastType } from '$lib/types/toastType';
	import api from '$lib/utils/api';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let active = $state(false);

	let categories: null | Category[] = $state(null);
	let selectedCategory: null | Category = $state(null);

	let logModal = $state(false);
	let emailError: string | undefined = $state(undefined);
	let email = $state('');
	let passwordError: string | undefined = $state(undefined);
	let password = $state('');

	const onsubmit = async (e: Event) => {
		e.preventDefault();

		const response = await api.post('users/login', [], {
			email: email,
			password: password
		});

		if (response && response.server.status === 200) {
			auth.set({
				...response.json.data,
				selectedProfile: {
					id: response.json.data.id,
					email: response.json.data.email,
					firstname: response.json.data.firstname,
					lastname: response.json.data.lastname,
					phone: response.json.data.phone
				}
			});
			goto(`/workers`);
			toast({
				message: 'Connexion réussie',
				type: ToastType.SUCCESS
			});
		} else {
			if (response && response.json.data) {
				emailError = response.json.data.email ? response.json.data.email.message : undefined;
				passwordError = response.json.data.password
					? response.json.data.password.message
					: undefined;
			} else {
				emailError = undefined;
				passwordError = undefined;
			}

			toast({
				message: 'Connexion échouée',
				type: ToastType.ERROR
			});
		}
	};

	const selectCategory = (category: Category) => {
		selectedCategory = category;
		active = true;
		setTimeout(() => {
			selectedCategory = null;
		}, 100);
	};

	onMount(() => {
		api.get('categories/all').then((response) => {
			if (!response || response.server.status !== 200) {
				return;
			}

			categories = response.json.data;
		});
	});

	let isAuth: undefined | false | Auth = $state(undefined);

	auth.subscribe((value) => (isAuth = value));
</script>

<main class:active>
	{#if !active}
		<div transition:fly={{ y: -100, duration: 500, delay: 500 }}>
			<Title />
		</div>
	{/if}
	{#if active && categories}
		<div class="appointment" in:fade={{ duration: 500, delay: 500 }} out:fade={{ duration: 500 }}>
			<Appointment
				{selectedCategory}
				{categories}
				cancel={() => (active = false)}
				openLogModal={() => {
					if (isAuth) {
						goto(`/workers`);
					} else {
						logModal = true;
					}
				}}
			/>
		</div>
	{/if}
	{#if !active}
		<div transition:fly={{ y: 100, duration: 500, delay: 500 }}>
			<Actions startAppointment={() => (active = true)} {categories} />
		</div>
	{/if}
</main>
<PageBackground {selectCategory} {categories} />
{#if logModal}
	<Modal title="Connexion" onClose={() => (logModal = false)} customPadding="1rem">
		<form class="modal-content" {onsubmit}>
			<Input bind:value={email} error={emailError} name="Email"></Input>
			<Input bind:value={password} error={passwordError} name="Password" type="password"></Input>
			<div>
				<Button danger onclick={() => (logModal = false)} button>Annuler</Button>
				<Button>Se connecter</Button>
			</div>
		</form>
	</Modal>
{/if}

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
			width: calc(100% - 2rem);
			height: calc(100% - 2rem);
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

	.modal-content {
		max-width: 100%;
		display: flex;
		flex-direction: column;

		> div {
			margin-top: 1rem;
			display: flex;
			justify-content: center;
			gap: 1rem;
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
