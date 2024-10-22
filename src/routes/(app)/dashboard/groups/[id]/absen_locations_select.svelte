<script lang="ts">
  import { Select, SelectContent, SelectItem, SelectTrigger } from "@ui/select";
  import { absen_locations, AbsenLocation } from "./location.svelte";

  const props: {
    onChange?: (v?: AbsenLocation) => void;
  } = $props();

  const select_values = $derived(
    $absen_locations.map((e) => ({
      value: e,
      label: e.data.label ?? e.data.id.toString(),
    })),
  );

  const display: string = $derived.by(() => {
    if (!selected) return "Select Locations";
    return "Location: " + (selected.data.label ?? selected.data.id.toString());
  });

  let selected: AbsenLocation | undefined = $state();

  $effect(() => {
    if (props.onChange) props.onChange(selected);
  });
</script>

<Select selected={{ value: selected?.data.id }}>
  <SelectTrigger>
    {display}
  </SelectTrigger>
  <SelectContent class="z-[999999]">
    {#each select_values as location (location.value.data.id)}
      <SelectItem
        onclick={() => {
          if (selected) selected = undefined;
          else selected = location.value;
        }}
        value={location.value.data.id}
        label={location.value.data.id.toString()}>{location.label}</SelectItem
      >
    {/each}
  </SelectContent>
</Select>
