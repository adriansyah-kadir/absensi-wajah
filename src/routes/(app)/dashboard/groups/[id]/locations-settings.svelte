<script lang="ts">
  import L from "leaflet";
  import type { Map } from "leaflet";
  import { getContext, onMount } from "svelte";
  import { current_location } from "$lib/stores/location";
  import { Button } from "@ui/button";
  import { LocateIcon, Plus } from "lucide-svelte";
  import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
  import Combobox from "$lib/components/combobox.svelte";
  import type { Writable } from "svelte/store";
  import type { Tables } from "$lib/supabase/types";

  const props: {
    group_id: number;
  } = $props();
  const members: Writable<Tables<"accounts">[]> = getContext("group-members");
  const latlng: L.LatLngExpression | undefined = $derived(
    $current_location
      ? [$current_location.coords.latitude, $current_location.coords.longitude]
      : undefined,
  );

  let map: Map | undefined = $state();

  function setupMap() {
    map = L.map("map").setView(latlng ?? [0, 0], 19);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);
  }

  $effect(() => {
    if (latlng && map) map.setView(latlng);
  });

  onMount(() => {
    setupMap();
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  />
</svelte:head>

<div
  id="map"
  class="w-full h-full border rounded-md overflow-hidden shadow-inner hover:ring transition-all"
>
  <div class="absolute z-[100000] top-5 right-5 flex gap-2">
    <Button
      onclick={() => map?.setView(latlng ?? [0, 0])}
      size="icon"
      variant="outline"><LocateIcon size={18} /></Button
    >
    <Popover>
      <PopoverTrigger asChild let:builder>
        <Button builders={[builder]} size="icon" variant="outline"
          ><Plus size={18} /></Button
        >
      </PopoverTrigger>
      <PopoverContent class="z-[100000]">
        <Combobox
          values={$members}
          label={(v) => v.name ?? "-"}
          id={(v) => v.id}
        />
      </PopoverContent>
    </Popover>
  </div>
</div>
