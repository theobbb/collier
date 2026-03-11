<script lang="ts">
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Input from '$lib/ui/components/form/fields/input.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import NextStep from '../next-step.svelte';
</script>

<div class="mb-4x flex items-center justify-between">
	<Title icon="icon-[ri--user-line]">Vos coordonnées</Title>
	<a href="/onboarding/5" class="flex items-center gap-1">
		Sauter
		<span class="icon-[ri--arrow-right-long-line]"></span>
	</a>
</div>

<div class="mb-4x">
	Vos informations seront visibles <br /> par ceux qui scannent le collier <br /> de
	{data.dogs[0].name}.
</div>

<div class="flex flex-col gap-2x">
	<Input label="nom" bind:value={data.contact.name} />
	<Input label="adresse" bind:value={data.contact.adress} />
	<Input label="code postal" bind:value={data.contact.zip_code} />
	<div class="mt-4x mb-1x flex items-center gap-1.5">
		<span class="icon-[ri--phone-fill]"></span>
		<div>Numéros d’urgence</div>
	</div>
	{#each data.contact.phones as phone}
		<Input label="téléphone" bind:value={phone} />
	{/each}
	<Button onclick={() => data.contact.phones.push('')} icon="icon-[ri--add-line]">Numéro</Button>
</div>

<div class="mt-5x text-sm">Vous pouvez modifier vos coordonnées plus tard.</div>
<NextStep step="5" />
