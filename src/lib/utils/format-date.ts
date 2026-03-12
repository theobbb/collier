export function format_time(str: string): { time: string; day: string } {
	const date = new Date(str.replace('T', ' '));
	const now = new Date();

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const time = `${hours}:${minutes}`;

	const isToday =
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear();

	if (isToday) {
		return { time, day: '' };
	}

	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);
	const isYesterday =
		date.getDate() === yesterday.getDate() &&
		date.getMonth() === yesterday.getMonth() &&
		date.getFullYear() === yesterday.getFullYear();

	if (isYesterday) {
		return { time, day: 'hier' };
	}

	const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

	if (diffDays < 7) {
		const days = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
		return { time, day: days[date.getDay()] };
	}

	const dayNum = String(date.getDate()).padStart(2, '0');
	const months = [
		'janv.',
		'févr.',
		'mars',
		'avr.',
		'mai',
		'juin',
		'juil.',
		'août',
		'sept.',
		'oct.',
		'nov.',
		'déc.'
	];
	const month = months[date.getMonth()];
	const year = date.getFullYear() !== now.getFullYear() ? ` ${date.getFullYear()}` : '';

	return { time, day: `${dayNum} ${month}${year}` };
}
