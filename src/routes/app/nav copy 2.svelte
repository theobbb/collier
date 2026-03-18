<script>
	import { page } from '$app/state';
	import { store } from '$lib/store.svelte';
	import Button from '$lib/ui/components/button.svelte';
	import Grid from '$lib/ui/components/grid.svelte';
	import ScheduleItem from '$lib/ui/components/schedule-item.svelte';
	import Dogs from './dogs.svelte';
	import Menu from './menu.svelte';

	const param = $derived(page.route.id?.split('/')?.[3] || '');
	const { dog } = $derived(page.data);
	const { journal, schedule } = $derived(dog);
	$inspect(param);

	const current_i = $derived(Number(page.params.dog) || 0);

	const links = [
		{ name: 'Bilan', href: 'bilan', icon: 'icon-[ri--dashboard-3-line]' },
		{ name: 'Carte', href: 'track/map', icon: 'icon-[ri--send-plane-fill]' },
		{ name: 'Journal', href: 'journal', icon: 'icon-[ri--book-line]' },
		{ name: 'Menu', href: 'menu', icon: 'icon-[ri--menu-line]' }
	];
</script>

<Menu />

<div class="pointer-events-none fixed right-0 bottom-0 left-0 flex items-end justify-between">
	<div class="pointer-events-auto grid w-full grid-cols-12 grid-rows-2 gap-1">
		<!-- <div class="col-span-4"><ScheduleItem type="meal" time={schedule.meal} /></div>
		<div class="col-span-4"><ScheduleItem type="walk" time={schedule.walk} /></div> -->

		<!-- <div class="card row-span-2">
			<div class="text-xs font-medium">53%</div>
		</div> -->
		<!-- <a class="card col-start-1" href={page.route.id?.replace('[dog]', String(current_i + 1))}>
			<div class="text-xs font-medium">↑</div>
		</a>
		<a
			class="card col-start-1 row-start-2"
			href={page.route.id?.replace('[dog]', String(current_i - 1))}
		>
			<div class="text-xs font-medium">↓</div>
		</a> -->
		<Dogs />

		{#each links as { name, href, icon }}
			<a
				href="/app/{page.params.dog}/{href}"
				class={[
					'corner pointer-events-auto col-span-3 flex flex-col items-center justify-center gap-1 px-2x pb-1.5 text-xs font-medium',
					href.startsWith(param) ? 'bg-active ' : 'bg-neutral-300'
				]}
			>
				<span class={[icon, 'mt-1.5 text-3xl']}></span>
				{name}
			</a>
		{/each}
	</div>
</div>
