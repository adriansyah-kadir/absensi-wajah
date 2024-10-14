<script>
	import { ChevronLeft } from 'lucide-svelte';

	import SidebarItem from './sidebar-item.svelte';
	import { cn } from '$lib/utils';
</script>

<SidebarItem
	label="Toggle"
	onclick={({ expand }) => {
		expand.update((p) => !p);
	}}
>
	{#snippet icon({ expand })}
		<ChevronLeft size={18} class={cn({ 'rotate-180': !expand }, 'transition-all')} />
	{/snippet}
</SidebarItem>
