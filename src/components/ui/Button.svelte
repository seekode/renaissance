<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		onclick?: () => void;
		disabled?: boolean;
		custom?: boolean;
		danger?: boolean;
		button?: boolean;
		width?: string;
		link?: string;
	};

	let {
		children,
		onclick,
		disabled = false,
		custom = false,
		danger = false,
		button = false,
		link,
		width
	}: Props = $props();
</script>

{#if link}
	<a
		class:disabled
		class:custom
		style:width
		class:danger
		type={button ? 'button' : 'submit'}
		href={link}
	>
		{@render children()}
	</a>
{:else}
	<button
		{onclick}
		class:disabled
		class:custom
		style:width
		class:danger
		type={button ? 'button' : 'submit'}
	>
		{@render children()}
	</button>
{/if}

<style lang="scss">
	button,
	a {
		padding: 0.2rem 0.8rem;
		border: none;
		font-size: 1.5rem;
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		border-radius: 0.5rem;
		font-family: $allura;
		color: $black;
		background: $white;
		cursor: pointer;
		text-decoration: none;
		transition: 0.5s ease-in-out;

		&.disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		&.disabled:before,
		&.disabled:after {
			display: none;
		}

		&:before,
		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 0.5rem;
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
			font-family: $allura;
			color: $black;
		}

		&.danger {
			background: $danger;

			&:before {
				background: $danger;
			}
		}

		&.custom {
			font-size: 2rem;
			padding: 0.5rem 2rem;
			border-radius: 0.9rem;

			&:before,
			&:after {
				border-radius: 0.9rem;
			}
		}
	}
</style>
