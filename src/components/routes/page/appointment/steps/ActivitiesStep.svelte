<script lang="ts">
	import IconTime from '~icons/ion/time-outline';
	import {
		AppointmentStep,
		type ActivitiesList,
		type Activity,
		type Tarifs
	} from '$lib/types/appointmentTypes';
	import Modal from '$components/ui/Modal.svelte';
	import Button from '$components/ui/Button.svelte';

	type Props = {
		activitiesList: ActivitiesList;
		tarifsList: Tarifs[];
		setActivity: (activity: Activity) => void;
		setStep: (step: AppointmentStep) => void;
	};

	const { tarifsList, activitiesList, setActivity, setStep }: Props = $props();

	let activitiesSections = $state(Array(Object.keys(activitiesList).length + 1).fill(false));

	let cancelAnimation = false;

	let moreOptions = $state(false);

	let needCallModal = $state(false);

	$effect(() => {
		activitiesSections.forEach((_, index) => {
			setTimeout(() => {
				if (cancelAnimation) return;
				activitiesSections[index] = true;
			}, index * 200);
		});
	});

	const onclick = (activity: Activity) => {
		if (activity.need_call) return (needCallModal = true);

		cancelAnimation = true;
		setActivity(activity);

		activitiesSections.forEach((_, index) => {
			setTimeout(() => {
				if (index === activitiesSections.length - 1) {
					setTimeout(() => setStep(AppointmentStep.MAKER), 500);
				}
				activitiesSections[activitiesSections.length - 1 - index] = false;
			}, index * 200);
		});
	};
</script>

<div class="container">
	{#each Object.entries(activitiesList) as [key, activities], index}
		<div class:is-visible={activitiesSections[index]}>
			<h2>{key}</h2>
			<ul>
				{#each activities as activitie}
					{@const hours = Math.floor(activitie.duration / 60)}
					{@const minutes = activitie.duration % 60}
					<button onclick={() => onclick(activitie)}>
						<li>
							<p>{activitie.name}</p>
							{#if hours > 0 || minutes}
								<div>
									<span>
										{#if hours > 0}
											{hours}h
										{/if}
										{#if minutes}
											{minutes}min
										{/if}
										<IconTime />
									</span>
								</div>
							{/if}
						</li>
					</button>
				{/each}
			</ul>
		</div>
	{/each}
	{#if tarifsList.length > 0}
		<div class:is-visible={activitiesSections[activitiesSections.length - 1]}>
			<h2>Tarifs</h2>
			<ul>
				<button onclick={() => (moreOptions = true)}>
					<li>
						<p>Tarifs</p>
					</li>
				</button>
			</ul>
		</div>
	{/if}
</div>
{#if moreOptions}
	<Modal title="Tarifs" width="40rem" onClose={() => (moreOptions = false)}>
		<ul class="modal-content">
			<li class="modal-header">
				<p>Préstation</p>
				<p>Prix</p>
			</li>
			{#each tarifsList as tarif}
				<li class="modal-body">
					<p>{tarif.name}</p>
					<p>{tarif.price}€</p>
				</li>
			{/each}
		</ul>
		{#snippet footer()}
			<Button danger onclick={() => (moreOptions = false)}>Fermer</Button>
			<Button link="tel:06.86.24.51.70">Appeler</Button>
		{/snippet}
	</Modal>
{/if}
{#if needCallModal}
	<Modal title="Appel" onClose={() => (needCallModal = false)}>
		<p style="text-align: center;">Ce type de rendez-vous nécessite un appel.</p>
		<Button link="tel:06.86.24.51.70">Appeler</Button>
	</Modal>
{/if}

<style lang="scss">
	.container {
		width: 100%;
		flex: 1;
		padding-bottom: 4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
		overflow-y: scroll;

		h2 {
			padding: 0 1rem;
			@include allura;
			@include text-gold;
			font-size: 3.5rem;
			margin-bottom: 1rem;
		}

		> div {
			display: flex;
			flex-direction: column;
			align-items: center;
			opacity: 0;
			transform: translateY(3rem);
			visibility: hidden;
			transition: 0.5s ease-in-out;

			&.is-visible {
				opacity: 1;
				transform: translateY(0);
				visibility: visible;
			}

			> ul {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				gap: 2rem;
				list-style: none;

				> button {
					background: none;
					border: none;
					transition: 0.5s ease-in-out;

					&:hover {
						transform: scale(1.01);
						box-shadow: $shadow;
					}

					> li {
						@include text-bg;
						width: 20rem;
						max-width: 87vw;
						position: relative;
						display: flex;
						flex-direction: column;
						align-items: center;
						border: 1px solid $white;
						border-radius: 0.6rem;
						cursor: pointer;

						p {
							padding: 1rem 0;
						}

						div {
							width: calc(100% - 1rem);
							padding: 0.5rem;
							display: flex;
							align-items: center;
							justify-content: end;
							border-top: 1px solid $white;
						}

						span {
							display: flex;
							align-items: center;
							gap: 0.5rem;
						}
					}
				}
			}
		}
	}

	.modal-content {
		height: 100%;
		width: 90%;
		border: 1px solid $white;
		border-radius: 0.6rem;
		list-style: none;
		overflow-y: scroll;

		li {
			border-top: 1px solid $white;
			display: flex;
			align-items: center;
			justify-content: space-between;

			p {
				min-height: 2.5rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			p:nth-child(1) {
				width: calc(100% - 7rem);
				border-right: 1px solid $white;
			}

			p:nth-child(2) {
				width: 7rem;
			}

			&.modal-header {
				border-top: none;
			}

			&.modal-body {
				p:nth-child(1) {
					width: calc(100% - 9rem);
					padding: 0.5rem 1rem;
					justify-content: start;
				}
			}
		}
	}

	@media screen and (max-width: 500px) {
		.modal-content {
			width: calc(100% - 2px);
		}
	}
</style>
