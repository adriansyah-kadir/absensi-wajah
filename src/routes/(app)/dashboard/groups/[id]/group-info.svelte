<script lang="ts">
  import { Button } from "@ui/button";
  import type { fetchGroupInfo, QueryOf } from "$lib/supabase/query";
  import MembersSidebar from "./members-sidebar.svelte";

  const {
    group,
  }: {
    group: QueryOf<typeof fetchGroupInfo>;
  } = $props();

  const LocationsSettings = import("./locations-settings.svelte");

  let show_member_sidebar = $state(false);
</script>

<div class="flex w-full h-full">
  <MembersSidebar {group} show={show_member_sidebar} />
  <div class="flex flex-col p-5 h-full w-full prose max-w-none">
    <h2>{group?.name}</h2>
    <div class="flex flex-wrap items-center gap-5 mb-5">
      <Button onclick={() => (show_member_sidebar = !show_member_sidebar)}
        >Members</Button
      >
    </div>
    {#await LocationsSettings then { default: Component }}
      <Component {group} />
    {/await}
  </div>
</div>
