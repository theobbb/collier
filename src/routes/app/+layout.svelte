<script lang="ts">
	import Menu from './menu.svelte';
	import Nav from './nav.svelte';

	const { children } = $props();

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
	<button onclick={toggle_menu} title="toggle menu">
		<span class="icon-[ri--menu-fill] text-2xl"></span>
	</button>
</div>
<div>
	<div class="mt-4x-">
		{@render children()}
		<!-- <div class="mt-4x text-right">
			<Button href={next_step} variant="action">Continuer</Button>
		</div> -->
	</div>
	<Nav />
</div>

<div
	class={[
		'fixed top-0 right-0 bottom-0 left-24 z-200',
		menu_open ? '' : 'pointer-events-none translate-8 opacity-0',
		'transition'
	]}
>
	<Menu />
</div>
