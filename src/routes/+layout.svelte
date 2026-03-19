<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import './layout.css';

	let { children } = $props();

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

			if (route_id.startsWith('/onboarding')) {
				const step = Number(route_id.split('/').pop() || 0);
				console.log(step);
				return 100 + step;
			}
			const onboarding_route = '/onboarding';
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
</script>

<div class="mx-3x my-3x">
	{@render children()}
</div>

<svelte:head><link rel="icon" href="/favicon.ico" /></svelte:head>
