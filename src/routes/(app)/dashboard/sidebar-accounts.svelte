<script lang="ts">
    import SidebarItem from "$lib/components/sidebar/sidebar-item.svelte";
    import { LogOutIcon, Repeat, User } from "lucide-svelte";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import { slide } from "svelte/transition";

  const expand: Writable<boolean> = getContext('sidebar-expand')
</script>
<div class="border-y py-5">
  {#if $expand}
    <div transition:slide>
      <h3 class="text-muted-foreground p-2">Account</h3>
    </div>
  {/if}
  <SidebarItem href="/dashboard/me" label="Preferences">
    {#snippet icon()}
      <User size={18}/>
    {/snippet}
  </SidebarItem>
  <SidebarItem label="Change">
    {#snippet icon()}
      <Repeat size={18}/>
    {/snippet}
  </SidebarItem>
  <SidebarItem label="Logout">
    {#snippet icon()}
      <LogOutIcon size={18}/>
    {/snippet}
  </SidebarItem>
</div>
