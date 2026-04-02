<script lang="ts">
	import { format_time } from '$lib/utils/format-date';

	const { type, time, time2 }: { type: 'meal' | 'walk'; time: string; time2: string } = $props();

	const { time: hour, day } = $derived(format_time(time));
</script>

<div
	class="corner flex flex-col justify-between border px-3x py-2x text-sm"
	style="background-color: var(--color-{type});"
>
	<div class="flex- mb-2x items-center justify-between gap-2 text-muted">
		<div class="flex items-center gap-1.5">
			<span class={[type == 'walk' ? 'icon-[ri--walk-fill]' : 'icon-[ri--restaurant-fill]']}></span>

			{#if type == 'meal'}
				Prochain repas
			{:else}
				Prochaine marche
			{/if}
		</div>

		<!-- <div>
			<div class={[type == 'meal' ? 'icon-[ri--restaurant-fill]' : 'icon-[ri--walk-fill]']}></div>
		</div> -->
	</div>

	<div class="flex items-center gap-1 text-xl font-normal">
		<!-- <div class="icon-[ri--timer-line]"></div> -->
		<div>{time}</div>
		<div class="mt-0.5 text-base text-muted">{time2}</div>
	</div>
</div>
