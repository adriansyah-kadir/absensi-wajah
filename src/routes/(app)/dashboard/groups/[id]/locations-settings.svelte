<script lang="ts">
  import L from "leaflet";
  import type { Map } from "leaflet";
  import { current_location } from "$lib/stores/location";
  import { AbsenLocation } from "./location.svelte";
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

  const {
    group,
  }: {
    group: QueryOf<typeof fetchGroupInfo>;
  } = $props();

  const client = getClient();

  let map: Map | undefined = $state();

  let absen_locations: AbsenLocation[] = $state([]);

  watch(
    () => map,
    () => {
      if (map) {
        fetchGroupLocations(client, group.id).then((v) => {
          v.forEach((e) => {
            absen_locations.push(
              new AbsenLocation(map!, e, { draggable: true }),
            );
          });
        });
      }
    },
  );

  onMount(() => {
    current_location.wait.then((loc) => {
      map = L.map("map").setView([loc.coords.latitude, loc.coords.longitude], 19);
      L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        minZoom: 0,
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }).addTo(map);
    });
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

{#if $current_location}
  <div id="map" class="w-full h-full rounded-md shadow">
    {#if map}
      <div class="absolute top-5 right-5 z-[100000]">
        <LocationActions bind:absen_locations {group} {map} />
      </div>
    {/if}
  </div>
{:else}
  <div class="w-full h-full center">
    <Spinner size="50px" />
    Getting Locations...
  </div>
{/if}
