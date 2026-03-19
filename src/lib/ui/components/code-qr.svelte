<script lang="ts">
	import QRCode from 'qrcode';

	let { value, color = '#000000' }: { value: string; color?: string } = $props();

	// Derived promise that tracks 'value' and 'color'
	let svg = $derived(
		QRCode.toString(value, {
			type: 'svg',
			color: { dark: color, light: '#00000000' }
		})
	);
</script>

{#await svg then xml}
	{@html xml}
{/await}
