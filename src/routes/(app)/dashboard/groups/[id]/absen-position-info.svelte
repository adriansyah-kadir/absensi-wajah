<script lang="ts">
  import { Button } from "@ui/button";
  import type { AbsenLocation } from "./location.svelte";

  const props: {
    absen_location: AbsenLocation;
  } = $props();

  function destroy() {
    props.absen_location.destroy();
  }
</script>

<div class="min-w-60">
  <div>
    <Button onclick={() => props.absen_location.save()}>Save</Button>
    <Button variant="destructive" onclick={destroy}>Delete</Button>
    <p>
      {props.absen_location.layers.circle.getLatLng().toString()}
    </p>
  </div>
</div>
