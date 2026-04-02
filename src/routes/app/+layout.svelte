<script lang="ts">
	import Nav from './nav.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	const { children } = $props();

	const menu_open = $derived(page.route.id?.split('/')?.[3] == 'menu');
</script>

<div
	class={['fixed top-3x right-3x z-300', menu_open ? 'opacity-0' : '', 'transition ease-in-out']}
	style="view-transition-name: menu-toggle;"
>
	<a
		href="/app/{page.params.dog}/menu?from={encodeURIComponent(page.url.pathname)}"
		title="toggle menu"
		class="corner flex items-center justify-center border bg-gray-100 p-1.5 shadow-sm"
	>
		<span class="icon-[ri--menu-fill] text-2xl"></span>
	</a>
</div>

<div class={[!page.route.id?.startsWith('/app/[dog]/menu') && 'mb-54']}>{@render children()}</div>

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
