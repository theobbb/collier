<script module>
	import { page } from '$app/state';
	import { data, type JournalEntry } from '$lib/data.svelte';
	import { entry_time } from '$lib/seed';

	export { schedule_item, schedule_item_preview };

	export type ScheduleEntry = {
		type: 'meal' | 'walk';
		time: string;
	};
</script>

<script lang="ts">
	//const dog = $derived(data.dogs[page.params.dog || 0])

	const schedule = $derived(page.data.dog.schedule);
</script>

<div>
	<div class="grid grid-cols-2 gap-2x">
		{@render schedule_item({ type: 'meal', time: schedule.meal })}
	</div>
</div>

{#snippet schedule_item({ type, time }: ScheduleEntry)}
	<div>{type}</div>
{/snippet}

{#snippet schedule_item_preview({ type, author, time, shit }: JournalEntry)}
	<div>meal</div>
{/snippet}
