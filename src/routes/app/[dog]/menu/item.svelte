<script lang="ts">
	import type { Snippet } from 'svelte';

	const { href, icon, children }: { href?: string; icon: string; children: Snippet } = $props();
</script>

<a {href} class="flex items-center justify-between gap-2 px-3x py-3x">
	<div class="flex items-center gap-2x font-medium">
		<div class={[icon]}></div>
		{@render children()}
	</div>
	<div class="icon-[ri--arrow-right-s-line]"></div>
</a>
