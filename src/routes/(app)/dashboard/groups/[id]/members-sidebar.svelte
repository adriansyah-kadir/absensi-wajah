<script lang="ts">
  import SidebarItem from "$lib/components/sidebar/sidebar-item.svelte";
  import SidebarToggle from "$lib/components/sidebar/sidebar-toggle.svelte";
  import Sidebar from "$lib/components/sidebar/sidebar.svelte";
  import type { fetchGroupInfo, QueryOf } from "$lib/supabase/query";
  import type { Tables } from "$lib/supabase/types";
  import { nonNullable } from "$lib/utils";
  import Spacer from "@ui/spacer.svelte";
  import { User } from "lucide-svelte";
  import { getContext } from "svelte";

  const {
    group,
    ...props
  }: {
    group: QueryOf<typeof fetchGroupInfo>;
    show?: boolean;
  } = $props();

  const members: Tables<"accounts">[] = $derived(
    group?.group_members.map((e) => e.accounts).filter(nonNullable) ?? [],
  );
</script>

<Sidebar show={props.show}>
  {#each members as member}
    <SidebarItem href="/accounts/{member.id}" label={member.name ?? "-"}>
      {#snippet icon()}
        {#if member.picture}
          <img src={member.picture} alt="" />
        {:else}
          <User size={18} />
        {/if}
      {/snippet}
    </SidebarItem>
  {/each}
  <Spacer />
  <SidebarToggle />
</Sidebar>
