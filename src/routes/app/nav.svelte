<script>
	import { page } from '$app/state';
	import { store } from '$lib/store.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Dogs from './dogs.svelte';
	import Menu from './menu.svelte';

	const param = $derived(store.pop_menu.open ? 'menu' : page.route.id?.split('/')?.[3]);

	// const links = [
	// 	{ label: 'Menu', icon: 'icon-[ri--menu-line]', onclick: () => {} },
	// 	{ label: 'Carte', icon: 'icon-[ri--send-plane-fill]', onclick: () => {} }
	// ];
</script>

<Menu />
<div class="fixed right-0 bottom-0 left-0">
	<div><Dogs /></div>

	<!-- {#if param == 'journal'}
		<Button icon="icon-[ri--sticky-note-add-line]" class="w-full">Ajouter</Button>
	{/if} -->
	<div class="mx-2x my-2x flex justify-between bg-white p-1 text-xs font-medium">
		<div class={['flex flex-col items-center px-2x pb-1.5', store.pop_menu.open && 'bg-black/20 ']}>
			<Button
				class=""
				icon="icon-[ri--menu-line]"
				variant="ghost"
				size="lg"
				onclick={store.pop_menu.toggle}
			/>
			Menu
		</div>
		<div class={['flex flex-col items-center px-2x pb-1.5', !param && 'bg-black/20']}>
			<Button
				href="/app/{page.params.dog}"
				class=""
				icon="icon-[ri--send-plane-fill]"
				variant="ghost"
				size="lg"
			/>
			Carte
		</div>
		<div
			class={[
				'rounded- flex flex-col items-center px-2x pb-1.5',
				param == 'journal' && 'bg-black/20 '
			]}
		>
			<Button
				href="/app/{page.params.dog}/journal"
				class=""
				icon="icon-[ri--book-line]"
				variant="ghost"
				size="lg"
			/>
			Journal
		</div>
	</div>
</div>
