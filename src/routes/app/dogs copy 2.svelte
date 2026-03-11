<script lang="ts">
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';

	// 1. Create a fat runway of clones upfront.
	// 20 sets of 3 dogs = 60 items. For SVGs, this is zero performance hit
	// and completely removes the need to hack CSS reflows for infinite left-scrolling.
	let uid = 0;
	let track = $state(
		Array.from({ length: 20 }).flatMap(() => data.dogs.map((dog) => ({ ...dog, key: uid++ })))
	);

	// 2. Start right in the middle of our runway (so they can click left endlessly)
	let start_index = $state(data.dogs.length * 10);

	function slide(direction: number) {
		start_index += direction;
		data.current_dog = track[start_index + 1].i;

		// 3. The exact logic you asked for: push more clones if they reach the right end
		if (start_index >= track.length - 3) {
			track.push(...data.dogs.map((d) => ({ ...d, key: uid++ })));
		}
	}
</script>

<div class="w-full overflow-hidden py-4x">
	<div
		class="flex w-full transition-transform duration-300 ease-in-out"
		style="transform: translateX(calc(-33.33333% * {start_index}));"
	>
		{#each track as dog, i (dog.key)}
			{@const is_current = data.current_dog === dog.i}

			<button
				class="flex shrink-0 cursor-pointer flex-col items-center transition-all duration-300"
				style="flex: 0 0 33.33333%;"
				onclick={() => {
					// Navigate based on which side they click
					if (i === start_index) slide(-1);
					if (i === start_index + 2) slide(1);
				}}
			>
				<div
					class={[
						'aspect-square w-full transition-all duration-300',
						is_current ? 'scale-100 opacity-100' : 'scale-75 opacity-60'
					]}
				>
					<Avatar index={dog.avatar} size="full" />
				</div>
				<div
					class={[
						'mt-2x transition-all duration-300',
						is_current ? 'text-xl font-bold' : 'text-sm',
						'italic'
					]}
				>
					{dog.name}
				</div>
			</button>
		{/each}
	</div>
</div>
