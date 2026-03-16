<script lang="ts">
	import { format_time } from '$lib/utils/format-date';

	const { type, time }: { type: 'meal' | 'walk'; time: string } = $props();

	const { time: hour, day } = $derived(format_time(time));
</script>

<div class="corner px-3x py-2x text-sm" style="background-color: var(--color-{type});">
	<div class="flex items-center justify-between gap-2">
		<div>
			{#if type == 'meal'}
				Prochain repas
			{:else}
				Prochaine marche
			{/if}
		</div>
		<div>
			<div class={[type == 'meal' ? 'icon-[ri--restaurant-fill]' : 'icon-[ri--walk-fill]']}></div>
		</div>
	</div>

	<div class="flex items-center gap-1">
		<div class="icon-[ri--timer-line]"></div>
		<div>{hour}</div>
	</div>
</div>
