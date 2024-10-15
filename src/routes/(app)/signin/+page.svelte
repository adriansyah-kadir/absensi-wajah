<script lang="ts">
  import { google_signin } from "./helper";
  import { Button } from "@ui/button";
  import { Checkbox } from "@ui/checkbox";
  import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
  import { Input } from "@ui/input";
  import Or from "@ui/or.svelte";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { signin_schema } from "./schema";
  import {
    FormButton,
    FormControl,
    FormField,
    FormFieldErrors,
    FormLabel,
  } from "@ui/form";
  import { page } from "$app/stores";

  const props: {
    data: PageData;
  } = $props();
  const form = superForm(props.data.signin_form, {
    validators: zodClient(signin_schema),
  });
  const { form: formData, enhance } = form;
  const next = $page.url.searchParams.get("next") ?? "/";
</script>

<div class="center g bg h-screen w-screen flex-col gap-10">
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Sign In</CardTitle>
    </CardHeader>
    <CardContent>
      <form action="?/signin" method="post" use:enhance>
        <FormField {form} name="username">
          <FormControl let:attrs>
            <FormLabel>Username</FormLabel>
            <Input {...attrs} bind:value={$formData.username} />
          </FormControl>
          <FormFieldErrors />
        </FormField>
        <FormField {form} name="password">
          <FormControl let:attrs>
            <FormLabel>Password</FormLabel>
            <Input {...attrs} type="password" bind:value={$formData.password} />
          </FormControl>
          <FormFieldErrors />
        </FormField>
        <FormField {form} name="remember">
          <FormControl let:attrs>
            <div class="flex items-center gap-2">
              <Checkbox {...attrs} bind:checked={$formData.remember} />
              <FormLabel>Remember me</FormLabel>
            </div>
          </FormControl>
          <FormFieldErrors />
        </FormField>
        <FormButton type="submit">Login</FormButton>
      </form>
      <Or className="my-2"><small>OR</small></Or>
      <Button class="w-full" variant="secondary" onclick={google_signin(next)}>
        <div class="iconify-color mr-2 h-6 w-6 logos--google-icon"></div>
        <p>Sign in with Google</p>
      </Button>
    </CardContent>
  </Card>
  <p>
    Already have an account? <a href="/signup" class="text-blue-600">Register</a
    >
  </p>
</div>

<style>
  .bg {
    background-color: #ffffff;
    opacity: 0.8;
    background-image: radial-gradient(#0d8149 1.75px, #ffffff 1.75px);
    background-size: 35px 35px;
  }
</style>
