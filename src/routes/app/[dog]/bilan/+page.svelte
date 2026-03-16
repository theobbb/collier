<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/ui/components/button.svelte';

	const { dog } = $derived(page.data);
	const { journal, schedule } = $derived(dog);

	const cx = {
		container: 'card border px-2x',
		header: 'flex text-2  items-center gap-2',
		label: 'text-xs/3.5 font-medium'
	};
</script>

<div class="grid grid-cols-12 gap-0.5">
	<div class="card col-span-full flex min-h-32 items-center justify-between px-4">
		<div class="text-2xl">Bilan de la journée</div>
		<div class="icon-[ri--file-settings-line] text-2xl"></div>
	</div>

	<div class={['col-span-8', cx.container]}>
		<div class={[cx.header]}>
			<div class={[cx.label]}>distance parcourue</div>
			<span class="icon-[ri--footprint-fill]"></span>
		</div>
		<div>13284 pas</div>
		<div>4 km</div>
	</div>

	<div class={['col-span-4', cx.container]}>
		<div class={[cx.header]}>
			<div class={[cx.label]}>calories brûlées</div>
			<span class="icon-[ri--fire-fill]"></span>
		</div>
		<div>1200 cal.</div>
		<div>/1000</div>
	</div>

	<div class={['col-span-6', cx.container]}>
		<div class={[cx.header]}>
			<div class={[cx.label]}>japement</div>
			<span class="icon-[ri--volume-vibrate-fill]"></span>
		</div>
		<div>
			<div>24 fois</div>
			<div>~60 dB</div>
		</div>
	</div>

	<div class={['col-span-6', cx.container]}>
		<div class={[cx.header]}>
			<div class={[cx.label]}>sommeil</div>
			<span class="icon-[ri--hotel-bed-fill]"></span>
		</div>
		<div>11:04</div>
	</div>
</div>
