<script lang="ts">
  import L from "leaflet";
  import type { Map } from "leaflet";
  import { onMount } from "svelte";
  import { current_location } from "$lib/stores/location";
  import { watch } from "runed";
  import { Button } from "@ui/button";
  import { LocateIcon } from "lucide-svelte";

  let map: Map | undefined = $state();
  let latlng: L.LatLngExpression = $derived([
    $current_location?.coords.latitude ?? 0,
    $current_location?.coords.longitude ?? 0,
  ]);

  function setupMap() {
    map = L.map("map").setView(latlng, 19);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);
  }

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
  <div class="absolute z-[10000] top-5 right-5 flex gap-2">
    <Button onclick={() => map?.setView(latlng)} size="icon" variant="outline"><LocateIcon size={18} /></Button>
  </div>
</div>
