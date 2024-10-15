<script lang="ts">
  import { defaults, superForm } from "sveltekit-superforms";
  import { zod, zodClient } from "sveltekit-superforms/adapters";
  import { register_schema } from "./schema";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
  } from "@ui/card";
  import { Button } from "@ui/button";
  import { FormControl, FormField, FormFieldErrors, FormLabel } from "@ui/form";
  import { Input } from "@ui/input";
  import { getClient } from "$lib/supabase/client";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
    import { auth_store } from "$lib/stores/auth";

  const form = superForm(defaults(zod(register_schema)), {
    validators: zodClient(register_schema),
  });
  const { form: formData, validateForm, submitting } = form;
  const client = getClient();
  const auth = auth_store;
  const next = $page.url.searchParams.get("next") ?? "/";

  async function submit() {
    const result = await validateForm({ update: true, focusOnError: true });
    if (!$auth?.user) return goto("/signin");
    if (!result.valid) return;

    const upsert_result = await client
      .from("accounts")
      .upsert(result.data)
      .eq("id", $auth.user.id)
      .select()
      .single();

    if (upsert_result.data) goto(next);
  }
</script>

<Card>
  <CardHeader>
    <CardTitle>Register</CardTitle>
  </CardHeader>
  <CardContent>
    <FormField {form} name="name">
      <FormControl let:attrs>
        <FormLabel>What should we call you?</FormLabel>
        <Input {...attrs} bind:value={$formData.name} placeholder="John doe" />
      </FormControl>
      <FormFieldErrors />
    </FormField>
  </CardContent>
  <CardFooter>
    <Button loading={$submitting} onclick={submit}>Submit</Button>
  </CardFooter>
</Card>
