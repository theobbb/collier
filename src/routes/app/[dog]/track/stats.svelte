<script lang="ts">
	import { onMount } from 'svelte';

	// State variables
	let bpm = $state(172);
	let distance = $state(50);

	// Helper for distance logic
	let direction = 1;
	const step = 45; // Speed of distance change per second

	onMount(() => {
		const interval = setInterval(() => {
			// 1. Randomize BPM: 172 +- 20
			bpm = Math.floor(172 + (Math.random() * 40 - 20));

			// 2. Loop Distance: 50 to 500 and back
			distance += step * direction;

			if (distance >= 500) {
				distance = 500;
				direction = -1;
			} else if (distance <= 50) {
				distance = 50;
				direction = 1;
			}
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col gap-2 text-sm font-medium">
	<div class="mb-4 flex items-center gap-2 text-black/50">
		<div class="size-2.5 animate-pulse rounded-full bg-red-400"></div>
		En direct
	</div>

	<div class="card flex w-fit items-center gap-1 px-2 py-1 shadow-sm">
		<div class="icon-[ri--heart-pulse-line]"></div>
		<div>{bpm}<span class="ml-0.5">bpm</span></div>
	</div>

	<div class="card flex w-fit items-center gap-1 px-2 py-1 shadow-sm">
		<div class="icon-[ri--pin-distance-fill]"></div>
		<div>{Math.round(distance)}<span class="ml-0.5">m</span></div>
	</div>
</div>
