<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	const { children }: { label: string; children: Snippet } = $props();

	const route_length = $derived(page.route.id?.split('/')?.length || 0);
</script>

{#if route_length > 4}
	<a
		href="/app/{page.params.dog}/menu"
		class="mb-3x flex items-center gap-2x text-sm font-medium text-muted"
	>
		<div class="icon-[ri--arrow-left-line]"></div>
		<div>Retour</div>
	</a>
{/if}
{@render children()}
