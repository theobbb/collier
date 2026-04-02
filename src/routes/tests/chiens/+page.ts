import { tests } from '$lib/tests.svelte';
import { redirect } from '@sveltejs/kit';

export function load() {
	tests.chiens = !tests.chiens;
	redirect(307, '/app/1/track/map');
}
