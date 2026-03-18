<script>
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Human from '$lib/ui/components/human.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import NextStep from '../next-step.svelte';
</script>

<div class="card border p-3x">
	<Title icon="icon-[ri--user-line]">Famille</Title>
	<div class="mb-4x py-1x text-muted">
		Invitez les proches de {data.dogs[1].name} <br /> à rejoindre l’application.
	</div>

	<div class="flex flex-col gap-3x text-lg">
		{#each data.family as human}
			<Human {human} name />
		{/each}
		<div>
			<Button
				class="w-full"
				onclick={() => data.contact.phones.push('')}
				icon="icon-[ri--add-line]"
			>
				Inviter
			</Button>
		</div>
	</div>
</div>
<NextStep step="/app/1/track/map" />
