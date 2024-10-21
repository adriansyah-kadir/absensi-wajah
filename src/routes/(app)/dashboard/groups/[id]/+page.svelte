<script lang="ts">
  import GroupInfo from "./group-info.svelte";
  import { getClient } from "$lib/supabase/client";
  import {
    fetchGroupInfo,
    type GroupInfoType,
    type QueryOf,
  } from "$lib/supabase/query";
  import { onMount, setContext } from "svelte";
  import Loading from "./loading.svelte";
  import { page } from "$app/stores";

  const client = getClient();

  const { promise, resolve, reject } =
    Promise.withResolvers<QueryOf<typeof fetchGroupInfo>>();

  onMount(() => {
    fetchGroupInfo(client, parseInt($page.params.id))
      .then(resolve)
      .catch(reject);
  });
</script>

{#await promise}
  <Loading />
{:then group}
  <GroupInfo {group} />
{:catch error}
  <h2>Error getting group info {error.message}</h2>
{/await}
