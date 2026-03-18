<script>
	import { reset_data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import NextStep from '../next-step.svelte';

	reset_data();
</script>

<div class="col-span-full flex min-h-svh">
	<div class="card flex w-full flex-col items-center justify-between py-5x pb-32">
		<div class="font-comic text-5xl">Bienvenue</div>
		<div>
			<img src="/home.png" alt="" />
		</div>
		<Button href="/onboarding/1" icon="icon-[ri--qr-code-line]" variant="action" size="lg">
			Scanner le collier
		</Button>
	</div>
</div>
