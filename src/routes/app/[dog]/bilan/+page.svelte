<script lang="ts">
	import { page } from '$app/state';

	import Title from '$lib/ui/components/title.svelte';
	import Event from './event.svelte';

	const { dog } = $derived(page.data);
	const { journal, schedule } = $derived(dog);

	const cx = {
		container: 'card text-right flex flex-col justify-between border text-xl px-3.5 py-3',
		header: 'mb-4 flex text-2 justify-between items-center gap-2',
		label: 'text-sm/3.5 font-medium'
	};

	let time_scale = $state(0);
</script>

<Title icon="icon-[ri--dashboard-3-line]">Bilan</Title>

<div>
	<div class="my-3x flex items-center gap-2x">
		{#each ['Aujourd’hui', 'Semaine', 'Mois', 'Tout'] as scale, i}
			<button
				class={[
					'corner flex-1 border px-3x py-1x text-xs font-medium tracking-wide ',
					time_scale == i ? 'bg-active  text-black' : 'bg-black/10 text-muted'
				]}
				onclick={() => (time_scale = i)}
			>
				{scale}
			</button>
		{/each}
	</div>
</div>

<div class="space-y-3x">
	<Event
		name="Activité"
		icon="icon-[ri--footprint-fill]"
		timeline={[
			[40, 60],
			[70, 100]
		]}
	>
		<div>8h 51</div>
		<div>13 488  pas</div>
		<div>6 km</div>
	</Event>
	<Event
		name="Repos"
		icon="icon-[ri--hotel-bed-fill]"
		timeline={[
			[0, 40],
			[60, 70]
		]}
	>
		<div>9h 15</div>
		<div>3 interruptions</div>
	</Event>

	<Event
		name="Jappements"
		icon="icon-[ri--volume-vibrate-fill]"
		timeline={[
			[44, 46],
			[47, 50],
			[54, 56],
			[58, 59],
			[89, 90],
			[91, 92],
			[94, 97]
		]}
	>
		<div>43 x</div>
		<div>16 min</div>
		<div>74 dB</div>
	</Event>
	<Event
		name="Repas"
		icon="icon-[ri--restaurant-fill]"
		timeline={[
			[24, 27],
			[29, 32],
			[82, 86]
		]}
	>
		<div>9h 15</div>
		<div>3 interruptions</div>
	</Event>
	<Event
		name="Grattements"
		icon="icon-[ri--cactus-fill]"
		timeline={[
			[6, 8],
			[10, 13],
			[15, 16],
			[56, 64],
			[96, 98]
		]}
	>
		<div>9h15</div>
		<div>3 interruptions</div>
	</Event>
</div>

{#snippet delta(percent: number)}
	<div>{percent}%</div>
{/snippet}

<!-- <div class="card col-span-full flex min-h-32 items-center justify-between px-4">
		<div class="text-2xl">Bilan de la journée</div>
		<div class="icon-[ri--file-settings-line] text-2xl"></div>
	</div> -->

<!-- <div class="col-span-full">
		<div class="mb-2x text-center text-sm font-medium text-surface">
			Suggestions selon l’horaire
		</div>
		<div>
			<div class="grid grid-cols-2 gap-1">
				<ScheduleItem type="meal" time={schedule.meal} />
				<ScheduleItem type="walk" time={schedule.walk} />
			</div>
		</div>
	</div> -->
<!-- 
<div class={['col-span-8', cx.container]}>
	<div class={[cx.header]}>
		<div class={[cx.label]}>Distance parcourue</div>
		<span class="icon-[ri--footprint-fill]"></span>
	</div>
	<div>13 284 <span class="text-2">pas</span></div>
	<div>4 <span class="text-2">km</span></div>
</div>

<div class={['col-span-4', cx.container]}>
	<div class={[cx.header]}>
		<div class={[cx.label]}>Calories</div>
		<span class="icon-[ri--fire-fill]"></span>
	</div>
	<div>1200 <span class="text-2">cal.</span></div>
	<div>/1000</div>
</div>

<div class={['col-span-6', cx.container]}>
	<div class={[cx.header]}>
		<div class={[cx.label]}>Jappements</div>
		<span class="icon-[ri--volume-vibrate-fill]"></span>
	</div>
	<div>
		<div>24 <span class="text-2">x</span></div>
	</div>
</div>

<div class={['col-span-6', cx.container]}>
	<div class={[cx.header]}>
		<div class={[cx.label]}>Sommeil</div>
		<span class="icon-[ri--hotel-bed-fill]"></span>
	</div>
	<div>11<span class="text-2">h</span>04</div>
</div> -->
