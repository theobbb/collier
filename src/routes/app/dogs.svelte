<script lang="ts">
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import DogCard from '$lib/ui/components/dog-card.svelte';

	const current_i = $derived(Number(page.params.dog) || 0);

	let expanded = $state(false);

	//const dogs2 = $derived([...data.dogs, ...data.dogs]);

	const current_dog = $derived(data.dogs[current_i]);

	onNavigate(() => {
		expanded = false;
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	title="close dogs"
	onclick={() => (expanded = false)}
	class={[
		'backdrop fixed inset-0 z-50',
		expanded ? 'pointer-events-auto' : 'opacity-0',
		'transition-all duration-300 ease-out'
	]}
></div>

<div
	class={[
		'fixed top-2x left-2 z-100',
		expanded ? 'pointer-events-auto' : '-translate-y-8 opacity-0',
		'transition-all duration-300 ease-out'
	]}
>
	<Button href="/onboarding/1" size="lg" class="w-36! min-w-[unset]! bg-blue-200">+ Ajouter</Button>
</div>

<div class={['relative z-200 size-36', expanded ? '' : '']}>
	{#each data.dogs as dog, i}
		<button
			onclick={(event) => {
				event.stopPropagation();
				if (!expanded) expanded = !expanded;
				else goto(page.route.id?.replace('[dog]', String(i)) || '/');
			}}
			class={[
				'corner absolute block size-36 cursor-pointer shadow-xs',
				i == current_i || expanded ? 'pointer-events-auto' : 'pointer-events-none opacity-0',
				i == current_i && !expanded && 'z-200!',
				'transition-all duration-300 ease-out'
			]}
			style="transform: translateY({expanded ? i * -100 - 12 * i : 0}%); z-index: {data.dogs
				.length - i};"
		>
			<DogCard {dog} transparent />
		</button>
	{/each}
</div>

<!-- 
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
{/if} -->
