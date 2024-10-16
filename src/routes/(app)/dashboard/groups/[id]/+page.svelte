<script lang="ts">
  import GroupInfo from "./group-info.svelte";
  import { getClient } from "$lib/supabase/client";
  import { fetchGroupInfo } from "$lib/supabase/query";
  import { page } from "$app/stores";
  import Spinner from "@ui/spinner.svelte";
  import { setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import type { Tables } from "$lib/supabase/types";

  const client = getClient();
  const group = fetchGroupInfo(client, parseInt($page.params.id));
  const members = setContext<Writable<Tables<"accounts">[]>>(
    "group-members",
    writable([]),
  );

  group.then((d) => d.group_members.map((e) => e.accounts).filter(e => !!e)).then(result => {
    members.set(result)
  });
</script>

{#await group}
  <div class="h-full w-full center">
    <Spinner size="50px" />
  </div>
{:then group}
  <GroupInfo {group} />
{:catch error}
  <h2>Error getting group info {error.message}</h2>
{/await}
