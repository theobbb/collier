<script>
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';
</script>

<div class="col-span-full px-3x py-3x text-xl">
	{data.dogs[1].name} a besoin d’un avatar.
</div>
<div class="grid grid-cols-3 gap-1x">
	{#each { length: 30 } as _, avatar_i}
		<a class="corner bg-surface p-2x" href="/onboarding/3?avatar={avatar_i}">
			<Avatar index={avatar_i} size="full" />
		</a>
	{/each}
</div>
