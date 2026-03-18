<script lang="ts">
	import type { Snippet } from 'svelte';

	const { label, children }: { label: string; children: Snippet } = $props();
</script>

<div>
	<div class="mx-2x text-sm font-medium text-muted">
		{label}
	</div>
	<div class="card my-1 flex flex-col divide-y">{@render children()}</div>
</div>
