<script lang="ts">
	import type { Snippet } from 'svelte';

	const { icon, children }: { icon?: string; children: Snippet } = $props();
</script>

<div class="flex items-center gap-2x text-2xl">
	{#if icon}
		<span class={[icon]}></span>
	{/if}
	{@render children()}
</div>
