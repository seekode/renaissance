<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	type Props = {
		title?: string;
		children?: Snippet;
		footer?: Snippet;
		onClose?: () => void;
		width?: string;
	};

	const { title, children, footer, onClose, width }: Props = $props();
</script>

<button transition:fade class="close" onclick={onClose} aria-label="Fermer la fenêtre modale">
</button>
<section style={width ? `width: ${width}` : ''} transition:fly={{ y: 100, duration: 500 }}>
	{#if title}
		<div>
			<h2>{title}</h2>
		</div>
	{/if}
	{#if children}
		<div class="content" class:title class:footer>{@render children()}</div>
	{/if}
	{#if footer}
		<div>{@render footer()}</div>
	{/if}
</section>

<style lang="scss">
	button.close {
		width: 100vw;
		height: 100vh;
		height: 100dvh;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.25);
		border: none;
		cursor: pointer;
	}

	section {
		min-width: 15rem;
		max-width: calc(90vw - 4rem);
		min-height: 10rem;
		max-height: 60vh;
		max-height: 60dvh;
		padding: 2rem;
		position: fixed;
		z-index: 1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		border-radius: 0.6rem;
		background: $black;
		box-shadow: $shadow;

		div {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;

			h2 {
				@include allura;
				@include text-gold;
				font-size: 3rem;
			}

			&.content {
				flex: 1;
				flex-direction: column;
				overflow: hidden;

				&.title {
					padding-top: 2rem;
				}

				&.footer {
					padding-bottom: 2rem;
				}
			}
		}
	}

	@media screen and (max-height: 850px) {
		section {
			min-height: 80vh;
		}
	}

	@media screen and (max-height: 600px) {
		section {
			padding: 1rem;

			div h2 {
				font-size: 2rem;
			}
		}
	}
</style>
