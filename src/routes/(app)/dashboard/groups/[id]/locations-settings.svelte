<script lang="ts">
  import { getLocation } from "$lib/utils";
  import { Button } from "@ui/button";
  import type { Map, LeafletMouseEvent } from "leaflet";
  import { LocateIcon, ZoomIn, ZoomOut } from "lucide-svelte";
  import { onMount } from "svelte";

  let map: Map | undefined = $state();
  let location: GeolocationPosition | undefined = $state();

  $effect(() => {
    map?.setView(
      [
        location?.coords.latitude ?? 51.505,
        location?.coords.longitude ?? -0.09,
      ],
      map.getZoom(),
    );
  });

  function setupMap(L: typeof import("leaflet")) {
    map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    map.on("click", onmapclick);
  }

  async function focusLocation() {
    location = undefined;
    location = await getLocation();
  }

  function zoomIn() {
    map?.setZoom(map.getZoom() + 1);
  }

  function zoomOut() {
    map?.setZoom(map.getZoom() - 1);
  }

  function onmapclick(ev: LeafletMouseEvent) {
    map?.setView([ev.latlng.lat, ev.latlng.lng], map.getZoom());
  }

  onMount(() => {
    getLocation().then((data) => {
      location = data;
    });

    import("leaflet").then(setupMap);
  });
</script>

<div
  id="map"
  class="w-full h-full border rounded-md overflow-hidden shadow-inner hover:ring transition-all"
>
  <div class="absolute top-0 left-0 z-10 p-5 flex gap-2">
    <Button size="icon" variant="outline" onclick={focusLocation}
      ><LocateIcon size={18} /></Button
    >
    <Button size="icon" variant="outline" onclick={zoomIn}
      ><ZoomIn size={18} /></Button
    >
    <Button size="icon" variant="outline" onclick={zoomOut}
      ><ZoomOut size={18} /></Button
    >
  </div>
</div>
