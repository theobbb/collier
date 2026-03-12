<script lang="ts">
	import Button from '$lib/ui/components/button.svelte';

	const { step } = $props();
</script>

<div class="mt-4x text-right">
	<Button href={step} variant="action" size="lg">Continuer</Button>
</div>
