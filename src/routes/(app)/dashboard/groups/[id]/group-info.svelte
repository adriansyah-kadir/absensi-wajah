<script lang="ts">
  import SidebarItem from "$lib/components/sidebar/sidebar-item.svelte";
  import Sidebar from "$lib/components/sidebar/sidebar.svelte";
  import { Button } from "@ui/button";
  import { User } from "lucide-svelte";
  import Spacer from "@ui/spacer.svelte";
  import SidebarToggle from "$lib/components/sidebar/sidebar-toggle.svelte";
  import type { fetchGroupInfo } from "$lib/supabase/query";
  import type { Tables } from "$lib/supabase/types";

  const {
    group,
  }: {
    group: Awaited<ReturnType<typeof fetchGroupInfo>>;
  } = $props();
  const LocationsSettings = import("./locations-settings.svelte");

  let show_member_sidebar = $state(false);
  let show_member: Tables<"accounts"> | undefined = $state();

  function toggleMembers() {
    show_member_sidebar = !show_member_sidebar;
    show_member = undefined;
  }
</script>

<div class="flex w-full h-full">
  <Sidebar show={show_member_sidebar}>
    {#each group.group_members as member}
      <SidebarItem
        href="/accounts/{member.accounts!.id}"
        label={member.accounts?.name ?? "-"}
      >
        {#snippet icon()}
          {#if member.accounts?.picture}
            <img src={member.accounts.picture} alt="" />
          {:else}
            <User size={18} />
          {/if}
        {/snippet}
      </SidebarItem>
    {/each}
    <Spacer />
    <SidebarToggle />
  </Sidebar>
  <div class="flex flex-col p-5 h-full w-full prose max-w-none">
    <h2>{group.name}</h2>
    <div class="flex flex-wrap items-center gap-5 mb-5">
      <Button onclick={toggleMembers}>Members</Button>
    </div>
    {#await LocationsSettings then { default: Component }}
      <Component group_id={group.id}/>
    {/await}
  </div>
</div>
