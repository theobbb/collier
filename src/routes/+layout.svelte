<script lang="ts">
	import { data, reset_data } from '$lib/data.svelte';
	import './layout.css';

	let { children } = $props();

	reset_data();
</script>

<div class="mx-3x my-2x">
	{@render children()}
</div>

<svelte:head><link rel="icon" href="/favicon.ico" /></svelte:head>
