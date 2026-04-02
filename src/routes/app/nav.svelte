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
		{ name: 'Accueil', href: 'dashboard', icon: 'icon-[ri--home-line]' },

		{ name: 'Bilan', href: 'bilan', icon: 'icon-[ri--dashboard-3-line]' },
		{ name: 'Carte', href: 'track/map', icon: 'icon-[ri--map-pin-2-line]' },
		{ name: 'Journal', href: 'journal', icon: 'icon-[ri--book-line]' }
		// { name: 'Menu', href: 'menu', icon: 'icon-[ri--menu-line]' }
	];
	const current_link_i = $derived(links.findIndex((l) => l.href.startsWith(param)));
	const sub_buttons = [
		{ icon: 'icon-[tabler--school-bell]', onclick: () => {} },
		{ icon: 'icon-[ri--mic-line]', onclick: () => {} }
	];
</script>

<nav
	class={[
		'relative m-2x flex w-full items-end justify-between',
		menu_open ? 'translate-y-44 opacity-0' : ''
	]}
	style="view-transition-name: nav;"
>
	<div
		class="pointer-events-none absolute -right-2x -bottom-2x -left-2x h-64 bg-linear-to-b from-transparent to-white/60"
	></div>
	<div class="flex gap-2x">
		<div class="">
			<Dogs />
		</div>
		<!-- <div class="flex-col- mt-2 flex gap-2x">
			{#each sub_buttons as { icon, onclick }}
				<button
					class="card transparent pointer-events-auto flex size-11 items-center justify-center text-2xl shadow-xs backdrop-blur-xl"
					{onclick}
					title={icon}
				>
					<span class={[icon]}></span>
				</button>
			{/each}
		</div> -->
	</div>

	<div class="card gap-2x- -ml-24- relative flex">
		<!-- <div
			class="corner absolute size-12 bg-active transition"
			style="transform: translateX({current_link_i * 100}%)"
		></div> -->

		{#each links as { name, href, icon }}
			<a
				href="/app/{page.params.dog}/{href}"
				class={[
					'  corner pointer-events-auto flex size-15 flex-col items-center justify-center gap-px px-2x  pb-1.5',
					href.startsWith(param) ? 'bg-accent text-background' : '',
					'transition'
				]}
			>
				<span class={[icon, 'mt-2.5 shrink-0 text-3xl']}></span>
				<span class="mt-0.5 mb-0.5 text-xs font-semibold tracking-tight">{name}</span>
			</a>
		{/each}
	</div>
</nav>
