<script lang="ts">
	import { closed_infos } from '$lib/data.svelte';
	import type { Snippet } from 'svelte';

	const { id, children }: { id: string | number; children: Snippet } = $props();
</script>

{#if !closed_infos.has(id)}
	<div class="corner mb-4x border bg-accent px-3x py-3x text-background">
		<div class="items-center- flex justify-between gap-4">
			<div class="text-balance">
				<span class="mr-1 icon-[ri--information-line] translate-y-0.5"></span>

				{@render children()}
			</div>
			<div>
				<button
					class="corner flex items-center justify-center border bg-white/10 p-1.5 text-2xl"
					onclick={() => closed_infos.add(id)}
				>
					<div class="icon-[ri--close-line]"></div>
				</button>
			</div>
		</div>
	</div>
{/if}
