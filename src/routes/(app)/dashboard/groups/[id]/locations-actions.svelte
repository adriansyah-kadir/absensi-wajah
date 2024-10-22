<script lang="ts">
  import { Button } from "@ui/button";
  import { Plus, Locate } from "lucide-svelte";
  import { AbsenLocation } from "./location.svelte";
  import { current_location } from "$lib/stores/location";
  import { getClient } from "$lib/supabase/client";
  import type { fetchGroupInfo, QueryOf } from "$lib/supabase/query";
  import { toastPromise } from "$lib/utils";

  const {
    group,
    absen_locations = $bindable([]),
    ...props
  }: {
    map: L.Map;
    group: QueryOf<typeof fetchGroupInfo>;
    absen_locations: AbsenLocation[];
  } = $props();

  const client = getClient();

  async function addAbsenLocation() {
    const result = await client
      .from("absen_locations")
      .insert({
        group_id: group.id,
        latitude: $current_location!.coords.latitude,
        longitude: $current_location!.coords.longitude,
        radius: 5,
      })
      .select().single()

      if(result.data) {

    absen_locations.push(new AbsenLocation(props.map, result.data));
      }
  }

  function focusToCurrentLocation() {
    const c = current_location.toLatLng();
    if (c) props.map.panTo(c);
  }
</script>

<div class="flex justify-end gap-2 items-center">
  <Button size="icon" variant="outline" onclick={focusToCurrentLocation}
    ><Locate size={18} /></Button
  >
  <Button
    size="icon"
    variant="outline"
    onclick={() => toastPromise(addAbsenLocation(), "Insert Absen Location")}
    ><Plus size={18} /></Button
  >
</div>
