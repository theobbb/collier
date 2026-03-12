<script lang="ts">
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';
</script>

<div class="mx-4x my-4x flex items-center justify-around gap-1x">
	{#each data.dogs as dog, i}
		{@const is_current = (page.params.dog || 0) == i}
		<a
			class={[
				is_current ? 'flex-2' : 'flex-1 translate-y-2',
				'relative flex flex-col items-center p-1',
				' border- rounded-full border-black/20  transition-all duration-300 ease-out'
			]}
			href={page.route.id?.replace('[dog]', String(i))}
		>
			<div class="aspect-square w-full">
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
	{/each}
</div>
