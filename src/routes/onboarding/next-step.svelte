<script lang="ts">
	import Button from '$lib/ui/components/button.svelte';

	const { step } = $props();
</script>

<div class="my-3x">
	<Button href={step} variant="action" class="w-full" size="lg">Continuer</Button>
</div>
<!-- <a
	class="corner mt-3x block w-full bg-accent-3 py-3x text-center text-xl font-medium text-white"
	href={step}
>
	Continuer
</a> -->
