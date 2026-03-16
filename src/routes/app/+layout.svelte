<script lang="ts">
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Nav from './nav.svelte';

	const { children } = $props();
</script>

<div class="my-3x-">
	<div class="mt-4x-">
		{@render children()}
		<!-- <div class="mt-4x text-right">
			<Button href={next_step} variant="action">Continuer</Button>
		</div> -->
	</div>
	<Nav />
</div>
