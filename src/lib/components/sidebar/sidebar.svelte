<script lang="ts">
  import { watch } from "runed";
  import { onMount, setContext, type Snippet } from "svelte";
  import { writable } from "svelte/store";

  const props: { children: Snippet; show?: boolean } = $props();
  const sidebar_expand = setContext("sidebar-expand", writable(false));
  const min_width = setContext("sidebar-min-width", "3.5rem");

  let menu: HTMLDivElement | undefined = $state();
  let width = $state(min_width);

  watch(
    () => $sidebar_expand,
    (v) => {
      if (v) width = `${menu?.scrollWidth}px`;
      else width = min_width;
    },
  );

  watch(
    () => props.show,
    (show) => {
      if (show === false) width = "0px";
      else {
        if ($sidebar_expand) width = `${menu?.scrollWidth}px`;
        else width = min_width;
      }
    },
  );

  onMount(() => {
    setTimeout(() => {
      sidebar_expand.set(true);
    }, 0);
  });
</script>

<div
  class:opacity-0={props.show === false}
  class="box-content flex h-full max-w-sm flex-col overflow-hidden border-r-[1px] transition-all duration-500 flex-shrink-0"
  style:width
  bind:this={menu}
>
  <div class="h-5 flex-shrink-0"></div>
  {@render props.children()}
  <div class="h-5 flex-shrink-0"></div>
</div>
