<script lang="ts">
  import { Button, buttonVariants } from "@ui/button";
  import { ChevronDown } from "lucide-svelte";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@ui/dropdown-menu";
  import { account_store } from "$lib/stores/account";
  import { auth_store } from "$lib/stores/auth";

  const account = account_store;
  const auth = auth_store;
</script>

<div class="flex">
  <a href={$account ? "/dashboard/me" : "/signin"}>
    <Button class="rounded-r-none relative" loading={$account === undefined}>
      {#if $account?.picture}
        <img
          src={$account?.picture}
          alt=""
          class="h-full aspect-square rounded-full mr-2 pointer-events-none"
        />
      {/if}
      {$account ? $account.name : "Sign in"}
    </Button>
  </a>
  <DropdownMenu>
    <DropdownMenuTrigger
      disabled={$account === undefined}
      class={buttonVariants({ size: "icon", class: "rounded-l-none" })}
    >
      <ChevronDown size={18} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onclick={auth.logout}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
