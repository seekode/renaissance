<script lang="ts">
	import { toasts } from '$lib/stores/toasts';
	import { type ToastProps } from '$lib/types/toastType';
	import { fly } from 'svelte/transition';

	let toastList: ToastProps[] = $state([]);

	toasts.subscribe((value) => {
		toastList = value;
	});
</script>

<section>
	{#each toastList as toast}
		<div
			transition:fly={{ y: -30, duration: 500 }}
			class="toast {toast.type ? toast.type : 'info'}"
		>
			{toast.message}
		</div>
	{/each}
</section>

<style lang="scss">
	section {
		width: 100%;
		position: fixed;
		z-index: 10;
		top: 0;
		left: 50%;
		transform: translateX(-50%);

		.toast {
			padding: 1rem;
			position: absolute;
			top: 1rem;
			right: 50%;
			transform: translateX(50%);
			background-color: $black;
			color: var(--color-text);
			border-radius: 0.6rem;
			box-shadow: $shadow;

			&.info {
				border: 1px solid #ae8625;
			}

			&.success {
				border: 1px solid $success;
			}

			&.error {
				border: 1px solid $danger;
			}
		}
	}
</style>
