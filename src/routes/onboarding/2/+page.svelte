<script>
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';
</script>

<div class="mb-4x text-2xl">{data.dogs[0].name} a besoin d’un avatar.</div>

<div class="mx-3x grid grid-cols-3 gap-x-4x pb-5x">
	{#each { length: 30 } as _, avatar_i}
		<a href="/onboarding/3?avatar={avatar_i}"><Avatar index={avatar_i} size="full" /></a>
	{/each}
</div>
