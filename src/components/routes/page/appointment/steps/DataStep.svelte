<script lang="ts">
	import Button from '$components/ui/Button.svelte';
	import Input from '$components/ui/Input.svelte';
	import IconAccount from '~icons/ion/person';
	import IconPhone from '~icons/ion/ios-call';
	import { AppointmentStep } from '$lib/types/appointmentTypes';
	import toast from '$lib/stores/toasts';
	import { ToastType } from '$lib/types/toastType';

	type Props = {
		setData: (firstname: string, lastname: string, phone: string) => void;
		setStep: (step: AppointmentStep) => void;
	};

	const { setData, setStep }: Props = $props();

	let firstname = $state('');
	let lastname = $state('');
	let phone = $state('');

	let firstnameError = $derived.by(() => {
		if (firstname.length == 0) return;
		if (firstname.length < 3) return 'Minimum 3 caractères';
		if (firstname.length > 50) return 'Maximum 50 caractères';
	});

	let lastnameError = $derived.by(() => {
		if (lastname.length == 0) return;
		if (lastname.length < 3) return 'Minimum 3 caractères';
		if (lastname.length > 50) return 'Maximum 50 caractères';
	});

	const nameFormat = (value: string) => {
		let result = value.toLowerCase();
		result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
		result = result.replaceAll(/[0-9 ]/g, '');
		return result;
	};

	const firstnameFormat = () => {
		let value = firstname;
		firstname = nameFormat(value);
	};

	const lastnameFormat = () => {
		let value = lastname;
		lastname = nameFormat(value);
	};

	const phoneFormat = () => {
		let value = phone.replaceAll(/\D/g, '');
		const result = [];
		for (let i = 0; i < value.length; i += 2) {
			result.push(value.substring(i, i + 2));
		}
		phone = result.join('.');
	};

	const onsubmit = (e: Event) => {
		e.preventDefault();
		if (!firstname || !lastname || !phone)
			return toast({
				message: 'Veuillez remplir tous les champs',
				type: ToastType.ERROR
			});

		if (firstnameError || lastnameError)
			return toast({
				message: 'Veuillez corriger tous les champs',
				type: ToastType.ERROR
			});

		setData(firstname, lastname, phone);
		setStep(AppointmentStep.SUMMARY);
	};
</script>

<div class="container">
	<h2>Vos informations</h2>
	<form {onsubmit}>
		<Input bind:value={firstname} oninput={firstnameFormat} name="Prénom" error={firstnameError}>
			<IconAccount />
		</Input>
		<Input bind:value={lastname} oninput={lastnameFormat} name="Nom" error={lastnameError}>
			<IconAccount />
		</Input>
		<Input bind:value={phone} oninput={phoneFormat} name="Téléphone">
			<IconPhone />
		</Input>
		<div>
			<Button>Valider</Button>
		</div>
	</form>
</div>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;

		form {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;

			div {
				align-self: flex-end;
			}
		}
	}
</style>
