<script lang="ts">
  import { PUBLIC_APP_NAME } from "$env/static/public";
  import { auth_store } from "$lib/stores/auth";
  import { Button } from "@ui/button";
  import { Paperclip } from "lucide-svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  const sidebar_expand: Writable<boolean> = getContext("sidebar-expand");
  const min_width: string = getContext("sidebar-min-width");
  const auth = auth_store
</script>

<a href="/">
  <div class="flex w-full items-center justify-start overflow-hidden">
    <div
      style:view-transition-name="brand-logo"
      style:width={min_width}
      style:height={min_width}
      class="center flex-shrink-0"
    >
      <Button variant="ghost" size="icon" class="flex-shrink-0"
        ><Paperclip size={18} /></Button
      >
    </div>
    <input type="checkbox" class="peer" bind:checked={$sidebar_expand} hidden />
    <div
      class="flex h-fit flex-col opacity-0 transition-all duration-500 peer-checked:opacity-100"
    >
      <h2 class="text-lg font-semibold leading-none">{PUBLIC_APP_NAME}</h2>
      <small class="leading-none text-nowrap"
        >{$auth?.user.user_metadata.name}</small
      >
    </div>
  </div>
</a>
