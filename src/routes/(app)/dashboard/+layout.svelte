<script lang="ts">
  import SidebarBrand from "$lib/components/sidebar/sidebar-brand.svelte";
  import SidebarToggle from "$lib/components/sidebar/sidebar-toggle.svelte";
  import Sidebar from "$lib/components/sidebar/sidebar.svelte";
  import Spacer from "@ui/spacer.svelte";
  import { type Snippet } from "svelte";
  import SidebarProjects from "./sidebar-projects.svelte";
  import SidebarAccounts from "./sidebar-accounts.svelte";
  import { onAuth, signin } from "$lib/stores/auth";
  import { delayed } from "$lib/utils";

  const props: {
    children: Snippet;
  } = $props();

  onAuth(undefined, delayed(signin, 1000));
</script>

<div
  class="flex h-screen w-screen bg-background dark:text-foreground overflow-hidden"
>
  <Sidebar>
    <SidebarBrand />
    <SidebarProjects />
    <Spacer />
    <SidebarAccounts />
    <SidebarToggle />
  </Sidebar>
  <div class="w-full h-full overflow-auto shadow-inner flex">
    {@render props.children()}
  </div>
</div>
