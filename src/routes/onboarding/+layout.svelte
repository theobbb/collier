<script lang="ts">
	import { page } from '$app/state';
	import Progress from './progress.svelte';

	const { children } = $props();
</script>

<div class="my-3x">
	{#if page.route.id != '/onboarding'}
		<Progress />
	{/if}
	<div class="mt-4x">
		{@render children()}
	</div>
</div>
