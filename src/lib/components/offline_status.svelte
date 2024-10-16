<script>
  import { is_offline } from "$lib/stores/offline";
  import { WifiOff } from "lucide-svelte";
  import { fly } from "svelte/transition";
</script>

{#if $is_offline}
  <div
    transition:fly={{ x: 20 }}
    class="fixed top-5 right-5 bg-red-600 text-background grid grid-cols-[fit-content(1ch),_1fr] gap-2 p-5 z-[999]"
  >
    <WifiOff />
    <p>Offline</p>
    <div></div>
    <div>please ensure youre connected</div>
  </div>
{/if}
