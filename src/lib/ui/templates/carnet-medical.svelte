<script lang="ts">
	import { type Dog } from '$lib/data.svelte';
	import DogCard from '$lib/ui/components/dog-card.svelte';
	import Input from '$lib/ui/components/form/fields/input.svelte';
	import Title from '$lib/ui/components/title.svelte';

	const { dog, carousel }: { dog: Dog; carousel?: boolean } = $props();
</script>

<div class="card border p-3x">
	<div class=" flex items-center justify-between">
		<Title icon="icon-[ri--dossier-line]">Carnet médical</Title>
	</div>

	<div class="mt-3x flex justify-center py-2x">
		<div class="w-36">
			<DogCard {dog} />
		</div>
	</div>

	<div class="mt-3x flex flex-col gap-2x">
		<Input label="sexe" bind:value={dog.sex} />
		<Input label="race" bind:value={dog.race} />
		<Input label="couleur/description" bind:value={dog.color} />
		<Input label="poids (kg)" bind:value={dog.weight} />
		<Input label="année de naissance" bind:value={dog.born} />
	</div>
</div>
