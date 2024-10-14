<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	const props: { children: Snippet; className?: string } = $props();
</script>

<div class={cn('flex w-full items-center gap-5', props.className)}>
	<hr class="w-full" />
	{@render props.children()}
	<hr class="w-full" />
</div>
