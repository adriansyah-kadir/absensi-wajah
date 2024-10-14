<script lang='ts' module>
  const auth = createAuthStore()
  const account = createAccountContext(auth)
</script>

<script lang="ts">
  import {Toaster} from "@ui/sonner"
  import {createAuthStore, auth_context_key} from "$lib/stores/auth"
  import PageLoadingIndicator from '$lib/components/page-loading-indicator.svelte';
  import ViewTransition from '$lib/components/view-transition.svelte';
  import { setContext, type Snippet } from 'svelte';
  import { account_context_key, createAccountContext } from "$lib/stores/account";
  import '../../app.css';
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  const props: { children: Snippet } = $props();
  const next = $page.url.searchParams.get('next') ?? $page.url.pathname

  setContext(auth_context_key, auth)
  setContext(account_context_key, account)

  account.subscribe(v => {
    if(v?.name === null) goto('/register?next=' + next);
  })
</script>

{@render props.children()}
<PageLoadingIndicator />
<ViewTransition />
<Toaster richColors/>