<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="grid grid-cols-12 gap-0.5">
	{@render children()}
</div>
