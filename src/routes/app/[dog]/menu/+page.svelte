<script lang="ts">
	import { page } from '$app/state';
	import { icons } from '$lib/icons';
	import Grid from '$lib/ui/components/grid.svelte';
	import Title from '$lib/ui/components/title.svelte';
	import Group from './group.svelte';
	import Item from './item.svelte';

	const links = [{ name: '' }];
</script>

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
		<Item icon="icon-[ri--notification-3-line]">Notifications</Item>
		<Item icon="icon-[ri--accessibility-line]">Accessibilité</Item>
		<Item icon="icon-[ri--notification-3-fill]">Support</Item>
	</Group>
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
