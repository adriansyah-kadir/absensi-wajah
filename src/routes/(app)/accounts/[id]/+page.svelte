<script lang="ts">
  import { page } from "$app/stores";
  import { getClient } from "$lib/supabase/client";
  import { fetchAccountInfo } from "$lib/supabase/query";

  const client = getClient();
  const account = fetchAccountInfo(client, $page.params.id);
</script>

{#await account}
  loading
{:then info}
  <img src={info.picture} alt="" />
  {info.name}
{/await}
