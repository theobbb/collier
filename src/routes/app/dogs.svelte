<script lang="ts">
	import { page } from '$app/state';
	import { data, type Dog } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';

	const current_i = $derived(Number(page.params.dog) || 0);
</script>

<div class="card col-span-3 row-span-2">
	{@render dog_renderer(data.dogs[current_i], current_i)}
</div>

<!-- <div class="col-span-5 row-start-2 flex items-center gap-0.5">
	{#each data.dogs as dog, i}
		{#if i != current_i}
			{@render dog_renderer(dog, i)}
		{/if}
	{/each}
</div> -->

{#snippet dog_renderer(dog: Dog, i: number)}
	{@const is_current = current_i == i}
	<a
		class={[
			is_current ? '' : 'card size-16',
			'pointer-events-auto relative flex flex-col items-center p-1',
			'  transition-all duration-300 ease-out'
		]}
		href={page.route.id?.replace('[dog]', String(i))}
	>
		<div class="flex aspect-square h-full">
			<Avatar index={dog.avatar} size="full" />
		</div>
		<div
			class={[
				is_current ? 'text-xl-' : 'scale-60 opacity-0',
				'absolute -bottom-1 translate-y-full rounded bg-white px-2 text-xl whitespace-nowrap italic transition-all duration-300 ease-in-out'
			]}
		>
			{dog.name}
		</div>
	</a>
{/snippet}
