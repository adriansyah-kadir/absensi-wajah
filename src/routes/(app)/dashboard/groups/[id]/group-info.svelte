<script lang="ts">
  import SidebarItem from "$lib/components/sidebar/sidebar-item.svelte";
  import Sidebar from "$lib/components/sidebar/sidebar.svelte";
  import { Button } from "@ui/button";
  import { User } from "lucide-svelte";
  import type { PageData } from "./$types";
  import Spacer from "@ui/spacer.svelte";
  import SidebarToggle from "$lib/components/sidebar/sidebar-toggle.svelte";

  const {
    group,
  }: {
    group: Awaited<PageData["group"]>;
  } = $props();

  let show_member_sidebar = $state(true);
</script>

<div class="flex w-full h-full">
  <Sidebar show={show_member_sidebar}>
    {#each group.group_members as member}
      <SidebarItem label={member.accounts?.name ?? "-"}>
        {#snippet icon()}
          <User size={18} />
        {/snippet}
      </SidebarItem>
    {/each}
    <Spacer />
    <SidebarToggle />
  </Sidebar>
  <div class="prose p-5">
    <h2>{group.name}</h2>
    <div class="flex flex-wrap items-center gap-5">
      <Button onclick={() => (show_member_sidebar = !show_member_sidebar)}
        >Members</Button
      >
    </div>
  </div>
</div>
