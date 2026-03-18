<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import DogCard from '$lib/ui/components/dog-card.svelte';

	const current_i = $derived(Number(page.params.dog) || 0);

	let expanded = $state(true);

	//const dogs2 = $derived([...data.dogs, ...data.dogs]);

	const current_dog = $derived(data.dogs[current_i]);

	onNavigate(() => {
		expanded = false;
	});
</script>

<div class={['relative z-200', expanded ? '' : '']}>
	<button
		onclick={() => (expanded = !expanded)}
		class={[
			'corner pointer-events-auto block size-36 shadow-xs',
			'transition-all duration-300 ease-out'
		]}
	>
		<DogCard dog={current_dog} transparent />
	</button>
</div>
{#if expanded}
	<div class="fixed bottom-40 left-2x z-100">
		<div class="flex flex-col gap-3x">
			{#each data.dogs as dog, i}
				{#if i != current_i}
					<a
						class={[
							'corner pointer-events-auto block size-36 shrink-0 shadow-xs',
							'transition-all duration-300 ease-out'
						]}
						style="transform-: translateY({(current_i - i) * 100}%);"
						href={page.route.id?.replace('[dog]', String(i))}
					>
						<DogCard {dog} transparent />
					</a>
				{/if}
			{/each}
		</div>
	</div>
	<div class="backdrop-blur-sm- fixed inset-0 z-50 bg-black/40"></div>
{/if}
