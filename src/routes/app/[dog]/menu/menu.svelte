<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { icons } from '$lib/icons';
	import { store } from '$lib/store.svelte';
	import Grid from '$lib/ui/components/grid.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import Group from './group.svelte';
	import Item from './item.svelte';

	const from = $derived(
		decodeURIComponent(page.url.searchParams.get('from') || '') || `/app/${page.params.dog}/bilan`
	);

	onNavigate(() => {
		store.pop_menu.close();
	});
</script>

<!-- {#if menu_open}
	<div class={['backdrop fixed inset-0 -z-10']} style="view-transition-name: backdrop;"></div>
{:else}
	<div
		class={['backdrop fixed inset-0 -z-10 opacity-0']}
		style="view-transition-name: backdrop;"
	></div>
{/if} -->

<div
	class={[
		'fixed inset-0 z-100  -mt-3x ml-5x min-h-screen',
		store.pop_menu.open ? '' : 'pointer-events-none translate-x-44 opacity-0',
		'transition ease-in-out'
	]}
	style="view-transition-name: menu;"
>
	<button
		onclick={store.pop_menu.close}
		class={['backdrop op-0 absolute inset-0 right-0 bottom-0 left-5x z-20 -translate-x-full']}
	></button>
	<div class=" z-30 min-h-screen bg-background pt-3x">
		<!-- <Title icon="icon-[ri--menu-line]">Menu</Title> -->

		<div class="space-y-3x pt-2x">
			<Group label="Chien(s)">
				<Item href="/app/{page.params.dog}/menu/nom" icon={icons.carnet}>Nom</Item>
				<Item href="/app/{page.params.dog}/menu/avatar" icon="icon-[ri--user-line]">Avatar</Item>
				<Item href="/app/{page.params.dog}/menu/carnet" icon={icons.carnet}>Carnet médical</Item>
			</Group>
			<Group label="Général">
				<Item href="/app/{page.params.dog}/menu/coordonnees" icon="icon-[ri--user-line]"
					>Vos coordonnées</Item
				>
				<Item href="/app/{page.params.dog}/menu/famille" icon="icon-[ri--group-line]">Famille</Item>
			</Group>
			<Group label="Système">
				<Item href="/app/{page.params.dog}/menu/404" icon="icon-[ri--notification-3-line]">
					Notifications
				</Item>
				<Item href="/app/{page.params.dog}/menu/404" icon="icon-[ri--information-2-line]"
					>Support</Item
				>
				<Item href="/app/{page.params.dog}/menu/404" icon="icon-[ri--accessibility-line]"
					>Accessibilité</Item
				>
			</Group>
		</div>
	</div>
</div>
