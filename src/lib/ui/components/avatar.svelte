<script lang="ts">
	const {
		index = 0,
		size: size_options = 'md'
	}: { index?: number; size?: 'sm' | 'md' | 'lg' | 'full' } = $props();

	const options = {
		sm: '24',
		md: '36px',
		lg: '84px',
		full: '100%'
	};
	const size = $derived(options[size_options]);
</script>

<svg width={size} height={size}>
	<use href="/avatars.svg#avatar-{index}" />
</svg>
