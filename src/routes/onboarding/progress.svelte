<script lang="ts">
	import { page } from '$app/state';

	const step = $derived(Number(page.url.pathname.split('/')?.[2]?.[0]));
	const total_steps = 5;

	const progress = $derived(step / total_steps);

	const skipable = [3, 4, 5];
</script>

{#if step > 0}
	<div class="corner mb-4x border bg-surface px-3x py-2x">
		<div class="mb-2x flex items-center justify-between text-sm font-medium">
			<div>Configuration</div>
			<div>{Math.round(progress * 100)}%</div>
		</div>
		<div class="corner overflow-hidden bg-black/10">
			<div
				class="h-3 w-full origin-left bg-progress transition ease-in-out"
				style="transform: scaleX({progress});"
			></div>
		</div>
		<div class="mt-4x flex items-center justify-between text-sm font-medium">
			<a href="/onboarding/{step - 1}" class="flex items-center gap-1">
				<div class="icon-[ri--arrow-left-line]"></div>
				<div>Retour</div>
			</a>
			{#if skipable.includes(step)}
				<a
					href={step == 5 ? `/app/1/track/map` : `/onboarding/${step + 1}`}
					class="flex items-center gap-1"
				>
					<div>Sauter</div>
					<span class="icon-[ri--arrow-right-long-line]"></span>
				</a>
			{/if}
		</div>
	</div>
{/if}
