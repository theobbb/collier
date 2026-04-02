<script lang="ts">
	import Button from '$lib/ui/components/button.svelte';
	import DialogHeader from '$lib/ui/components/pop/dialog/dialog-header.svelte';
	import DialogTitle from '$lib/ui/components/pop/dialog/dialog-title.svelte';
	import Dialog from '$lib/ui/components/pop/dialog/dialog.svelte';
	import { Pop } from '$lib/ui/components/pop/pop-context.svelte';
	import Title from '$lib/ui/components/title.svelte';

	let active = $state(true);

	const pop = new Pop();
	function ontoggle() {
		if (active) pop.show();
	}
</script>

<Title>Accueil</Title>
<div class="corner border bg-gray-100 p-3x">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2 text-xl font-medium">
			<span class="icon-[ri--checkbox-circle-line]"></span>
			<div>Collier actif</div>
		</div>
		<button onclick={pop.show}>
			<span
				class={['bg-accent text-5xl', active ? 'icon-[ri--toggle-fill]' : 'icon-[ri--toggle-line]']}
			></span>
		</button>
	</div>
</div>
<div class=" mx-12 mt-8 flex flex-col items-center">
	<img src="/collier.png" class=" w-full object-contain" alt="" />
	<div class="mt-2- relative flex flex-col items-center justify-center">
		<svg class="size-24 -rotate-90 transform">
			<circle
				cx="48"
				cy="48"
				r="40"
				stroke="currentColor"
				stroke-width="10"
				fill="transparent"
				class="text-gray-200"
			/>
			<circle
				cx="48"
				cy="48"
				r="40"
				stroke="currentColor"
				stroke-width="10"
				fill="transparent"
				stroke-dasharray="251.3"
				stroke-dashoffset="62.8"
				stroke-linecap="round"
				class="text-progress transition-all duration-500 ease-out"
			/>
		</svg>

		<span class="absolute flex flex-col items-center justify-center text-xl">
			<span class="icon-[ri--battery-charge-line] shrink-0 text-4xl text-muted"></span>
		</span>
	</div>
	<div class="corner mt-1 ml-1 text-xl font-semibold">75%</div>
</div>

<Dialog {pop}>
	<div class="text-2xl">{active ? 'Désactiver le collier ?' : 'Activer le collier ?'}</div>

	<div class="mt-3x grid grid-cols-2 gap-2x">
		<Button onclick={pop.close} class="min-w-[unset]! px-0!">Annuler</Button>
		<Button
			onclick={() => {
				active = !active;
				pop.close();
			}}
			variant="action"
			size="lg"
			class="min-w-[unset]! px-0!">Confirmer</Button
		>
	</div>
</Dialog>
