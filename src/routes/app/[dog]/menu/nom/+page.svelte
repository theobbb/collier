<script lang="ts">
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Nom from '$lib/ui/templates/nom.svelte';
</script>

<Nom dog={data.dogs[Number(page.params.dog) || 0]} />
