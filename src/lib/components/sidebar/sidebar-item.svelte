<script lang="ts">
  import { goto } from "$app/navigation";
  import { cn } from "$lib/utils";
  import { buttonVariants } from "@ui/button";
  import { useRipple } from "@ui/ripple";
  import { getContext, type Snippet } from "svelte";
  import type { Writable } from "svelte/store";

  type ItemProps = {
    expand: boolean;
    min_width: string;
  };

  const props: {
    label?: string;
    href?: string;
    children?: Snippet<[ItemProps]>;
    icon?: Snippet<[ItemProps]>;
    prefix?: Snippet<[ItemProps]>;
    onclick?: (context: { expand: Writable<boolean> }) => void;
    class?: string;
  } = $props();
  const expand: Writable<boolean> = getContext("sidebar-expand");
  const min_width: string = getContext("sidebar-min-width");

  const onclick = props.href
    ? () => goto(props.href!)
    : () => props.onclick?.call(undefined, { expand: expand });
</script>

<button
  class={cn(
    "flex w-full items-center hover:bg-foreground/5 relative",
    props.class,
  )}
  {onclick}
>
  {#if props.icon}
    <div
      class="center aspect-square flex-shrink-0"
      style:width={min_width}
      style:height={min_width}
    >
      <div
        class={buttonVariants({
          size: "icon",
          variant: "outline",
          class: "overflow-hidden",
        })}
      >
        {@render props.icon({ expand: $expand, min_width })}
      </div>
    </div>
  {:else if props.prefix}
    {@render props.prefix({ expand: $expand, min_width })}
  {/if}
  {#if props.label}
    <p
      class={cn(
        "translate-x-5 text-nowrap pr-10 opacity-0 transition-all duration-500",
        { "translate-x-0 opacity-100": $expand },
      )}
    >
      {props.label}
    </p>
  {:else if props.children}
    {@render props.children({ expand: $expand, min_width })}
  {/if}
</button>
