<script lang="ts">
  import { auth_store, onAuth, signin } from "$lib/stores/auth";
  import { Input } from "@ui/input";
  import AddDialog from "./add-dialog.svelte";
  import type { Tables } from "$lib/supabase/types";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@ui/card";
  import { Button } from "@ui/button";
  import { ChevronRight } from "lucide-svelte";
  import LoadingGroups from "./loading-groups.svelte";
  import { fetchGroups, type QueryOf } from "$lib/supabase/query";
  import { getClient } from "$lib/supabase/client";
  import { account_store } from "$lib/stores/account";

  const client = getClient();

  const groups =
    Promise.withResolvers<QueryOf<typeof fetchGroups>>();

  const account = account_store;

  onAuth((s) => {
    fetchGroups(client, s.user.id).then(groups.resolve).catch(groups.reject);
  }, signin);
</script>

<div class="p-5 overflow-auto h-full">
  <div class="prose">
    <h2>Groups</h2>
    <div class="flex flex-wrap items-center gap-5">
      <AddDialog />
      <Input placeholder="Search..." class="w-fit" />
    </div>
    <h4>{$account?.name} Groups</h4>
  </div>
  <div class="py-5 flex gap-5 flex-wrap">
    {#await groups.promise}
      <LoadingGroups />
    {:then list}
      {#each list as group}
        {@render group_card(group)}
      {/each}
    {/await}
  </div>
</div>

{#snippet group_card(group: Tables<"groups"> & { group_members: any[] })}
  <Card class="aspect-video w-full max-w-sm min-w-fit">
    <CardHeader
      class="flex-row items-start flex-nowrap space-y-0 justify-between flex-shrink-0"
    >
      <div class="w-fit">
        <CardTitle>{group.name}</CardTitle>
        <CardDescription>{group.description ?? "-"}</CardDescription>
      </div>
      <a href="/dashboard/groups/{group.id}">
        <Button variant="ghost" size="icon"><ChevronRight size={18} /></Button>
      </a>
    </CardHeader>
    <CardContent>
      <small>
        {group.group_members.length} Members
      </small>
    </CardContent>
  </Card>
{/snippet}
