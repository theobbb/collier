<script lang="ts">
	import type { Human } from '$lib/data.svelte';

	const { human, name }: { human: Human; name?: boolean } = $props();
</script>

<div class="flex items-center gap-2.5">
	<div
		class="corner flex size-6 items-center justify-center"
		style="background-color: {human.color};"
	>
		<!-- <div class="icon-[ri--user-line] text-sm text-white"></div> -->
		<div class="text-sm font-medium text-white/80 uppercase">
			{human.name[0]}
		</div>
	</div>
	{#if name}
		<div>{human.name}</div>
	{/if}
</div>
