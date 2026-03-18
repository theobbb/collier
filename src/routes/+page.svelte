<script>
	import { reset_data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';

	reset_data();
</script>

<div class="flex min-h-svh">
	<div class="card flex w-full flex-col items-center justify-between py-5x">
		<div class="text-3xl">Bienvenue</div>
		<Button href="/onboarding/1" icon="icon-[ri--qr-code-line]" variant="action" size="lg">
			Scanner le collier
		</Button>
	</div>
</div>

<!-- <div class="flex min-h-svh">
	<div class="my-5x flex w-full flex-col items-center justify-between">
		<div class="text-3xl">Bienvenue</div>
		<Button href="/onboarding/1" icon="icon-[ri--qr-code-line]" variant="action" size="lg">
			Scanner le collier
		</Button>
	</div>
</div> -->
