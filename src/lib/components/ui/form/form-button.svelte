<script lang="ts">
  import { Button } from "@ui/button";
  import type { ComponentProps } from "svelte";

  const props: ComponentProps<typeof Button> = $props();
</script>

<Button {...props}></Button>
