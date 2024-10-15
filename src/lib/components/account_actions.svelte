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
  <Button
    href={$account ? "" : "/signin"}
    class="rounded-r-none relative"
    loading={$account === undefined}
  >
  <img src={$account?.picture} alt="" class="h-full aspect-square rounded-full mr-2">
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
