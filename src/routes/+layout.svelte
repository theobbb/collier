<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="font-comic- mx-3x- m-0.5">
	{@render children()}
</div>

<svelte:head><link rel="icon" href="/favicon.ico" /></svelte:head>
