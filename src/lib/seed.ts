import type { Data, JournalEntry } from './data.svelte';

const dog_props = {
	born: 1996,
	race: 'Pit-bull & Langue-sortie',
	color: 'Brun tâcheté',
	weight: 54,
	sex: 'Femelle'
};

export const seed: Omit<Data, 'version'> = {
	dogs: [
		{
			i: 0,
			name: 'Duchesse',
			avatar: 26,
			...dog_props,
			journal: generate_journal([
				{ type: 'walk', author: 0, time: '1470', shit: true }, // ~yesterday, Papa
				{ type: 'meal', author: 1, time: '1440', shit: false }, // yesterday dinner, Maman
				{ type: 'walk', author: 1, time: '1380', shit: true }, // yesterday evening, Maman
				{ type: 'meal', author: 0, time: '120', shit: false }, // this morning, Papa
				{ type: 'walk', author: 2, time: '90', shit: false }, // Georgie walked all 3
				{ type: 'walk', author: 3, time: '20', shit: true } // Princesse fée surprise walk
			]),
			schedule: {
				walk: entry_time(-60), // next walk suggested in 1h
				meal: entry_time(-240) // next meal suggested in 4h
			}
		},
		{
			i: 1,
			name: 'Napoléon',
			avatar: 16,
			...dog_props,
			journal: generate_journal([
				{ type: 'walk', author: 0, time: '1470', shit: true }, // ~yesterday 33h ago, Papa solo walk
				{ type: 'meal', author: 1, time: '1440', shit: false }, // yesterday dinner, Maman fed all 3
				{ type: 'walk', author: 1, time: '1380', shit: false }, // yesterday evening walk, Maman
				{ type: 'meal', author: 0, time: '120', shit: false }, // this morning 7h, Papa fed all 3
				{ type: 'walk', author: 2, time: '90', shit: true }, // 7h30 Georgie walked all 3
				{ type: 'walk', author: 0, time: '15', shit: false } // 8h50 Papa quick solo walk
			]),
			schedule: {
				walk: entry_time(-30), // next walk suggested in 1h
				meal: entry_time(-180) // next meal suggested in 4h
			}
		},
		{
			i: 2,
			name: 'Maître UX',
			avatar: 6,
			...dog_props,
			journal: generate_journal([
				{ type: 'walk', author: 0, time: '1470', shit: false }, // ~yesterday, Papa
				{ type: 'meal', author: 1, time: '1440', shit: false }, // yesterday dinner, Maman
				{ type: 'walk', author: 1, time: '1380', shit: true }, // yesterday evening, Maman
				{ type: 'meal', author: 0, time: '120', shit: false }, // this morning, Papa
				{ type: 'walk', author: 2, time: '90', shit: true }, // Georgie walked all 3
				{ type: 'meal', author: 2, time: '30', shit: false } // Georgie gave a snack
			]),
			schedule: {
				walk: entry_time(-90), // next walk suggested in 1h
				meal: entry_time(-60) // next meal suggested in 4h
			}
		}
	],
	current_dog: 1,
	family: [
		{ name: 'Papa William', color: '#80A663' },
		{ name: 'Maman', color: '#E09C93' },
		{ name: 'Georgie', color: '#8AAAC4' },
		{ name: 'Princesse fée', color: '#C6B4D9' }
	],
	contact: {
		name: 'Papa William',
		adress: '1440 Rue Sanguinet',
		zip_code: 'H2X 3G1',
		phones: ['(514) 987-3000']
	}
};

function generate_journal(entries: JournalEntry[]) {
	return entries.map((entry) => {
		const time = entry_time(Number(entry.time));

		return { ...entry, time };
	});
}

export function entry_time(delta: number) {
	const now = new Date();
	const t = new Date(now.getTime() - delta * 60 * 1000);
	const local = new Date(t.getTime() - t.getTimezoneOffset() * 60 * 1000);
	return local.toISOString().slice(0, 19);
}
