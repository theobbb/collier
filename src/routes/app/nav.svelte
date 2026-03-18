<script>
	import { page } from '$app/state';

	import Dogs from './dogs.svelte';

	const param = $derived(page.route.id?.split('/')?.[3] || '');
	const { dog } = $derived(page.data);
	const { journal, schedule } = $derived(dog);

	const current_i = $derived(Number(page.params.dog) || 0);

	const links = [
		{ name: 'Bilan', href: 'bilan', icon: 'icon-[ri--dashboard-3-line]' },
		{ name: 'Carte', href: 'track/map', icon: 'icon-[ri--send-plane-fill]' },
		{ name: 'Journal', href: 'journal', icon: 'icon-[ri--book-line]' }
		// { name: 'Menu', href: 'menu', icon: 'icon-[ri--menu-line]' }
	];
</script>

<div class="pointer-events-none fixed right-0 bottom-0 left-0 flex items-end justify-between">
	<div class="grid-rows-2- pointer-events-auto grid w-full grid-cols-12 gap-1">
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
		<!-- <Dogs /> -->

		<div
			class="corner col-span-full mx-3x my-2 grid grid-cols-6 gap-1 overflow-hidden bg-white/50 px-1 py-1"
		>
			<Dogs />
			{#each links as { name, href, icon }}
				<a
					href="/app/{page.params.dog}/{href}"
					class={[
						'corner pointer-events-auto row-start-2 flex flex-col items-center justify-center gap-0.5 px-2x pb-1.5 text-xs font-medium',
						href.startsWith(param) ? 'bg-active ' : 'bg-neutral-300'
					]}
				>
					<span class={[icon, 'mt-1.5 text-2xl']}></span>
					{name}
				</a>
			{/each}
		</div>
	</div>
</div>
