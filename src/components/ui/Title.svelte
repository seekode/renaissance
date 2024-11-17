<script lang="ts">
</script>

<div class="title">
	<h1>Renaissance</h1>
	<p>Là où vous reprenez vie</p>
	<img src="images/index/line.svg" alt="Soulignement du titre" />
</div>

<style lang="scss">
	div {
		margin-bottom: 4rem;
		position: relative;
		transition: 0.5s ease-in-out;

		h1 {
			@include allura;
			@include text-gold;
			margin: 0;
			font-size: 6rem;
		}

		p {
			@include allura;
			@include text-gold;
			margin: 0;
			font-size: 2.1rem;
			position: absolute;
			top: calc(100% - 2.1rem);
			left: 23%;
		}

		img {
			width: 120%;
			position: absolute;
			top: 110%;
			left: -10%;
		}
	}

	@media screen and (orientation: landscape) {
		@media (max-width: 600px) {
			div h1 {
				font-size: 4.5rem;
			}

			div p {
				font-size: 1.7rem;
				top: calc(100% - 1.7rem);
			}
		}
	}

	@media screen and (orientation: portrait) {
		@media (max-width: 600px), (max-height: 600px) {
			div h1 {
				font-size: 4.5rem;
			}

			div p {
				font-size: 1.7rem;
				top: calc(100% - 1.7rem);
			}
		}

		@media (max-width: 400px) {
			div h1 {
				font-size: 3.5rem;
			}

			div p {
				font-size: 1.4rem;
				top: calc(100% - 1.5rem);
			}
		}
	}
</style>
