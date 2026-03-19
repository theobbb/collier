<script lang="ts">
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/templates/avatar.svelte';

	//let selected: number | null = $state(1);
</script>

<Avatar dog={data.dogs[1]} onboarding />

<!-- {#if selected != null}
	<div class="fixed right-0 bottom-0 left-0">
		<div class="corner m-3x border bg-neutral-400 shadow-lg backdrop-blur-lg">
			<div class="m-2x flex h-32 w-28">
				<Dog dog={{ ...data.dogs[1], avatar: selected }} />
			</div>
		</div>
	</div>
{/if} -->
