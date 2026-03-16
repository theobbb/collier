<script lang="ts">
	import { page } from '$app/state';

	const { children } = $props();

	const is_map = $derived(page.route.id == '/app/[dog]/track/map');

	const toggle_href = $derived(
		is_map
			? page.url.pathname.replace('/map', '/camera')
			: page.url.pathname.replace('/camera', '/map')
	);
</script>

<div class="grid grid-rows-[auto_1fr] gap-0.5">
	<div class="flex justify-center">
		<a href={toggle_href} class="card relative flex gap-3 p-3 text-2xl" title="toggle-view">
			<div class={['icon-[ri--road-map-line]', !is_map && 'opacity-60', 'transition']}></div>
			<div class={['icon-[ri--camera-4-line]', is_map && 'opacity-60', 'transition']}></div>
			<div
				class={[
					'corner absolute top-1.5 left-1.5 size-9 bg-black/15',
					is_map ? '' : 'translate-x-9',
					'transition'
				]}
			></div>
		</a>
	</div>
	<div class="card relative my-0.5 h-[calc(100svh-13.1rem)] w-full overflow-hidden">
		<div class="relative h-full w-full">{@render children()}</div>
	</div>
</div>
