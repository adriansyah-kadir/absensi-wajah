<script lang="ts" generics="T">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";
  import type { Snippet } from "svelte";
  import type { TransitionConfig } from "svelte/transition";

  const {
    loading,
    ...props
  }: HTMLAttributes<HTMLDivElement> & {
    loading?: boolean;
    children: Snippet;
  } = $props();
</script>

{#if loading}
  <div
    {...props}
    class={cn("skeleton w-fit h-fit", props.class)}
  >
    {@render props.children()}
  </div>
{:else}
  {@render props.children()}
{/if}
