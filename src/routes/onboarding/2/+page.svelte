<script lang="ts">
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';
	import Dog from '$lib/ui/components/dog-card.svelte';

	//let selected: number | null = $state(1);
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

<!-- {#if selected != null}
	<div class="fixed right-0 bottom-0 left-0">
		<div class="corner m-3x border bg-neutral-400 shadow-lg backdrop-blur-lg">
			<div class="m-2x flex h-32 w-28">
				<Dog dog={{ ...data.dogs[1], avatar: selected }} />
			</div>
		</div>
	</div>
{/if} -->
