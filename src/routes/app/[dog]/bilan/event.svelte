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

<div class="corner flex w-full flex-col gap-2 border border-black/20 bg-surface px-3x py-2x">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-1">
			<div class="corner bg-black/10- flex aspect-square size-6 items-center justify-center">
				<div class={[icon, 'text-']}></div>
			</div>
			<div class="text-sm font-medium">{name}</div>
		</div>
		<div>
			<div class="icon-[ri--more-line]"></div>
		</div>
	</div>
	<div class="flex w-full flex-col gap-1x">
		<div>
			<div class="corner relative h-3 w-full overflow-hidden bg-black/15">
				{#each timeline as [start, end]}
					<div
						class="absolute h-full w-full origin-left bg-progress"
						style="transform: scaleX({(end - start) / 100}); left: {start}%;"
					></div>
				{/each}
			</div>
		</div>
		<div class="mt-1x flex w-full items-center justify-between gap-2 font-medium">
			<div class="flex gap-3x text-base">
				{@render children()}
			</div>
			<div
				class={[
					'corner flex items-center border pr-1x text-xs',
					Math.sign(delta) == 1 ? 'bg-green-500/50' : 'bg-red-500/50'
				]}
			>
				<div
					class={[
						'-mr-0.5 icon-[ri--arrow-drop-down-line] text-sm',
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
