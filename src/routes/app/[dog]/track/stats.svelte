<script lang="ts">
	import { page } from '$app/state';
	import ScheduleItem from '../journal/schedule-item.svelte';

	const { dog } = $derived(page.data);
	const { journal, schedule } = $derived(dog);
</script>

<div class="flex flex-col gap-2x text-sm font-medium">
	<div class="card flex w-fit items-center gap-1 px-1x shadow-xs">
		<div class="icon-[ri--battery-low-line]"></div>
		<div>29<span class="ml-0.5">%</span></div>
	</div>
	<div class="card flex w-fit items-center gap-1 px-1x shadow-xs">
		<div class="icon-[ri--heart-pulse-line]"></div>
		<div>172<span class="ml-0.5">bpm</span></div>
	</div>
	<div class="card flex w-fit items-center gap-1 px-1x shadow-xs">
		<div class="icon-[ri--pin-distance-fill]"></div>
		<div>344<span class="ml-0.5">m</span></div>
	</div>
</div>
