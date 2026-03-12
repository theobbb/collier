<script lang="ts">
	import { store } from '$lib/store.svelte';
	import Popover from '$lib/ui/components/pop/popover.svelte';
</script>

<!-- {#if store.menu_open} -->
<Popover pop={store.pop_menu}>
	<div class="fixed right-0 bottom-20 left-0 z-200">
		<div class="mx-2x min-h-56 bg-white p-3x">
			<a href="/onboarding">Onboarding</a>
			<div>Chiens</div>
			<div>Carnet médical</div>
			<div>Notifications</div>
			<div>Famille</div>
			<div>Coordonnées</div>
			<div>Help center</div>
			<div>Support</div>
		</div>
	</div>
</Popover>
<!-- {/if} -->
