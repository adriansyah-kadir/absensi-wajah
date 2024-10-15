<script lang="ts">
  import { PUBLIC_APP_NAME } from "$env/static/public";
  import { account_store } from "$lib/stores/account";
  import { Button } from "@ui/button";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  const sidebar_expand: Writable<boolean> = getContext("sidebar-expand");
  const min_width: string = getContext("sidebar-min-width");
</script>

<a href="/">
  <div class="flex w-full items-center justify-start overflow-hidden">
    <div
      style:view-transition-name="brand-logo"
      style:width={min_width}
      style:height={min_width}
      class="center flex-shrink-0"
    >
      <Button variant="ghost" size="icon" class="flex-shrink-0">
        <img src={$account_store?.picture} alt="" />
      </Button>
    </div>
    <input type="checkbox" class="peer" bind:checked={$sidebar_expand} hidden />
    <div
      class="flex h-fit flex-col opacity-0 transition-all duration-500 peer-checked:opacity-100"
    >
      <h2 class="text-lg font-semibold leading-none">{PUBLIC_APP_NAME}</h2>
      <small class="leading-none text-nowrap"
        >{$account_store?.name?.split(" ").at(0)}</small
      >
    </div>
  </div>
</a>
