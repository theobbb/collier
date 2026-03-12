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
};

const STORAGE_KEY = 'DOGS';

// 2. Initialize the state (Checking localStorage immediately since SSR is off)
const saved = localStorage.getItem(STORAGE_KEY);
export const data: Data = $state(saved ? JSON.parse(saved) : seed);

// 3. Auto-save effect
// $effect.root ensures this listener stays alive globally
$effect.root(() => {
	$effect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		// console.log('Data saved to storage!', data);
	});
});

// 4. Helper functions (Optional, since you can edit 'data' directly)
export function get_data() {
	return data;
}

export function reset_data() {
	Object.assign(data, seed);
}
