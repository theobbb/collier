<script lang="ts">
	import { page } from '$app/state';
	import Dogs from './dogs.svelte';

	const { menu_open }: { menu_open?: boolean } = $props();

	const param = $derived(page.route.id?.split('/')?.[3] || '');
	const { dog } = $derived(page.data);

	const { journal, schedule } = $derived(dog);

	const current_i = $derived(Number(page.params.dog) || 0);

	let expanded_dogs = $state(false);

	const links = [
		{ name: 'Bilan', href: 'bilan', icon: 'icon-[ri--dashboard-3-line]' },
		{ name: 'Carte', href: 'track/map', icon: 'icon-[ri--send-plane-fill]' },
		{ name: 'Journal', href: 'journal', icon: 'icon-[ri--book-open-line]' }
		// { name: 'Menu', href: 'menu', icon: 'icon-[ri--menu-line]' }
	];

	const sub_buttons = [
		// {
		// 	icon: 'icon-[ri--arrow-right-s-line]',
		// 	onclick: () => {
		// 		expanded_dogs = !expanded_dogs;
		// 	}
		// },
		{ icon: 'icon-[tabler--school-bell]', onclick: () => {} },
		{ icon: 'icon-[ri--mic-line]', onclick: () => {} }
	];

	// const menu_open = $derived(page.route.id?.split('/')?.[3] == 'menu');
</script>

<!-- <div class="absolute inset-0 bg-linear-to-b from-transparent to-black/5"></div> -->
<nav
	class={[
		'relative m-2x flex w-full items-end justify-between',
		menu_open ? 'translate-y-44 opacity-0' : ''
	]}
	style="view-transition-name: nav;"
>
	<div
		class="pointer-events-none absolute -right-2x -bottom-2x -left-2x h-64 bg-linear-to-b from-transparent to-white"
	></div>
	<div class="flex gap-2x">
		<div class="">
			<Dogs expanded={expanded_dogs} />
		</div>
		<div class="flex-col- mt-2 flex gap-2x">
			{#each sub_buttons as { icon, onclick }}
				<button
					class="card transparent pointer-events-auto flex size-11 items-center justify-center text-2xl shadow-xs backdrop-blur-xl"
					{onclick}
					title={icon}
				>
					<span class={[icon]}></span>
				</button>
			{/each}
		</div>
	</div>

	<div class="flex-col- -ml-24 flex gap-2x">
		{#each links as { name, href, icon }}
			<a
				href="/app/{page.params.dog}/{href}"
				class={[
					'card transparent pointer-events-auto flex size-15 flex-col items-center justify-center gap-px px-2x  pb-1.5',
					href.startsWith(param) ? 'bg-active! ' : ''
				]}
			>
				<span class={[icon, 'mt-1.5 shrink-0 text-3xl']}></span>
				<span class="text-xs font-medium tracking-tight">{name}</span>
			</a>
		{/each}
	</div>
</nav>

<style>
	/* ::view-transition-old(nav),
	::view-transition-new(nav) {
		animation-duration: 3000ms;
		animation-timing-function: ease-in-out;
	} */
</style>
