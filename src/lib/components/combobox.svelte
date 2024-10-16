<script lang="ts" generics="T">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Command from "@ui/command";
  import * as Popover from "@ui/popover";
  import { Button } from "@ui/button";
  import { cn } from "$lib/utils.js";
  import { tick } from "svelte";
  import { SvelteSet } from "svelte/reactivity";

  const props: {
    values: T[];
    label: (v: T) => string;
    id: (v: T) => string;
  } = $props();

  let open = $state(false);
  let selected = $state(new SvelteSet<string>());

  let displayValue: string = $state("All");

  $effect(() => {
    console.log(selected);
  });

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between"
    >
      {displayValue}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search framework..." />
      <Command.Empty>No framework found.</Command.Empty>
      <Command.Group>
        {#each props.values as value}
          {@const label = props.label(value)}
          {@const id = props.id(value)}
          <Command.Item
            value={id}
            onSelect={() => {
              if (selected.has(id)) selected.delete(id);
              else selected.add(id);
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <Check
              class={cn(
                "mr-2 h-4 w-4",
                !selected?.has(id) && "text-transparent",
              )}
            />
            {label}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
