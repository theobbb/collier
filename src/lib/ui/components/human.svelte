<script lang="ts">
	import type { Human } from '$lib/data.svelte';

	const { human, name }: { human: Human; name?: boolean } = $props();
</script>

<div class="flex items-center gap-2.5">
	<div
		class="flex size-6 items-center justify-center rounded-full"
		style="background-color: {human.color};"
	>
		<div class="text-xs font-medium uppercase">{human.name[0]}</div>
	</div>
	{#if name}
		<div>{human.name}</div>
	{/if}
</div>
