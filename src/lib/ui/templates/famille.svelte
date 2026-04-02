<script>
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Human from '$lib/ui/components/human.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import CodeQr from '../components/code-qr.svelte';
	import Dialog from '../components/pop/dialog/dialog.svelte';
	import { Pop } from '../components/pop/pop-context.svelte';

	const pop = new Pop();
</script>

<div class="card border p-3x">
	<Title icon="icon-[ri--group-line]">Famille</Title>
	<div class="mb-4x py-1x text-muted">
		Invitez les proches de {data.dogs[1].name} <br /> à rejoindre l’application.
	</div>

	<div class="flex flex-col gap-3x text-lg">
		{#each data.family as human}
			<Human {human} name />
		{/each}
		<div>
			<Button class="w-full" onclick={pop.show} icon="icon-[ri--add-line]">Inviter</Button>
		</div>
	</div>
</div>

<Dialog {pop}>
	<Title icon="icon-[ri--user-line]">Invitation</Title>

	<div class="text-muted">Faites scanner ce code QR <br /> par la personne invitée.</div>

	<div class="size-46-">
		<CodeQr value="https://www.youtube.com/shorts/fik6oexAJHQ" />
	</div>
</Dialog>
