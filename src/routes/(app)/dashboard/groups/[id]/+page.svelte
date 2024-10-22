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

  const group = promiseState<QueryOf<typeof fetchGroupInfo>>();

  let show_member_sidebar = $state(false);

  onMount(() => {
    fetchGroupInfo(client, parseInt($page.params.id))
      .then(group.resolve)
      .catch(group.reject);
  });
</script>

<div class="flex w-full h-full">
  {#if $group.value}
    <MembersSidebar group={$group.value} show={show_member_sidebar} />
  {/if}

  <div class="flex flex-col p-5 h-full w-full prose max-w-none">
    <h2 class:skeleton={$group.pending} class="w-fit transition-all">
      {$group.value?.name ?? "Loading..."}
    </h2>
    <div class="flex flex-wrap items-center gap-5 mb-5">
      <Button
        loading={$group.pending}
        onclick={() => (show_member_sidebar = !show_member_sidebar)}
        >Members</Button
      >
    </div>
    {#if browser && $group.value}
      {#await import("./locations-settings.svelte") then { default: Component }}
        <Component group={$group.value} />
      {/await}
    {/if}
  </div>
</div>
