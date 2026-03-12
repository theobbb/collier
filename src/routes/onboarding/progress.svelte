<script lang="ts">
	import { page } from '$app/state';

	const step = $derived(Number(page.url.pathname.split('/')?.[2]?.[0]));
	const total_steps = 5;

	const progress = $derived(step / total_steps);
</script>

<div class=" mb-1x flex items-center justify-between text-xs font-medium">
	<div>Configuration</div>
	<div>{Math.round(progress * 100)}%</div>
</div>
<div class="bg-black/5">
	<div
		class="h-1.5 w-full origin-left bg-green-500 transition ease-in-out"
		style="transform: scaleX({progress});"
	></div>
</div>
