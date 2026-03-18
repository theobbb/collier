<script lang="ts">
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Grid from '$lib/ui/components/grid.svelte';
	import Human from '$lib/ui/components/human.svelte';
	import ScheduleItem from '$lib/ui/components/schedule-item.svelte';
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
	<div class="card col-span-full p-2x">
		<div class="flex flex-col-reverse gap-0.5">
			{#each journal as { type, author, shit, time }}
				{@const { day, time: hours } = format_time(time)}
				<div class="bg-black/5- corner grid grid-cols-12 px-3 py-3">
					<div class="col-span-6 flex items-center gap-3">
						<div class="shrink-0"><Human human={data.family[author]} /></div>

						<div class="text-base font-medium">
							{hours} <span class="ml-2 text-black/60">{day}</span>
						</div>
					</div>
					<div
						class={[
							'col-span-2 flex items-center text-base ',
							type == 'walk' ? 'bg-walk' : 'bg-meal'
						]}
						style="background-color: var(--color-{type})"
					>
						<span class={[type == 'walk' ? 'icon-[ri--walk-fill]' : 'icon-[ri--restaurant-fill]']}
						></span>
					</div>
					<div class="col-span-4 flex items-center justify-between">
						<div>
							{#if shit}
								<div class="icon-[boxicons--poop]"></div>
							{/if}
						</div>
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
