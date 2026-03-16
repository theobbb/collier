<script>
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Human from '$lib/ui/components/human.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import NextStep from '../next-step.svelte';
</script>

<div class="mb-4x flex items-center justify-between">
	<Title icon="icon-[ri--user-line]">Famille</Title>
	<a href="/app/1" class="flex items-center gap-1">
		Sauter
		<span class="icon-[ri--arrow-right-long-line]"></span>
	</a>
</div>

<div class="flex flex-col gap-2x">
	{#each data.family as human}
		<Human {human} name />
	{/each}
	<div><Button icon="icon-[ri--add-line]" /></div>
</div>

<NextStep step="/app/1/track/map" />
