<script lang="ts">
	const {
		label,
		id,
		name,
		required,
		icon,
		linked = false
	}: {
		label: string;
		id: string;
		name?: string | null | undefined;
		required?: boolean;
		icon?: string;
		linked?: boolean;
	} = $props();

	const error = $derived(null);
</script>

{#if label}
	<label
		for={id}
		class={[
			linked ? '-mb-0.5 pb-0' : '',
			'flex h-8 w-full items-center gap-1 px-3x whitespace-pre lowercase opacity-70 select-none',
			error ? 'text-red-600' : 'text-surface-foreground/70'
		]}
	>
		{#if icon}
			<span class={[icon, 'text-sm']}></span>
		{/if}
		<span class="text-sm">{label}</span>
		{#if required}
			<span class="-ml-0.5- scale-120 text-red-600">*</span>
		{/if}
	</label>
{/if}
