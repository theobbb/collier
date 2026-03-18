<script lang="ts">
	import { page } from '$app/state';
	import Grid from '$lib/ui/components/grid.svelte';
	import Progress from './progress.svelte';

	const { children } = $props();
</script>

{#if page.route.id != '/onboarding'}
	<Progress />
{/if}

{@render children()}
