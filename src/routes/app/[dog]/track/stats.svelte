<script lang="ts">
	import { page } from '$app/state';
	import ScheduleItem from '../journal/schedule-item.svelte';

	const { dog } = $derived(page.data);
	const { journal, schedule } = $derived(dog);
</script>

<ScheduleItem type="meal" time={schedule.meal} />
<ScheduleItem type="walk" time={schedule.walk} />

<div class="flex gap-1 text-xs">
	<div class="flex w-fit items-center gap-1 rounded-full border border-black/20 px-1x">
		<div class="icon-[ri--pin-distance-fill]"></div>
		<div>344<span class="ml-0.5">m</span></div>
	</div>
	<div class="flex w-fit items-center gap-1 rounded-full border border-black/20 px-1x">
		<div class="icon-[ri--heart-pulse-line]"></div>
		<div>172<span class="ml-0.5">bpm</span></div>
	</div>
	<div class="flex w-fit items-center gap-1 rounded-full border border-black/20 px-1x">
		<div class="icon-[ri--battery-low-line]"></div>
		<div>29<span class="ml-0.5">%</span></div>
	</div>
</div>
