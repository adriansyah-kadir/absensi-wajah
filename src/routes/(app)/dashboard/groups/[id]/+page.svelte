<script lang="ts">
  import GroupInfo from "./group-info.svelte";
  import { getClient } from "$lib/supabase/client";
  import { fetchGroupInfo } from "$lib/supabase/query";
  import { onAuth, signin } from "$lib/stores/auth";
  import { page } from "$app/stores";
  import Spinner from "@ui/spinner.svelte";

  const client = getClient();
  const group =
    Promise.withResolvers<Awaited<ReturnType<typeof fetchGroupInfo>>>();

  onAuth((s) => {
    fetchGroupInfo(client, $page.params.id, s.user.id)
      .then(group.resolve)
      .catch(group.reject);
  }, signin);
</script>

{#await group.promise}
  <div class="h-full w-full center">
    <Spinner size="50px" />
  </div>
{:then group}
  <GroupInfo {group} />
{:catch error}
  <h2>Error getting group info {error.message}</h2>
{/await}
