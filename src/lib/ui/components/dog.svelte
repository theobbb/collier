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

<div class="flex flex-col items-center gap-3x">
	<div><Avatar index={dog.avatar} {size} /></div>
	<div><div class={[options[size_option], 'italic']}>{dog.name}</div></div>
</div>
