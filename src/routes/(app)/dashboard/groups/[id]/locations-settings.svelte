<script lang="ts">
  import L from "leaflet";
  import type { Map } from "leaflet";
  import { current_location } from "$lib/stores/location";
  import { absen_locations, AbsenLocation } from "./location.svelte";
  import LocationActions from "./locations-actions.svelte";
  import {
    fetchGroupLocations,
    type fetchGroupInfo,
    type QueryOf,
  } from "$lib/supabase/query";
  import { getClient } from "$lib/supabase/client";
  import Spinner from "@ui/spinner.svelte";
  import { watch } from "runed";
  import { onMount } from "svelte";
  import AbsenLocationsSelect from "./absen_locations_select.svelte";

  const {
    group,
  }: {
    group: QueryOf<typeof fetchGroupInfo>;
  } = $props();

  const client = getClient();

  let map: Map | undefined = $state();

  function handleSelectedLocation(v?: AbsenLocation) {
    const latlng = v?.layers.marker.getLatLng() ?? current_location.toLatLng();
    if (latlng) map?.panTo(latlng);
  }

  function fetchGroupAbsenLocations(map: Map) {
    fetchGroupLocations(client, group.id).then((locations_data) => {
      $absen_locations.push(
        ...locations_data.map(
          (e) => new AbsenLocation(map!, e, { draggable: true }),
        ),
      );
    });
  }

  function addTileLayer(map: Map) {
    L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      minZoom: 0,
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);
  }

  onMount(() => {
    current_location.wait.then((loc) => {
      map = L.map("map").setView(
        [loc.coords.latitude, loc.coords.longitude],
        19,
      );

      addTileLayer(map);
      fetchGroupAbsenLocations(map);
    });
  });
</script>

<!-- leaflet css -->
<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  />
</svelte:head>

<div id="map" class="w-full h-full rounded-md relative">
  {#if map}
    <div class="absolute top-5 right-5 z-[100000] space-y-2">
      <LocationActions bind:absen_locations={$absen_locations} {group} {map} />
      <AbsenLocationsSelect onChange={handleSelectedLocation} />
    </div>
  {/if}

  <div
    class="w-fit h-fit center absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 z-[10000]"
  >
    <Spinner size="50px" class="mr-4" />
    Getting Locations...
  </div>
</div>
