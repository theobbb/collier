<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		name,
		icon,
		timeline,
		delta,
		children
	}: { name: string; icon: string; timeline: number[][]; delta: number; children: Snippet } =
		$props();
</script>

<div class="corner flex w-full flex-col gap-4 border border-black/20 bg-surface px-3x py-2x">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-1">
			<div class="corner flex aspect-square size-6 items-center justify-center">
				<div class={[icon, 'text-xl']}></div>
			</div>
			<div class="font-medium">{name}</div>
		</div>
		<div class="">
			<div class="icon-[ri--arrow-right-s-line] text-xl text-black/30"></div>
		</div>
	</div>
	<div class="flex w-full flex-col gap-1x">
		<div class="relative">
			<div class="corner relative h-4.5 w-full overflow-hidden bg-black/5">
				{#each timeline as [start, end]}
					<div
						class="corner absolute h-full w-full origin-left bg-progress"
						style="width: {(end - start) / 1.5}%; left: {start / 1.5}%;"
					></div>
				{/each}
			</div>
			<div class="absolute top-0 left-2/3 h-full w-0.5 bg-black/80"></div>
			<div class="absolute top-0 grid h-full w-full grid-cols-12">
				{#each { length: 12 } as _, i}
					<div class="border-black/20- h-full border-r last:hidden"></div>
				{/each}
			</div>
		</div>
		<div class="mt-3x flex w-full items-end justify-between gap-2 font-medium">
			<div class="flex items-end gap-3x">
				{@render children()}
			</div>
			<div
				class={[
					'corner flex items-center border py-0.5 pr-1.5 pl-0.5 text-xs',
					Math.sign(delta) == 1 ? 'bg-green-400/40' : 'bg-red-400/40'
				]}
			>
				<div
					class={[
						'-mr-0.5 icon-[ri--arrow-drop-down-line] text-base',
						Math.sign(delta) == 1 && 'rotate-180'
					]}
				></div>
				<span class="">{Math.abs(delta)} %</span>
			</div>
		</div>
	</div>
</div>
<!-- <div class="flex w-full gap-2 border px-3x py-2x">
	<div class="flex w-42 items-center gap-2">
		<div class="corner flex aspect-square size-8 items-center justify-center bg-black/10">
			<div class={[icon, 'text-2xl']}></div>
		</div>
		<div class="text-sm font-medium">{name}</div>
	</div>
	<div class="flex w-full flex-col gap-1x">
		<div>
			<div class="h-3 w-full bg-black/20"></div>
		</div>
		<div class="flex gap-3 text-base font-medium">{@render children()}</div>
	</div>
</div> -->
