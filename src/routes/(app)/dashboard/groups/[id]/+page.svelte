<script lang="ts">
  import { getClient } from "$lib/supabase/client";
  import { fetchGroupInfo, type QueryOf } from "$lib/supabase/query";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { promiseState } from "$lib/utils";
  import MembersSidebar from "./members-sidebar.svelte";
  import { Button } from "@ui/button";
  import { browser } from "$app/environment";

  const client = getClient();

  const group_state = promiseState<QueryOf<typeof fetchGroupInfo>>();

  let show_member_sidebar = $state(false);

  onMount(() => {
    fetchGroupInfo(client, parseInt($page.params.id))
      .then(group_state.resolve)
      .catch(group_state.reject);
  });
</script>

<div class="flex w-full h-full">
  {#if $group_state.value}
    <MembersSidebar group={$group_state.value} show={show_member_sidebar} />
  {/if}
  <div class="flex flex-col p-5 h-full w-full prose max-w-none">
    <h2 class:skeleton={$group_state.pending} class="w-fit transition-all">
      {$group_state.value?.name ?? "Loading..."}
    </h2>
    <div class="flex flex-wrap items-center gap-5 mb-5">
      <Button
        loading={$group_state.pending}
        onclick={() => (show_member_sidebar = !show_member_sidebar)}
        >Members</Button
      >
    </div>
    {#if browser}
      {#await import("./locations-settings.svelte") then { default: Component }}
        {#if $group_state.value}
          <Component group={$group_state.value} />
        {/if}
      {/await}
    {/if}
  </div>
</div>
