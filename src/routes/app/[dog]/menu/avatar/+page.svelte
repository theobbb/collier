<script lang="ts">
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/templates/avatar.svelte';

	import Nom from '$lib/ui/templates/nom.svelte';
</script>

<Avatar dog={data.dogs[Number(page.params.dog) || 0]} />
