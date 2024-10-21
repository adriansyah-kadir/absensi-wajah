<script lang="ts">
  import Combobox from "$lib/components/combobox.svelte";
  import { current_location } from "$lib/stores/location";
  import type { fetchGroupInfo, QueryOf } from "$lib/supabase/query";
  import type { Tables } from "$lib/supabase/types";
  import { nonNullable } from "$lib/utils";
  import { Button } from "@ui/button";
  import { Field, FieldErrors, FormControl, FormLabel } from "@ui/form";
  import { Input } from "@ui/input";
  import { Label } from "@ui/label";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { z } from "zod";

  const props: {
    onData?: (data: z.infer<typeof schema>) => void;
  } = $props();

  const group: QueryOf<typeof fetchGroupInfo> | undefined =
    getContext("group-info");

  const members: Tables<"accounts">[] = $derived(
    group?.group_members.map((e) => e.accounts).filter(nonNullable) ?? [],
  );

  const schema = z.object({
    members: z.string().array(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    radius: z.coerce.number(),
  });

  const form = superForm(
    {
      members: [] as string[],
      latitude: $current_location?.coords.latitude ?? 0,
      longitude: $current_location?.coords.longitude ?? 0,
      radius: 5,
    },
    {
      validators: zodClient(schema),
    },
  );

  const { form: formData, validateForm } = form;

  async function handleSubmit() {
    const result = await validateForm({ focusOnError: true, update: true });
    console.log(result);
    if (!result.valid) return;
    if (props.onData) props.onData(result.data);
  }
</script>

<div class="flex flex-col gap-2">
  <Field {form} name="members">
    <FormControl let:attrs>
      <FormLabel>Members</FormLabel>
      <Combobox
        placeholder="All member"
        bind:selected={$formData.members}
        values={members}
        id={(e) => e.id}
        label={(e) => e.name ?? "-"}
      />
    </FormControl>
    <FieldErrors />
  </Field>
  <div>
    <Label>Position</Label>
    <div class="flex gap-2">
      <Field {form} name="latitude">
        <FormControl let:attrs>
          <Input
            bind:value={$formData.latitude}
            {...attrs}
            placeholder="latitude"
          />
        </FormControl>
        <FieldErrors />
      </Field>
      <Field {form} name="longitude">
        <FormControl let:attrs>
          <Input
            bind:value={$formData.longitude}
            {...attrs}
            placeholder="longitude"
          />
        </FormControl>
        <FieldErrors />
      </Field>
    </div>
  </div>
  <Field {form} name="radius">
    <FormControl let:attrs>
      <FormLabel>Radius</FormLabel>
      <Input type="range" bind:value={$formData.radius} {...attrs} />
    </FormControl>
    <FieldErrors />
  </Field>
  <Button onclick={handleSubmit}>Add</Button>
</div>
