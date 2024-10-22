<script lang="ts">
  import { cn } from "$lib/utils";

  const props: {
    size?: string;
    class?: string;
  } = $props();
</script>

<div
  style="width: {props.size};"
  class={cn(
    "mr-2 aspect-square animate-spin rounded-full border-2 border-t-black",
    props.class,
  )}
></div>
