<script lang="ts">
	import type { Dog } from '$lib/data.svelte';
	import Avatar from './avatar.svelte';

	const { dog }: { dog: Dog } = $props();
</script>

<div class="corner flex flex-col items-center gap-1x border bg-surface p-3x">
	<Avatar index={dog.avatar} />
	<div class={['font-comic']}>{dog.name}</div>
</div>
