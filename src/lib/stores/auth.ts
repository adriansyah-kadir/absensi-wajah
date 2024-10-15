import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { getClient } from "$lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { onMount } from "svelte";
import { get, writable } from "svelte/store";

export const auth_store = createAuthStore();

export function onAuth(
  on_session: (session: Session) => void,
  on_null?: () => void,
) {
  return onMount(() => {
    auth_store.subscribe((v) => {
      if (v) on_session(v);
      if (v === null) on_null?.call(undefined);
    });
  });
}

export function signin(){
  goto('/signin?next=' + get(page).url.pathname)
}

function createAuthStore() {
  const store = writable<Session | null | undefined>(undefined);
  const client = getClient();
  const { subscribe, set } = store;

  client.auth.onAuthStateChange((_, session) => {
    set(session);
  });

  subscribe((v) => console.log("logged in: ", v?.user.user_metadata.name));

  function logout() {
    set(undefined);
    client.auth.signOut();
  }

  return {
    subscribe,
    logout,
  };
}
