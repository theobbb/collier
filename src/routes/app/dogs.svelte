<script lang="ts">
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';
	import Dog from '$lib/ui/components/dog-card.svelte';

	//const { expanded } = $props();
	const current_i = $derived(Number(page.params.dog) || 0);

	let expanded = $state(false);

	const dogs2 = $derived([...data.dogs, ...data.dogs]);
</script>

<!-- <div class="card col-span-3 row-span-2">
	{@render dog_renderer(data.dogs[current_i], current_i)}
</div> -->

<div class={['relative z-200 w-36 gap-3', expanded ? '' : '']}>
	{#each data.dogs as dog, i}
		{#if i == 1}
			{@const is_current = current_i == i}
			<a
				class={[
					is_current ? '' : '',
					'corner pointer-events-auto block shadow-xs',
					'transition-all duration-300 ease-out'
				]}
				style="transform-: translateY({(current_i - i) * 100}%);"
				href={page.route.id?.replace('[dog]', String(i))}
			>
				<Dog {dog} transparent />
				<!-- <div class="h-full- flex">
					<Avatar index={dog.avatar} size="lg" />
				</div>
				<div
					class={[
						is_current ? 'text-xl-' : 'opacity-0',
						'absolute- translate-y-full- -bottom-1 shrink-0 rounded px-2 text-xs font-medium whitespace-nowrap italic '
					]}
				>
					{dog.name}
				</div> -->
			</a>
		{/if}
	{/each}
	<!-- <div
		class="more-dogs corner absolute top-1.5 -right-6 z-20 flex size-8 items-center justify-center border bg-surface"
	>
		<div class="icon-[ri--arrow-right-s-line] text-2xl"></div>
	</div> -->
</div>
{#if expanded}
	<div class="card- fixed right-2x bottom-32 left-2x z-100 min-h-44 shadow-xs">
		<div class="flex gap-2x">
			{#each dogs2 as dog, i}
				{#if i != 1}
					<a
						class={[
							'corner pointer-events-auto block size-36 shrink-0 shadow-xs',
							'transition-all duration-300 ease-out'
						]}
						style="transform-: translateY({(current_i - i) * 100}%);"
						href={page.route.id?.replace('[dog]', String(i))}
					>
						<Dog {dog} transparent />
					</a>
				{/if}
			{/each}
		</div>
	</div>
	<div class="backdrop-blur-sm- fixed inset-0 z-50 bg-black/40"></div>
{/if}
