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

<Title icon="icon-[ri--book-line] ">Journal</Title>

<div class="mb-4x">
	<div class=" grid grid-cols-2 gap-2x font-medium">
		<ScheduleItem type="meal" time={schedule.meal} />
		<ScheduleItem type="walk" time={schedule.walk} />
	</div>
	<div class="mt-2x text-center text-xs font-medium">Suggestions selon l’horaire</div>
</div>

<div class="corner border p-2x">
	<div class="mb-3x"><Button class="w-full" variant="action">+ Nouveau</Button></div>
	<div class="flex flex-col-reverse gap-2x">
		{#each journal as { type, author, shit, time }}
			{@const { day, time: hours } = format_time(time)}
			<div class="corner grid grid-cols-12 border bg-black/5 px-3 py-3">
				<div class="col-span-7 flex items-center gap-3">
					<div class="shrink-0"><Human human={data.family[author]} /></div>

					<div class="text-base">
						<span class="inline-block min-w-10 font-medium">{hours}</span>
						<span class="ml-1 text-black/60">{day}</span>
					</div>
				</div>
				<div class="col-span-2">
					<div
						class={[
							'corner flex size-7 items-center justify-center text-base ',
							type == 'walk' ? 'bg-walk' : 'bg-meal'
						]}
						style="background-color: var(--color-{type})"
					>
						<span class={[type == 'walk' ? 'icon-[ri--walk-fill]' : 'icon-[ri--restaurant-fill]']}
						></span>
					</div>
				</div>
				<div class="col-span-3 flex items-center justify-between">
					<div class="flex items-center">
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

<button class="corner col-span-4 bg-blue-400"> + Nouveau </button>
<!-- <div class="mt-4">
		<Button icon="icon-[ri--sticky-note-add-line]" variant="action" size="lg" />
	</div> -->
