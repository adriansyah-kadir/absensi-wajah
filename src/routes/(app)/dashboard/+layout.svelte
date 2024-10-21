<script lang="ts">
  import SidebarBrand from "$lib/components/sidebar/sidebar-brand.svelte";
  import SidebarToggle from "$lib/components/sidebar/sidebar-toggle.svelte";
  import Sidebar from "$lib/components/sidebar/sidebar.svelte";
  import { onAuth, signin, auth_store } from "$lib/stores/auth";
  import Spacer from "@ui/spacer.svelte";
  import { type Snippet } from "svelte";
  import SidebarProjects from "./sidebar-projects.svelte";
  import SidebarAccounts from "./sidebar-accounts.svelte";
  import Spinner from "@ui/spinner.svelte";

  const props: {
    children: Snippet;
  } = $props();

  onAuth(() => {}, signin);
</script>

{#if $auth_store}
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
{:else}
  <div class="w-screen h-screen center">
    <Spinner size="50px" />
  </div>
{/if}
