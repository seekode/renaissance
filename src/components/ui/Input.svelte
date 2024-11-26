<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	type Props = {
		children?: Snippet;
		value?: string;
		name: string;
		error?: string;
		oninput?: () => void;
		type?: HTMLInputTypeAttribute;
	};

	let { children, value = $bindable(''), name, error, oninput, type }: Props = $props();
</script>

<div class="input">
	<label for={name}>{name} :</label>
	<div>
		{#if children}
			{@render children()}
		{/if}
		<input bind:value {oninput} {type} id={name} {name} placeholder={name} />
	</div>
	{#if error}
		<small transition:fly={{ y: -15, duration: 500 }}>{error}</small>
	{/if}
</div>

<style lang="scss">
	.input {
		padding-bottom: 1.3rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		position: relative;

		div {
			min-width: 16rem;
			padding: 0.3rem;
			border: 1px solid $white;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			border-radius: 0.3rem;
			transition: 0.5s ease-in-out;
			background: $black;

			&:focus-within {
				color: #f7ef8a;
				border: 1px solid #f7ef8a;
			}

			input {
				border: none;
				flex: 1;
				background: none;
				color: $white;

				&:focus {
					outline: none;
				}
			}
		}

		small {
			position: absolute;
			z-index: -10;
			top: calc(100% - 1rem);
			color: $danger;
		}
	}
</style>
