<script lang="ts">
	import { page } from '$app/state';
	import Back from '$lib/ui/components/back.svelte';
	import type { Snippet } from 'svelte';

	const { children }: { label: string; children: Snippet } = $props();

	const route_length = $derived(page.route.id?.split('/')?.length || 0);
</script>

{#if route_length > 4}
	<Back href="/app/{page.params.dog}/menu" />
{/if}
{@render children()}
