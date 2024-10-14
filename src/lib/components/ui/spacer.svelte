<script lang="ts">
	import { cn } from '$lib/utils';

	const props: {
		axis?: 'x' | 'y';
	} = $props();
</script>

<div class={cn(props.axis === 'x' ? 'w-full' : 'h-full')}></div>
