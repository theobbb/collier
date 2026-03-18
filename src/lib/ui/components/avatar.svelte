<script lang="ts">
	const { index = 0 }: { index?: number; size?: 'sm' | 'md' | 'lg' | 'full' } = $props();
</script>

<svg width="100%" viewBox="0 0 100 100" class="drop-shadow-xs">
	<use href="/avatars.svg#avatar-{index}" />
</svg>
