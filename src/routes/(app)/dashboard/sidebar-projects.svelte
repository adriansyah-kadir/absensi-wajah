<script lang="ts">
  import SidebarItem from "$lib/components/sidebar/sidebar-item.svelte";
  import { Users } from "lucide-svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { slide } from "svelte/transition";

  const expand: Writable<boolean> = getContext('sidebar-expand')
</script>

<div class="h-fit border-y py-5">
  {#if $expand}
    <div transition:slide>
      <h3 class="text-muted-foreground p-2">Groups</h3>
    </div>
  {/if}
  <SidebarItem href="/dashboard/groups" label="All groups">
    {#snippet icon()}
      <Users size={18}/>
    {/snippet}
  </SidebarItem>
</div>
