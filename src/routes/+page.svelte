<script lang="ts">
	import { enhance } from '$app/forms';

	let bg_color = $state('#ffffff' as string);
	let fg_color = $state('#000000' as string);
	let content = $state('' as string);
	let svg = $state('' as string);
	let url = $state('' as string);

	const params = $derived({ bg_color, fg_color, content });

	const handleSubmit = async () => {
		const res = await fetch('/api/gen_qr', {
			method: 'POST',
			body: new URLSearchParams(params),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});
		const { svg: newSvg, url: newUrl } = await res.json();
		svg = newSvg;
		url = newUrl;
	};
</script>

<form method="POST" use:enhance={handleSubmit}>
	<label>
		<span>URL</span>
		<input name="content" type="text" bind:value={content} />
	</label>

	<label>
		<span>Background Color</span>
		<input name="bg_color" type="color" bind:value={bg_color} />
	</label>

	<label>
		<span>Foreground Color</span>
		<input name="fg_color" type="color" bind:value={fg_color} />
	</label>
	<button type="submit">Generate QR Code</button>
</form>

<div class="results">
	{#if svg}
		<div class="qr_code_wrapper">
			{@html svg}
		</div>
	{/if}

	{#if url}
		<div class="content">
			<a href={url} target="_blank">{url}</a>
		</div>
	{/if}
</div>

<style>
	.results {
		display: grid;
		grid-template-columns: 1fr 1fr;
		place-content: center;
		gap: 1rem;
	}

	.content,
	.qr_code_wrapper {
		max-width: 25svw;
		max-height: 25svw;
	}
</style>
