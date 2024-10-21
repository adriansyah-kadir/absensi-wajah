<script lang="ts" generics="T">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import * as Command from "@ui/command";
  import * as Popover from "@ui/popover";
  import { Button } from "@ui/button";
  import { cn } from "$lib/utils.js";
  import { tick } from "svelte";
  import { watch } from "runed";

  let {
    selected = $bindable([]),
    ...props
  }: {
    placeholder?: string;
    values: T[];
    label: (v: T) => string;
    id: (v: T) => string;
    selected?: string[];
  } = $props();

  let open = $state(false);

  let displayValue: string = $state(props.placeholder ?? "-");

  let trigger_width: number = $state(0);

  watch(
    () => selected.values(),
    () => {
      const values = [...selected].map((e) => {
        return props.values.find((v) => props.id(v) === e)!;
      });
      displayValue = values.map(props.label).join(", ");
      if (values.length <= 0) displayValue = props.placeholder ?? "-";
    },
  );
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
    <div class="w-full" bind:clientWidth={trigger_width}>
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-full justify-between"
      >
        {displayValue}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </div>
  </Popover.Trigger>
  <Popover.Content class="p-0" style="width: {trigger_width}px;">
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
              const idx = selected.indexOf(id);
              if (idx >= 0) selected = selected.toSpliced(idx, 1);
              else selected = [...selected, id];
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <Check
              class={cn(
                "mr-2 h-4 w-4",
                !selected.includes(id) && "text-transparent",
              )}
            />
            {label}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
