<script>
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Human from '$lib/ui/components/human.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import { format_time } from '$lib/utils/format-date';

	const journal = $derived(data.dogs[Number(page.params.dog)].journal);
</script>

<div>
	<div class="text-sm">Suggestions selon l’horaire</div>
</div>
<div class="my-2x mb-3x h-16 border"></div>

<Title icon="icon-[ri--book-line]">Journal</Title>

<div class="mt-3x flex flex-col-reverse gap-2">
	{#each journal as { type, author, shit, time }}
		{@const { day, time: hours } = format_time(time)}
		<div class="grid grid-cols-2 rounded bg-black/5 px-2x py-2">
			<div class="flex items-center gap-3">
				<div class="shrink-0"><Human human={data.family[author]} /></div>

				<div class="text-sm">{hours} <span class="text-black/60">{day}</span></div>
			</div>
			<div class="flex items-center justify-between">
				<div
					class={[
						'flex w-fit items-center gap-1.5 rounded px-2 py-0.5 pl-1.5 text-sm ',
						type == 'walk' ? 'bg-green-200' : 'bg-red-200'
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

<Button icon="icon-[ri--sticky-note-add-line]" variant="action" size="lg" />
