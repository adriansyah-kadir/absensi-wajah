import { getClient } from "$lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { writable } from "svelte/store";

export const auth_context_key = "auth";

export type AuthContext = ReturnType<typeof createAuthStore>;

export function createAuthStore() {
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
