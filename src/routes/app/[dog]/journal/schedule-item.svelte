<script lang="ts">
	import { format_time } from '$lib/utils/format-date';

	const { type, time }: { type: 'meal' | 'walk'; time: string } = $props();

	const { time: hour, day } = $derived(format_time(time));
</script>

<div
	class="corner flex flex-col justify-between border px-3x py-2x text-sm"
	style="background-color: var(--color-{type});"
>
	<div class="mb-2x flex items-center justify-between gap-2 text-muted">
		<div>
			{#if type == 'meal'}
				Repas
			{:else}
				Marche
			{/if}
		</div>
		<div>
			<div class={[type == 'meal' ? 'icon-[ri--restaurant-fill]' : 'icon-[ri--walk-fill]']}></div>
		</div>
	</div>

	<div class="flex items-center gap-1 text-xl font-normal">
		<div class="icon-[ri--timer-line]"></div>
		<div>{time}</div>
	</div>
</div>
