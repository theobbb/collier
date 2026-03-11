<script>
	import { page } from '$app/state';
	import Button from '$lib/ui/components/button.svelte';
	import Dogs from './dogs.svelte';
</script>

<div class="fixed right-0 bottom-0 left-0">
	<div><Dogs /></div>
	<div class="mx-2x my-2x flex justify-between bg-white">
		<Button class="p-4" icon="icon-[ri--menu-line]" size="lg" variant="ghost"></Button>

		<Button
			href="/app/{page.params.dog}"
			class="p-4"
			icon="icon-[ri--send-plane-fill]"
			size="lg"
			variant="ghost"
		></Button>
		<Button
			href="/app/{page.params.dog}/journal"
			class="p-4"
			icon="icon-[ri--book-line]"
			size="lg"
			variant="ghost"
		></Button>
	</div>
</div>
