<script>
	import { data } from '$lib/data.svelte';

	import Nom from '$lib/ui/templates/nom.svelte';
	import NextStep from '../next-step.svelte';
</script>

<Nom dog={data.dogs[1]} onboarding />

<NextStep step="/onboarding/2" />
