// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Dog } from '$lib/data.svelte';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			dog: Dog;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
