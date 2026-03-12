import { Pop } from './ui/components/pop/pop-context.svelte';

export const store = $state({
	pop_menu: new Pop()
});
