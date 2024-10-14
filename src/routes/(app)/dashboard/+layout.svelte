<script lang="ts">
  import { goto } from '$app/navigation';
  import SidebarBrand from '$lib/components/sidebar/sidebar-brand.svelte';
  import SidebarToggle from '$lib/components/sidebar/sidebar-toggle.svelte';
  import Sidebar from '$lib/components/sidebar/sidebar.svelte';
  import { auth_context_key, type AuthContext } from '$lib/stores/auth';
  import Spacer from '@ui/spacer.svelte';
  import { getContext, type Snippet } from 'svelte';
  import SidebarProjects from './sidebar-projects.svelte';
  import SidebarAccounts from './sidebar-accounts.svelte';

  const props: {
    children: Snippet;
  } = $props();

  const auth: AuthContext = getContext(auth_context_key)
  
  $effect(() => {
    if($auth === null) goto('/signin?next=/dashboard', {replaceState: true})
  })
</script>

<div class="flex h-screen w-screen bg-background dark:text-foreground overflow-hidden">
  <Sidebar>
    <SidebarBrand />
    <SidebarProjects/>
    <Spacer />
    <SidebarAccounts/>
    <SidebarToggle />
  </Sidebar>
  <div class="w-full h-full overflow-auto shadow-inner">
    {@render props.children()}
  </div>
</div>
