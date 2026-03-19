<script lang="ts">
	import { type Dog } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';

	const { dog, onboarding }: { dog: Dog; onboarding?: boolean } = $props();
</script>

{#if onboarding}
	<div class="px-3x py-3x text-xl">
		{dog.name} a besoin d’un avatar.
	</div>
{/if}
<div class="grid grid-cols-3 gap-1x">
	{#each { length: 30 } as _, avatar_i}
		{#if onboarding}
			<a class="corner bg-surface p-2x" href="/onboarding/3?avatar={avatar_i}">
				<Avatar index={avatar_i} size="full" />
			</a>
		{:else}
			<button
				class="corner bg-surface p-2x"
				onclick={() => {
					dog.avatar = Number(avatar_i);
				}}
			>
				<Avatar index={avatar_i} size="full" />
			</button>
		{/if}
	{/each}
</div>
