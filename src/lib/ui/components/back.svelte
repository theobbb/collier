<script lang="ts">
	import type { Snippet } from 'svelte';

	const { href, children }: { href: string; children?: Snippet } = $props();
</script>

<a {href} class="mb-3x flex items-center gap-2x text-sm font-medium text-muted">
	<div class="icon-[ri--arrow-left-line]"></div>
	<div>
		{#if children}
			{@render children?.()}
		{:else}
			Retour
		{/if}
	</div>
</a>
