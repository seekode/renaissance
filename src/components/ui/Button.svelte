<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		onclick?: () => void;
		shadow?: boolean;
	};

	let { children, onclick, shadow }: Props = $props();
</script>

<button {onclick} class:shadow>{@render children()}</button>

<style lang="scss">
	button {
		padding: 0.5rem 2rem;
		border: none;
		font-size: 2rem;
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		border-radius: 0.9rem;
		font-family: 'Allura', cursive;
		color: $black;
		background: $white;
		cursor: pointer;
		transition: 0.5s ease-in-out;

		&.shadow {
			box-shadow: 0 0 3rem 0.5rem rgba(33, 31, 31, 0.7);
		}

		&:before,
		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 0.9rem;
			z-index: -1;
			transition: 0.5s ease-in-out;
		}

		&:before {
			background: $white;
		}

		&:after {
			z-index: -2;
			background: $gold;
		}

		&:hover:before {
			background: transparent;
		}

		:global(img) {
			max-height: 100%;
			width: 3rem;
			object-fit: contain;
		}

		:global(span) {
			font-family: 'Allura', cursive;
			color: $black;
		}
	}
</style>
