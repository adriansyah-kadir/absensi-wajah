<script lang="ts">
  import { Button, buttonVariants } from "@ui/button";
  import { ChevronDown } from "lucide-svelte";
  import { getContext } from "svelte";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@ui/dropdown-menu";
  import {
    account_context_key,
    type AccountContext,
  } from "$lib/stores/account";
  import { auth_context_key, type AuthContext } from "$lib/stores/auth";

  const auth: AuthContext = getContext(auth_context_key);
  const account: AccountContext = getContext(account_context_key);
</script>

<div class="flex">
  <Button
    href={$account ? "" : "/signin"}
    class="rounded-r-none relative"
    loading={$account === undefined}
  >
    {$account ? $account.name : "Sign in"}
  </Button>
  <DropdownMenu>
    <DropdownMenuTrigger
      class={buttonVariants({ size: "icon", class: "rounded-l-none" })}
    >
      <ChevronDown size={18} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onclick={auth.logout}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
