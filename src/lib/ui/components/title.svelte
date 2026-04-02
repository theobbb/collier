<script lang="ts">
	import type { Snippet } from 'svelte';

	const { icon, children }: { icon?: string; children: Snippet } = $props();
</script>

<div class="font-comic mb-3x flex items-center gap-2x text-4xl text-accent">
	{#if icon}
		<span class={[icon]}></span>
	{/if}
	{@render children()}
</div>
