<script lang="ts">
	import { data } from '$lib/data.svelte';
	import Avatar from '$lib/ui/components/avatar.svelte';
</script>

<div class="grid grid-cols-4">
	{#each data.dogs as dog}
		<div>
			<div>
				<Avatar index={dog.avatar} size="lg" />
			</div>
			<div>
				{dog.name}
			</div>
		</div>
	{/each}
</div>
