<script lang="ts">
	import ArrowLeft from '~icons/ion/arrow-left-b';
	import ArrowRight from '~icons/ion/arrow-right-b';
	import { fly } from 'svelte/transition';
	import createCalendar from './logic/calendar.svelte';
	import type { CalendarCommandsList } from '$lib/types/CalendarTypes';
	import Modal from '$components/ui/Modal.svelte';

	type Props = {
		planning: CalendarCommandsList;
	};

	const { planning }: Props = $props();

	console.log('planning');

	const calendar = createCalendar(planning);
</script>

<div class="container">
	<section>
		<div class="header">
			<span class:firstMonth={!calendar.canGoBack()}>
				<ArrowLeft onclick={() => calendar.changeMonth(-1)} />
			</span>
			<div>
				{#key calendar.currentDate}
					<h2 in:fly={{ x: calendar.next ? 50 : -50 }} out:fly={{ x: calendar.next ? -50 : 50 }}>
						{calendar.months[calendar.currentDate.getMonth()]}
						{calendar.currentDate.getFullYear()}
					</h2>
				{/key}
			</div>
			<span class:lastMonth={!calendar.canGoNext()}>
				<ArrowRight onclick={() => calendar.changeMonth(1)} />
			</span>
		</div>
		<div class="content">
			<div class="days">
				{#each calendar.days as day}
					<p>{day}</p>
				{/each}
			</div>
			{#key calendar.calendarGrid}
				<div
					class="animate"
					in:fly={{ x: calendar.next ? 200 : -200 }}
					out:fly={{ x: calendar.next ? -200 : 200 }}
				>
					{#each calendar.calendarGrid as week, idWeek}
						<div class="week">
							{#each week as day, idDay}
								<button
									class:outside={day.isOutside}
									class:unavailable={!day.available}
									class:filled={day.meet.length > 0}
									onclick={() => calendar.onSelectDate(idWeek, idDay)}
								>
									{day.date.getDate()}
								</button>
							{/each}
						</div>
					{/each}
				</div>
			{/key}
		</div>
	</section>
</div>
{#if calendar.displayModal}
	<Modal title={calendar.getDayAndMonth()} onClose={() => (calendar.displayModal = false)}>
		<div class="modal-content">
			{#each calendar.calendarGrid[calendar.selectedDay.week][calendar.selectedDay.day].meet as meet}
				<div>
					<h3>{meet.name}</h3>
					<p>{calendar.getHours(meet.date)}</p>
					<div>
						<p>{meet.firstname} {meet.lastname}</p>
						<p>{meet.phone}</p>
					</div>
				</div>
			{/each}
		</div>
	</Modal>
{/if}

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		section {
			width: 90%;
			height: 90%;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-radius: 0.6rem;
			background: $black;

			.header {
				margin: 1.5rem 0;
				display: flex;
				align-items: center;
				justify-content: center;

				:global(svg) {
					cursor: pointer;
					transition: 0.2s;

					&:hover {
						color: #f7ef8a;
					}
				}

				.firstMonth {
					:global(svg):hover {
						color: $danger;
					}
				}

				.lastMonth {
					:global(svg):hover {
						color: $danger;
					}
				}

				div {
					width: 13rem;
					height: 2rem;
					position: relative;
					overflow-x: hidden;

					h2 {
						width: 100%;
						text-align: center;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}
			}

			.content {
				width: 100%;
				flex: 1;
				position: relative;
				overflow-x: hidden;

				.days {
					width: 100%;
					height: 2rem;
					display: flex;
					justify-content: space-between;
					align-items: center;

					p {
						flex: 1;
						text-align: center;
					}
				}

				.animate {
					width: 100%;
					height: calc(100% - 2rem);
					position: absolute;
					bottom: 0;
					left: 0;
					display: flex;
					flex-direction: column;

					.week {
						display: flex;
						justify-content: space-between;
					}

					div {
						flex: 1;
						padding: 0.25rem;
						gap: 0.5rem;
						text-align: center;
						box-sizing: border-box;

						button {
							flex: 1;
							padding: 0.5rem;
							border: none;
							position: relative;
							z-index: 1;
							display: flex;
							justify-content: center;
							align-items: start;
							cursor: pointer;
							border-radius: 0.6rem;
							transition: 0.5s ease-in-out;
							background: none;

							&:before,
							&:after {
								content: '';
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								border-radius: 0.6rem;
								transition: 0.5s ease-in-out;
							}

							&:before {
								width: 98%;
								height: 98%;
								z-index: -1;
								background: $black;
							}

							&:after {
								width: 100%;
								height: 100%;
								z-index: -2;
								opacity: 0;
								background: $gold;
							}

							&:hover::after {
								opacity: 1;
							}

							&.outside {
								color: gray;
							}

							&.unavailable {
								&::after,
								&::before {
									content: '';
									width: 10%;
									height: 1px;
									background: $danger;
									z-index: 1;
								}

								&::after {
									transform: translate(-50%, -50%) rotate(45deg);
									opacity: 1;
								}

								&::before {
									transform: translate(-50%, -50%) rotate(-45deg);
								}
							}

							&.filled {
								color: $success;
							}
						}
					}
				}
			}
		}
	}

	.modal-content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		overflow-y: scroll;

		> div {
			width: calc(80% - 2rem);
			padding: 0.5rem 1rem;
			border: 1px solid $white;
			display: flex;
			flex-direction: column;
			border-radius: 0.5rem;

			> div {
				margin-top: 3rem;
			}
		}
	}

	@media (max-width: 800px) {
		.container section {
			width: 95%;
			height: 95%;
		}
	}

	@media (max-width: 700px) {
		.container section {
			width: 100%;
			height: 100%;
		}
	}

	@media (max-width: 500px) {
		.container section .content .animate div button.unavailable {
			&::after,
			&::before {
				width: 0.5rem;
			}
		}
	}

	@media (max-height: 650px) {
		.container section .content .animate div button.unavailable {
			&::after,
			&::before {
				position: absolute;
				top: 2rem;
			}

			&::after {
				transform: translateX(-50%) rotate(45deg);
			}

			&::before {
				transform: translateX(-50%) rotate(-45deg);
			}
		}
	}

	@media (max-height: 423px) {
		.container section {
			width: 100%;
			height: 100%;

			.header {
				margin: 0;
			}

			.content {
				.days {
					display: none;
				}

				.animate {
					height: 100%;
				}
			}
		}
	}
</style>
