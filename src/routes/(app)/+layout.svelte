<script lang="ts">
  import { Toaster } from "@ui/sonner";
  import PageLoadingIndicator from "$lib/components/page-loading-indicator.svelte";
  import ViewTransition from "$lib/components/view-transition.svelte";
  import type { Snippet } from "svelte";
  import OfflineStatus from "$lib/components/offline_status.svelte";
  import "../../app.css";

  const props: { children: Snippet } = $props();
</script>

{@render props.children()}
<PageLoadingIndicator />
<ViewTransition />
<Toaster richColors />
<OfflineStatus />
