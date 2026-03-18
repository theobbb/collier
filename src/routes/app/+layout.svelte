<script lang="ts">
	import Menu from './menu.svelte';
	import Nav from './nav.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	const { children } = $props();

	const route_order = ['/app/[dog]/bilan', '/app/[dog]/journal', '/app/[dog]/menu'];

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		const fromIndex = route_order.indexOf(navigation.from?.route.id ?? '');
		const toIndex = route_order.indexOf(navigation.to?.route.id ?? '');
		const direction = toIndex >= fromIndex ? 'forward' : 'back';

		if (fromIndex !== -1 && toIndex !== -1) {
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

	let menu_open = $state(false);

	function open_menu() {
		document.documentElement.style.overflow = 'hidden';
		menu_open = true;
	}
	function close_menu() {
		document.documentElement.style.overflow = 'auto';
		menu_open = false;
	}
	function toggle_menu() {
		if (menu_open) close_menu();
		else open_menu();
	}
</script>

<div class="fixed top-3x right-3x z-300">
	<a href="/app/{page.params.dog}/menu" title="toggle menu">
		<span class="icon-[ri--menu-fill] text-2xl"></span>
	</a>
</div>

<div>
	{@render children()}

	<Nav />
</div>

<!-- <div
	class={[
		'fixed top-0 right-0 bottom-0 left-24 z-200',
		menu_open ? '' : 'pointer-events-none translate-8 opacity-0',
		'transition'
	]}
>
	<Menu />
</div> -->
