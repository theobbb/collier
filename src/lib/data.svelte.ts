import { page } from '$app/state';
import { seed } from './seed';

export type Dog = {
	i: number;
	name: string;
	avatar: number;
	born: number;
	race: string;
	sex: 0 | 1;
	color: string;
	journal: JournalEntry[];
	schedule: {
		meal: string;
		walk: string;
	};
};

export type Human = {
	name: string;
	color: string;
};

export type JournalEntry = {
	type: 'meal' | 'walk';
	author: number;
	time: string;
	shit: boolean;
};

type Contact = {
	name: string;
	adress: string;
	zip_code: string;
	phones: string[];
};

export type Data = {
	dogs: Dog[];
	current_dog: number;
	family: Human[];
	contact: Contact;
	version: string;
};

const STORAGE_VERSION = '1.3';

const STORAGE_KEY = 'DOGS';

// 2. Initialize the state (Checking localStorage immediately since SSR is off)
const saved = localStorage.getItem(STORAGE_KEY);

function get_saved(): Data {
	if (saved) {
		const parsed: Data = JSON.parse(saved);
		if (parsed.version == STORAGE_VERSION) return parsed;
	}
	return seed;
}
export const data: Data = $state(get_saved());

// 3. Auto-save effect
// $effect.root ensures this listener stays alive globally
$effect.root(() => {
	$effect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		// console.log('Data saved to storage!', data);
	});
});

export function reset_data() {
	Object.assign(data, seed);
}
