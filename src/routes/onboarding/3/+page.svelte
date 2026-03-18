<script>
	import { page } from '$app/state';
	import { data } from '$lib/data.svelte';
	import CarnetMedical from '$lib/ui/templates/carnet-medical.svelte';
	import NextStep from '../next-step.svelte';

	const url_avatar = page.url.searchParams.get('avatar');
	if (url_avatar) {
		data.dogs[1].avatar = Number(url_avatar);
	}
</script>

<CarnetMedical dog={data.dogs[1]} />

<NextStep step="/onboarding/4" />
