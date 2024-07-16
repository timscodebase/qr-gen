<script lang="ts">
	const { children } = $props();
</script>

<header>
	<div class="container">
		<div class="logo">QR Code Generator</div>
	</div>
</header>

<main>
	<div class="container">
		{@render children()}
	</div>
</main>

<footer>
	<div class="container">
		<div class="logo">QR Code Generator</div>
		<div class="copyright">Copyright © 2023 - {new Date().getFullYear()}</div>
		<div class="version">v0.0.1</div>
	</div>
</footer>

<style>
	header,
	footer {
		padding: 1rem;

		.container {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
