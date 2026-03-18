<script lang="ts">
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Input from '$lib/ui/components/form/fields/input.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import NextStep from '../next-step.svelte';
</script>

<div class="card flex flex-col border p-3x">
	<Title icon="icon-[ri--user-line]">Vos coordonnées</Title>

	<div class="mb-4x py-1x text-muted">
		Vos informations seront visibles <br /> par ceux qui scannent le collier <br /> de
		{data.dogs[1].name}.
	</div>

	<div class="flex flex-col gap-2x">
		<Input label="nom" bind:value={data.contact.name} />
		<Input label="adresse" bind:value={data.contact.adress} />
		<Input label="code postal" bind:value={data.contact.zip_code} />
	</div>
	<div class="mt-4x mb-2x flex items-center gap-1.5 text-lg">
		<span class="icon-[ri--phone-fill]"></span>
		<div>Numéros d’urgence</div>
	</div>
	<div class="flex flex-col gap-2x">
		{#each data.contact.phones as phone}
			<Input label="téléphone" bind:value={phone} />
		{/each}
	</div>
	<div class="mt-2x">
		<Button onclick={() => data.contact.phones.push('')} class="w-full" icon="icon-[ri--add-line]"
			>Numéro</Button
		>
	</div>

	<div class="mt-4x text-muted">Vous pouvez modifier <br /> vos coordonnées plus tard.</div>
</div>

<NextStep step="/onboarding/5" />
