<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Label from '../label.svelte';
	import Error from '../error.svelte';

	let {
		type = 'text',
		name,
		label = '',
		label_icon,
		required = false,
		placeholder,
		min,
		max,
		value = $bindable(),
		oninput,
		...props
	}: HTMLInputAttributes & { label?: string; label_icon?: string } = $props();

	const props_id = $props.id();
	const id = $derived(props.id || name || props_id);
</script>

<div class=" ">
	<div
		class="text-surface-foreground corner ring-accent flex flex-col border bg-blue-100 ring-blue-500 focus-within:ring-2"
	>
		<Label {id} {name} required={Boolean(required)} {label} icon={label_icon} linked />

		<input
			{oninput}
			{required}
			minlength={Boolean(Number(min)) ? Number(min) : undefined}
			maxlength={Boolean(Number(max)) ? Number(max) : undefined}
			{name}
			{type}
			{placeholder}
			class={[
				'placeholder-surface-foreground/50 px-3x py-1x text-lg outline-none',
				label && '-mt-2',
				props.class
			]}
			{id}
			autocomplete="off"
			bind:value
		/>
	</div>
	<Error {name} />
</div>
