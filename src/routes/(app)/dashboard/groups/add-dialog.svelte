<script lang="ts">
  import { getClient } from "$lib/supabase/client";
  import { Button, buttonVariants } from "@ui/button";
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@ui/dialog";
  import { Input } from "@ui/input";
  import { Label } from "@ui/label";
  import { toastPromise } from "$lib/utils";
  import { invalidate } from "$app/navigation";

  let name: string = $state("");

  async function add() {
    const client = getClient();
    const { resolve, reject } = toastPromise("Creating group...");

    const result = await client
      .from("groups")
      .insert({ name })
      .select()
      .single();

    if (result.error) reject("Error creating group");
    else resolve("Success creating group");
    invalidate("groups:list");
  }
</script>

<Dialog>
  <DialogTrigger class={buttonVariants()}>New Group</DialogTrigger>
  <DialogContent class="h-fit">
    <DialogHeader>
      <DialogTitle>Add Group</DialogTitle>
      <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
    </DialogHeader>
    <div class="space-y-2">
      <Label>Group name</Label>
      <Input id="name" bind:value={name} />
    </div>
    <DialogFooter>
      <DialogClose class={buttonVariants({ variant: "outline" })}>
        Cancel
      </DialogClose>
      <Button onclick={add}>Submit</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
