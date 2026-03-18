<script lang="ts">
	import type { Dog } from '$lib/data.svelte';
	import Avatar from './avatar.svelte';

	const { dog, transparent = false }: { dog: Dog; transparent?: boolean } = $props();
</script>

<div
	class={[
		'card @container flex flex-col items-center gap-[2cqh] p-[2cqmin]',
		transparent ? 'transparent' : ''
	]}
>
	<div class="-mt-[5cqh]"><Avatar index={dog.avatar} /></div>
	<div
		class="font-comic mb-[0.5cqh] w-full text-center"
		style="font-size: {190 / dog.name.length}cqi;"
	>
		{dog.name}
	</div>
</div>
