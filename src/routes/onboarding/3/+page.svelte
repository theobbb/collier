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
		data.dogs[0].avatar = Number(url_avatar);
	}
</script>

<div class="mb-4x flex items-center justify-between">
	<Title icon="icon-[ri--dossier-line]">Carnet médical</Title>
	<a href="/onboarding/4" class="flex items-center gap-1">
		Sauter
		<span class="icon-[ri--arrow-right-long-line]"></span>
	</a>
</div>

<div class="mb-4x">
	<Dog dog={data.dogs[0]} size="lg" />
</div>

<div class="flex flex-col gap-2x">
	<Input label="année de naissance" bind:value={data.dogs[0].born} />
	<Input label="race" bind:value={data.dogs[0].race} />
	<Input label="sexe" bind:value={data.dogs[0].sex} />
	<Input label="couleur/description" bind:value={data.dogs[0].color} />
</div>

<NextStep step="4" />
