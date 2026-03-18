<script lang="ts">
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import CarnetMedical from '$lib/ui/templates/carnet-medical.svelte';
</script>

<CarnetMedical dog={data.dogs[Number(page.params.dog) || 0]} />
