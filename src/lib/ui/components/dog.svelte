<script lang="ts">
	import type { Dog } from '$lib/data.svelte';
	import Avatar from './avatar.svelte';

	const { dog, size: size_option = 'md' }: { dog: Dog; size?: 'sm' | 'md' | 'lg' | 'full' } =
		$props();

	const options = {
		sm: 'text-sm',
		md: 'text-lg',
		lg: 'text-2xl',
		full: 'text-2xl'
	};
	const size = $derived(options[size_option]);
</script>

<div class="corner flex w-fit flex-col items-center gap-1x border p-3x">
	<div class="size-26"><Avatar index={dog.avatar} {size} /></div>
	<div><div class={[options[size_option], 'font-comic']}>{dog.name}</div></div>
</div>
