<script lang="ts">
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';
</script>

<div class="mx-3x my-4x flex justify-around gap-4x">
	{#each data.dogs as dog}
		{@const is_current = data.current_dog == dog.i}
		<button
			class={[
				is_current ? 'flex-3' : 'flex-1',
				'flex flex-col items-center',
				'transition-all ease-in-out'
			]}
			onclick={() => (data.current_dog = dog.i)}
		>
			<div class="aspect-square w-full">
				<Avatar index={dog.avatar} size="full" />
			</div>
			<div class={['mt-2x', is_current ? 'text-xl' : 'text-sm', 'italic']}>
				{dog.name}
			</div>
		</button>
	{/each}
</div>
