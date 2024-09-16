<div>
	<div class="spinner">
		<div></div>
	</div>
</div>

<style lang="scss">
	div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.spinner {
			width: 4rem;
			height: 4rem;
			position: relative;
			border-radius: 50rem;
			background: $gold;
			animation: spin 2s linear infinite;

			div {
				width: 102%;
				height: 98%;
				position: absolute;
				bottom: -1%;
				left: -1%;
				border-radius: 50rem;
				background: $black;
			}
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
