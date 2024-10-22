<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import {
    account_store,
  } from "$lib/stores/account";
  import Spinner from "@ui/spinner.svelte";
  import { fly } from "svelte/transition";
  import RegisterForm from "./register-form.svelte";

  const next = $page.url.searchParams.get("next") ?? "/";
  const account = account_store;

  $effect(() => {
    if($account?.name) goto(next);
  })
</script>

<div class="h-screen w-screen center">
  {#if $account === undefined}
    <Spinner size="50px" />
  {:else}
    <div transition:fly={{ y: 20 }}>
      <RegisterForm />
    </div>
  {/if}
</div>
