<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="mx-3x my-2x">
	{@render children()}
</div>

<svelte:head><link rel="icon" href="/favicon.ico" /></svelte:head>
