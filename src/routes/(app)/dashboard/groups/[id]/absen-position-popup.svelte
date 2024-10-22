<script lang="ts">
  import { Button } from "@ui/button";
  import type { AbsenLocation } from "./location.svelte";
  import { Slider } from "@ui/slider";
  import { Label } from "@ui/label";

  const props: {
    absen_location: AbsenLocation;
  } = $props();

  let radius: number = $state(props.absen_location.layers.circle.getRadius());

  $effect(() => {
    props.absen_location.setRadius(radius);
  });

  function destroy() {
    props.absen_location.destroy();
  }
</script>

<div class="min-w-60">
  <h3>Location: {props.absen_location.data.label ?? props.absen_location.data.id}</h3>
  <p>
    {props.absen_location.layers.circle.getLatLng().toString()}
  </p>
  <p class="space-y-2">
    <Label>Radius ({radius}m)</Label>
    <Slider
      value={[radius]}
      max={50}
      min={5}
      step={5}
      onValueChange={(v) => {
        const value = v.at(0);
        if (value) radius = value;
      }}
    />
  </p>
  <div>
    <Button onclick={() => props.absen_location.save()}>Save</Button>
    <Button variant="destructive" onclick={destroy}>Delete</Button>
  </div>
</div>
