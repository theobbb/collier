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

type JournalEntry = {
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

const seed: Data = {
	dogs: [
		{
			i: 0,
			name: 'Napoléon',
			avatar: 16,
			born: 1996,
			race: 'Pit-bull & Langue-sortie',
			sex: 0,
			color: 'Brun',
			journal: [
				{ type: 'meal', author: 0, time: '2026-03-11T07:00:00', shit: false },
				{ type: 'walk', author: 0, time: '2026-03-11T07:30:00', shit: true },
				{ type: 'walk', author: 1, time: '2026-03-11T12:00:00', shit: false },
				{ type: 'meal', author: 1, time: '2026-03-11T17:00:00', shit: false },
				{ type: 'walk', author: 2, time: '2026-03-11T18:30:00', shit: true },
				{ type: 'walk', author: 3, time: '2026-03-11T21:00:00', shit: false }
			]
		},
		{
			i: 1,
			name: 'Maître UX',
			avatar: 6,
			born: 1996,
			race: 'Pit-bull & Langue-sortie',
			sex: 0,
			color: 'Brun',
			journal: [
				{ type: 'meal', author: 0, time: '2026-03-11T07:00:00', shit: false },
				{ type: 'walk', author: 0, time: '2026-03-11T07:30:00', shit: true },
				{ type: 'meal', author: 2, time: '2026-03-11T10:30:00', shit: false }, // Extra snack!
				{ type: 'walk', author: 1, time: '2026-03-11T12:00:00', shit: true },
				{ type: 'meal', author: 1, time: '2026-03-11T17:00:00', shit: false },
				{ type: 'walk', author: 2, time: '2026-03-11T18:30:00', shit: true }
			]
		},
		{
			i: 2,
			name: 'Duchesse',
			avatar: 26,
			born: 1996,
			race: 'Pit-bull & Langue-sortie',
			sex: 0,
			color: 'Brun',
			journal: [
				{ type: 'meal', author: 0, time: '2026-03-11T07:00:00', shit: false },
				{ type: 'walk', author: 0, time: '2026-03-11T07:30:00', shit: false },
				{ type: 'walk', author: 1, time: '2026-03-11T12:00:00', shit: true },
				{ type: 'meal', author: 1, time: '2026-03-11T17:00:00', shit: false },
				{ type: 'walk', author: 2, time: '2026-03-11T18:30:00', shit: true },
				{ type: 'walk', author: 3, time: '2026-03-11T21:00:00', shit: true }
			]
		}
	],
	current_dog: 1,
	family: [
		{ name: 'Papa William', color: 'red' },
		{ name: 'Maman', color: 'green' },
		{ name: 'Georgie', color: 'blue' },
		{ name: 'Princesse fée', color: 'pink' }
	],
	contact: {
		name: 'Papa William',
		adress: '1440 Rue Sanguinet',
		zip_code: 'H2X 3G1',
		phones: ['(514) 987-3000']
	}
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
