<script lang="ts">
	import { type Dog } from '$lib/data.svelte';
	import Input from '$lib/ui/components/form/fields/input.svelte';

	const { dog, onboarding }: { dog: Dog; onboarding?: boolean } = $props();
</script>

<div class="card p-3x">
	{#if onboarding}
		<div class="mb-3x space-y-4x text-xl leading-tight">
			<div>Vous êtes la première personne <br /> qui scanne ce collier !</div>
			<div>C’est un grand moment pour...</div>
		</div>
	{/if}
	<Input name="" label="Nom du chien" bind:value={dog.name} />
</div>

{#if onboarding}
	<div class="fixed right-2x bottom-4x left-2x flex flex-col items-center text-sm/5.5 text-muted">
		<div>Vous n’êtes pas propriétaire de ce chien ?</div>
		<div class="font-medium text-indigo-600">Chien oublié →</div>
	</div>
{/if}
