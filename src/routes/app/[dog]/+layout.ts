import { data } from '$lib/data.svelte.js';

export function load({ params }) {
	const dog = data.dogs[Number(params.dog)];

	return { dog };
}
