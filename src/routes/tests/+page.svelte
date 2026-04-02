<script>
	import CodeQr from '$lib/ui/components/code-qr.svelte';

	const tests = [
		{ name: 'Onboarding', url: 'https://collier.3xw.ca/onboarding/0' },
		{ name: 'Chiens toggle', url: 'https://collier.3xw.ca/tests/chiens' }
	];
</script>

<div class="space-y-4x">
	{#each tests as { name, url }}
		<div>
			<div>{name}</div>

			<CodeQr value={url} />
		</div>
	{/each}
</div>
