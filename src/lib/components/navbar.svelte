<script>
  import { Button } from "@ui/button";
  import { Card, CardHeader, CardTitle } from "@ui/card";
  import CardContent from "@ui/card/card-content.svelte";
  import { Paperclip, Menu } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import AccountActions from "./account_actions.svelte";
    import clientEnv from "$lib/client-env";

  let showMobileMenu = $state(false);
</script>

<div
  class="sticky left-0 top-0 z-50 hidden w-full flex-shrink-0 px-5 backdrop-blur-md sm:block"
>
  <nav class="mx-auto flex h-14 w-full max-w-5xl items-center">
    <div class="center h-full">
      <span style:view-transition-name="brand-logo">
        <Button variant="ghost" size="icon" class="flex-shrink-0"
          ><Paperclip size={18} /></Button
        >
      </span>
      <h2 class="text-lg font-semibold leading-none">{clientEnv.PUBLIC_APP_NAME}</h2>
    </div>
    <div class="w-full"></div>
    <div class="flex gap-5">
      <a href="/dashboard" class="text-blue-600">Dashboard</a>
      <a href="/pricing" class="text-blue-600">Pricing</a>
      <a href="/about" class="text-blue-600">About</a>
    </div>
    <div class="w-full"></div>
    <AccountActions />
  </nav>
</div>
<div
  class="sticky bottom-0 left-0 flex h-14 w-full items-center border-t-[1px] px-5 backdrop-blur-md sm:hidden"
>
  <div class="center h-full" style:view-transition-name="brand">
    <span style:view-transition-name="brand-logo">
      <Button variant="ghost" size="icon" class="flex-shrink-0"
        ><Paperclip size={18} /></Button
      >
    </span>
    <h2 class="text-lg font-semibold">RAA</h2>
  </div>
  <div class="w-full"></div>
  <AccountActions />
  <Button
    onclick={() => (showMobileMenu = !showMobileMenu)}
    size="icon"
    class="flex-shrink-0"
    variant="ghost"
  >
    <Menu size={18} />
  </Button>

  {#if showMobileMenu}
    <div
      class="absolute bottom-full left-0 w-full p-3"
      transition:fly={{ y: -20 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
        </CardHeader>
        <CardContent
          class="flex flex-col px-0 child:flex child:h-10 child:items-center child:px-5 hover:child:bg-foreground/10"
        >
          <a href="/dashboard" class="text-blue-600">Dashboard</a>
          <a href="/dashboard" class="text-blue-600">Pricing</a>
          <a href="/dashboard" class="text-blue-600">About</a>
        </CardContent>
      </Card>
    </div>
  {/if}
</div>
