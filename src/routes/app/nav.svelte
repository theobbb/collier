<script>
	import { page } from '$app/state';
	import { store } from '$lib/store.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Grid from '$lib/ui/components/grid.svelte';
	import Dogs from './dogs.svelte';
	import Menu from './menu.svelte';

	const param = $derived(store.pop_menu.open ? 'menu' : page.route.id?.split('/')?.[3]);

	// const links = [
	// 	{ label: 'Menu', icon: 'icon-[ri--menu-line]', onclick: () => {} },
	// 	{ label: 'Carte', icon: 'icon-[ri--send-plane-fill]', onclick: () => {} }
	// ];

	const cx = {
		button:
			'card col-span-2 gap-1 text-xs font-medium flex flex-col items-center justify-center pointer-events-auto px-2x pb-1.5',
		icon: 'text-3xl mt-1.5'
	};
</script>

<Menu />
<div class="pointer-events-none fixed right-0 bottom-0 left-0 flex items-end justify-between">
	<div class="grid grid-cols-8 grid-rows-2 gap-0.5">
		<!-- <div class="card row-span-2">
			<div class="text-xs font-medium">53%</div>
		</div> -->
		<div class="card col-start-1">
			<div class="text-xs font-medium">↑</div>
		</div>
		<div class="card col-start-1 row-start-2">
			<div class="text-xs font-medium">↓</div>
		</div>
		<Dogs />

		<a
			href="/app/{page.params.dog}/bilan"
			class={[cx.button, store.pop_menu.open && 'bg-black/20 ']}
		>
			<span class={['icon-[ri--dashboard-3-line]', cx.icon]}></span>
			Bilan
		</a>
		<a href="/app/{page.params.dog}/track/map" class={[cx.button, 'bg-black/20 ']}>
			<span class={['icon-[ri--send-plane-fill]', cx.icon]}></span>
			Carte
		</a>
		<a href="/app/{page.params.dog}/journal" class={[cx.button, 'bg-black/20 ']}>
			<span class={['icon-[ri--book-line]', cx.icon]}></span>
			Journal
		</a>
		<button onclick={store.pop_menu.toggle} class={[cx.button, 'bg-black/20 ']}>
			<span class={['icon-[ri--menu-line]', cx.icon]}></span>
			Menu
		</button>
	</div>
</div>
