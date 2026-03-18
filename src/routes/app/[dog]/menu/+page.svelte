<script lang="ts">
	import { page } from '$app/state';
	import { icons } from '$lib/icons';
	import Grid from '$lib/ui/components/grid.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import Group from './group.svelte';
	import Item from './item.svelte';

	const from = $derived(
		decodeURIComponent(page.url.searchParams.get('from') || '') || `/app/${page.params.dog}/bilan`
	);
</script>

<!-- {#if menu_open}
	<div class={['backdrop fixed inset-0 -z-10']} style="view-transition-name: backdrop;"></div>
{:else}
	<div
		class={['backdrop fixed inset-0 -z-10 opacity-0']}
		style="view-transition-name: backdrop;"
	></div>
{/if} -->

<div class="relative z-100 -mt-3x ml-5x min-h-screen">
	<a
		href={from}
		class={['backdrop fixed top-0 right-0 bottom-0 left-5x z-20 -translate-x-full']}
		style="view-transition-name: backdrop;"
	></a>
	<div class=" z-30 min-h-screen bg-background pt-3x">
		<Title icon="icon-[ri--menu]">Menu</Title>

		<div class="space-y-3x pt-2x">
			<Group label="Général">
				<Item href="/app/{page.params.dog}/menu/carnet" icon={icons.carnet}>Carnet médical</Item>
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

<!-- <div class=" min-h-56 bg-white p-3x">
	<a href="/onboarding">Onboarding</a>

	<div>Carnet médical</div>
	<div>Notifications</div>
	<div>Famille</div>
	<div>Coordonnées</div>
	<div>Help center</div>
	<div>Support</div>
</div> -->
