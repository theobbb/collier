import type { Data, JournalEntry } from './data.svelte';

export const seed: Data = {
	dogs: [
		{
			i: 0,
			name: 'Duchesse',
			avatar: 26,
			born: 1996,
			race: 'Pit-bull & Langue-sortie',
			sex: 0,
			color: 'Brun',
			journal: generate_journal([
				{ type: 'walk', author: 0, time: '1470', shit: true }, // ~yesterday, Papa
				{ type: 'meal', author: 1, time: '1440', shit: false }, // yesterday dinner, Maman
				{ type: 'walk', author: 1, time: '1380', shit: true }, // yesterday evening, Maman
				{ type: 'meal', author: 0, time: '120', shit: false }, // this morning, Papa
				{ type: 'walk', author: 2, time: '90', shit: false }, // Georgie walked all 3
				{ type: 'walk', author: 3, time: '20', shit: true } // Princesse fée surprise walk
			])
		},
		{
			i: 1,
			name: 'Napoléon',
			avatar: 16,
			born: 1996,
			race: 'Pit-bull & Langue-sortie',
			sex: 0,
			color: 'Brun',
			journal: generate_journal([
				{ type: 'walk', author: 0, time: '1470', shit: true }, // ~yesterday 33h ago, Papa solo walk
				{ type: 'meal', author: 1, time: '1440', shit: false }, // yesterday dinner, Maman fed all 3
				{ type: 'walk', author: 1, time: '1380', shit: false }, // yesterday evening walk, Maman
				{ type: 'meal', author: 0, time: '120', shit: false }, // this morning 7h, Papa fed all 3
				{ type: 'walk', author: 2, time: '90', shit: true }, // 7h30 Georgie walked all 3
				{ type: 'walk', author: 0, time: '15', shit: false } // 8h50 Papa quick solo walk
			])
		},
		{
			i: 2,
			name: 'Maître UX',
			avatar: 6,
			born: 1996,
			race: 'Pit-bull & Langue-sortie',
			sex: 0,
			color: 'Brun',
			journal: generate_journal([
				{ type: 'walk', author: 0, time: '1470', shit: false }, // ~yesterday, Papa
				{ type: 'meal', author: 1, time: '1440', shit: false }, // yesterday dinner, Maman
				{ type: 'walk', author: 1, time: '1380', shit: true }, // yesterday evening, Maman
				{ type: 'meal', author: 0, time: '120', shit: false }, // this morning, Papa
				{ type: 'walk', author: 2, time: '90', shit: true }, // Georgie walked all 3
				{ type: 'meal', author: 2, time: '30', shit: false } // Georgie gave a snack
			])
		}
	],
	current_dog: 1,
	family: [
		{ name: 'Papa William', color: '#EA4335' },
		{ name: 'Maman', color: '#34A853' },
		{ name: 'Georgie', color: '#4285F4' },
		{ name: 'Princesse fée', color: '#FBBC05' }
	],
	contact: {
		name: 'Papa William',
		adress: '1440 Rue Sanguinet',
		zip_code: 'H2X 3G1',
		phones: ['(514) 987-3000']
	}
};

function generate_journal(entries: JournalEntry[]) {
	const now = new Date();
	return entries.map(({ time, ...rest }) => {
		const t = new Date(now.getTime() - Number(time) * 60 * 1000);
		const local = new Date(t.getTime() - t.getTimezoneOffset() * 60 * 1000);
		return { ...rest, time: local.toISOString().slice(0, 19) };
	});
}
