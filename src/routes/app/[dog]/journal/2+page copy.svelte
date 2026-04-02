<script lang="ts">
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Grid from '$lib/ui/components/grid.svelte';
	import Human from '$lib/ui/components/human.svelte';
	import ScheduleItem from './schedule-item.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import { format_time } from '$lib/utils/format-date';
	import { Pop } from '$lib/ui/components/pop/pop-context.svelte';
	import Dialog from '$lib/ui/components/pop/dialog/dialog.svelte';

	const { dog } = $derived(page.data);
	const { journal, schedule } = $derived(dog);

	const pop = new Pop();
</script>

<Title icon="icon-[ri--book-line] ">Journal</Title>

<div class="mb-4x">
	<div class=" grid grid-cols-2 gap-2x font-medium">
		<ScheduleItem type="meal" time="12:45 (1h)" />
		<ScheduleItem type="walk" time="17:00 (4h)" />
	</div>
	<div class="mt-2x text-center text-xs font-medium">Suggestions selon l’horaire</div>
</div>

<div class="corner border p-2x">
	<div class="mb-3x">
		<Button onclick={pop.show} class="w-full" variant="action">+ Nouveau</Button>
	</div>
	<div class="flex flex-col-reverse gap-2x">
		{#each journal as { type, author, shit, time }}
			{@const { day, time: hours } = format_time(time)}
			<div class="corner grid grid-cols-12 border bg-black/5 px-3 py-3">
				<div class="col-span-6 flex items-center gap-3">
					<div class="shrink-0"><Human human={data.family[author]} /></div>

					<div class="text-base">
						<span class="inline-block min-w-10 font-medium">{hours}</span>
						<span class="ml-1 text-black/60">{day}</span>
					</div>
				</div>
				<div class="col-span-4 flex items-center">
					<div
						class={[
							'corner size-7- flex w-fit items-center justify-center gap-1x px-2x text-sm font-medium ',
							type == 'walk' ? 'bg-walk' : 'bg-meal'
						]}
						style="background-color: var(--color-{type})"
					>
						<span class={[type == 'walk' ? 'icon-[ri--walk-fill]' : 'icon-[ri--restaurant-fill]']}
						></span>
						Marche
					</div>
				</div>
				<div class="col-span-2 flex items-center justify-between">
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
</div>

<Dialog {pop}>
	<Title icon="icon-[ri--sticky-note-add-line]">Nouvelle note</Title>

	<div class="text-lg">
		<Human human={data.family[0]} name />
	</div>
	<div class="grid grid-cols-2 gap-2x">
		<Button onclick={pop.close} class="min-w-[unset]! px-0!">Annuler</Button>
		<Button variant="action" size="lg" class="min-w-[unset]! px-0!">Enregistrer</Button>
	</div>
</Dialog>
