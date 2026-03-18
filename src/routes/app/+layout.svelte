<script lang="ts">
	import Nav from './nav.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	const { children } = $props();

	const route_order = [
		'/app/[dog]/bilan',
		'/app/[dog]/track',
		'/app/[dog]/journal',
		'/app/[dog]/menu'
	];
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (navigation.from?.route.id === navigation.to?.route.id) return;

		const find_route_index = (route_id: string) => {
			const menu_route = '/app/[dog]/menu';
			if (route_id.startsWith(menu_route) && route_id.length > menu_route.length) return 100;
			return route_order.findIndex((r) => route_id.startsWith(r));
		};

		const from_index = find_route_index(navigation.from?.route.id ?? '');
		const to_index = find_route_index(navigation.to?.route.id ?? '');
		const direction = to_index >= from_index ? 'forward' : 'back';

		// const routeSegment = (route_id: string) => route_id.split('/').at(-1) ?? '';
		// document.documentElement.dataset.from = routeSegment(navigation.from?.route.id ?? '');
		// document.documentElement.dataset.to = routeSegment(navigation.to?.route.id ?? '');

		if (from_index !== -1 && to_index !== -1) {
			document.documentElement.dataset.direction = direction;
		} else {
			delete document.documentElement.dataset.direction;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const menu_open = $derived(page.route.id?.split('/')?.[3] == 'menu');
</script>

<div class=" fixed top-3x right-3x z-300" style="view-transition-name: menu-toggle;">
	<a
		href="/app/{page.params.dog}/menu?from={encodeURIComponent(page.url.pathname)}"
		title="toggle menu"
	>
		<span class="icon-[ri--menu-fill] text-2xl"></span>
	</a>
</div>

<div class="mb-54">{@render children()}</div>

<!-- <main style="view-transition-name: main;">{@render children()}</main> -->
<div class={['pointer-events-none fixed right-0 bottom-0 left-0 flex items-end justify-between']}>
	{#if menu_open}
		<Nav menu_open />
	{:else}
		<Nav />
	{/if}
</div>
<!-- {#if menu_open}
	<div class={['backdrop fixed inset-0 -z-10']} style="view-transition-name: backdrop;"></div>
{:else}
	<div
		class={['backdrop fixed inset-0 -z-10 opacity-0']}
		style="view-transition-name: backdrop;"
	></div>
{/if} -->
