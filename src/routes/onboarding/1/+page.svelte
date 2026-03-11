<script>
	import { data } from '$lib/data.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Input from '$lib/ui/components/form/fields/input.svelte';
</script>

<div class="mb-3x space-y-4x text-2xl leading-tight">
	<div>Vous êtes la première personne <br /> qui scanne ce collier !</div>
	<div>C’est un grand moment pour...</div>
</div>
<Input name="" label="Nom du chien" bind:value={data.dogs[0].name} />
<div class="mt-4x text-right">
	<Button size="lg" href="/onboarding/2" variant="action">Continuer</Button>
</div>
<div class="fixed right-2x bottom-4x left-2x flex flex-col items-center text-xs">
	<div>Vous n’êtes pas propriétaire de ce chien ?</div>
	<div>Chien oublié →</div>
</div>
