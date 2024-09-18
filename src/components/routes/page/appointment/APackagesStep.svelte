<script lang="ts">
	import IconTime from '~icons/ion/time-outline';
	import type { ActivitiesList } from '$types/appointmentTypes';

	const { activitiesList }: { activitiesList: ActivitiesList } = $props();

	let activitiesSections = $state(Array(Object.keys(activitiesList).length).fill(false));
	let cancelAnimation = false;

	$effect(() => {
		activitiesSections.forEach((_, index) => {
			setTimeout(() => {
				if (cancelAnimation) return;
				activitiesSections[index] = true;
			}, index * 200);
		});
	});

	const onclick = (categoryIndex: number) => {
		cancelAnimation = true;
		activitiesSections.forEach((_, index) => {
			setTimeout(() => {
				if (index === activitiesSections.length - 1) {
					// setTimeout(() => setStep(AppointmentStep.ACTIVITY), 500);
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
					<button onclick={() => onclick(index)}>
						<li>
							<p>{activitie.name}</p>
							<div>
								<span
									>{activitie.duration}
									<IconTime />
								</span>
							</div>
						</li>
					</button>
				{/each}
			</ul>
		</div>
	{/each}
</div>

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
			@include allura;
			@include text-gold;
			font-size: 4rem;
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
</style>
