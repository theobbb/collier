<script lang="ts">
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Grid from '$lib/ui/components/grid.svelte';
	import Human from '$lib/ui/components/human.svelte';
	import ScheduleItem from './schedule-item.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import { format_time } from '$lib/utils/format-date';

	const { dog } = $derived(page.data);
	const { journal, schedule } = $derived(dog);
</script>

<Grid>
	<div class="card col-span-8 min-h-16 px-2 py-2">
		<Title icon="icon-[ri--book-line] ">Journal</Title>
	</div>
	<button class="corner col-span-4 bg-blue-400"> + Nouveau </button>
	<div class="card col-span-full px-2x py-4">
		<div class="flex flex-col-reverse gap-2">
			{#each journal as { type, author, shit, time }}
				{@const { day, time: hours } = format_time(time)}
				<div
					class="bg-black/5- grid grid-cols-2 rounded py-2"
					style="background-color: var(--color-{type})"
				>
					<div class="flex items-center gap-3">
						<div class="shrink-0"><Human human={data.family[author]} /></div>

						<div class="text-sm">{hours} <span class="text-black/60">{day}</span></div>
					</div>
					<div class="flex items-center justify-between">
						<div
							class={[
								'flex w-fit items-center gap-1.5 rounded px-2 py-0.5 pl-1.5 text-sm ',
								type == 'walk' ? 'bg-walk' : 'bg-meal'
							]}
						>
							<span class={[type == 'walk' ? 'icon-[ri--walk-fill]' : 'icon-[ri--restaurant-fill]']}
							></span>
							<span class="-mt-px">{type == 'walk' ? 'Marche' : 'Repas'}</span>
						</div>
						{#if shit}
							<div class="icon-[boxicons--poop]"></div>
						{/if}
						<div class="icon-[ri--more-2-line]"></div>
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-2x text-sm">Tout afficher</div>
	</div>
	<div class="col-span-full">
		<div class="mb-2x text-center text-sm font-medium text-surface">
			Suggestions selon l’horaire
		</div>
		<div>
			<div class="grid grid-cols-2 gap-0.5">
				<ScheduleItem type="meal" time={schedule.meal} />
				<ScheduleItem type="walk" time={schedule.walk} />
			</div>
		</div>
	</div>

	<!-- <div class="mt-4">
		<Button icon="icon-[ri--sticky-note-add-line]" variant="action" size="lg" />
	</div> -->
</Grid>
