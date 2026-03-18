<script>
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Dog from '$lib/ui/components/dog.svelte';
	import Input from '$lib/ui/components/form/fields/input.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import NextStep from '../next-step.svelte';

	const url_avatar = page.url.searchParams.get('avatar');
	if (url_avatar) {
		data.dogs[1].avatar = Number(url_avatar);
	}
</script>

<div class="card border p-3x">
	<div class=" flex items-center justify-between">
		<Title icon="icon-[ri--dossier-line]">Carnet médical</Title>
	</div>

	<div class="flex justify-center py-2x"><Dog dog={data.dogs[1]} size="lg" /></div>

	<div class="mt-3x flex flex-col gap-2x">
		<Input label="année de naissance" bind:value={data.dogs[1].born} />
		<Input label="race" bind:value={data.dogs[1].race} />
		<Input label="sexe" bind:value={data.dogs[1].sex} />
		<Input label="couleur/description" bind:value={data.dogs[1].color} />
	</div>
</div>

<NextStep step="/onboarding/4" />
