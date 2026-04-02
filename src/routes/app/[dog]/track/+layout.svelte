<script lang="ts">
	import { page } from '$app/state';
	import Stats from './stats.svelte';

	const { children } = $props();

	const is_map = $derived(page.route.id == '/app/[dog]/track/map');

	const toggle_href = $derived(
		is_map
			? page.url.pathname.replace('/map', '/camera')
			: page.url.pathname.replace('/camera', '/map')
	);
</script>

<div class="pointer-events-none fixed right-0 bottom-44 left-0">
	<div class="flex justify-center">
		<button class="corner flex items-center justify-center border bg-gray-100 p-3x shadow-sm">
			<div class="icon-[ri--mic-line] text-5xl"></div>
		</button>
	</div>
</div>

<div class="fixed top-5 left-5" style="view-transition-name: track-stats;">
	<Stats />
</div>
<div class="grid grid-rows-[auto_1fr] gap-0.5">
	<div class="flex justify-center" style="view-transition-name: toggle-track;">
		<a
			href={toggle_href}
			class="card relative flex gap-3 p-3 text-2xl shadow-xs"
			title="toggle-view"
		>
			<div
				class={[
					'corner absolute top-1.5 left-1.5 size-9 border bg-active shadow-xs',
					is_map ? '' : 'translate-x-9',
					'transition'
				]}
			></div>
			<div class={['icon-[ri--road-map-line]', !is_map && 'opacity-60', 'transition']}></div>
			<div class={['icon-[ri--camera-4-line]', is_map && 'opacity-60', 'transition']}></div>
		</a>
	</div>
	<div class="card fixed inset-0 -z-10">
		{@render children()}

		<!-- <div
			class="pointer-events-none absolute top-0 right-0 left-0 h-32 bg-linear-to-t from-transparent to-white"
		></div> -->
	</div>
	<!-- <div class="card relative my-0.5 h-[calc(100svh-11.5rem)] w-full overflow-hidden">
		<div class="relative h-full w-full">{@render children()}</div>
	</div> -->
</div>
