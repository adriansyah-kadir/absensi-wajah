import { writable } from "svelte/store";
import type { AuthContext } from "./auth";
import type { Tables } from "$lib/supabase/types";
import { getClient } from "$lib/supabase/client";
import { toast } from "svelte-sonner";
import { browser } from "$app/environment";

export const account_context_key = "account-context-key";

export type AccountContext = ReturnType<typeof createAccountContext>

export type Account = Tables<"accounts"> | null | undefined;

export function createAccountContext(auth: AuthContext) {
  const store = writable<Account>(undefined);
  const client = getClient();
  const { subscribe, set } = store;

  auth.subscribe(async (auth) => {
    if (auth) {
      const result = await client
        .from("accounts")
        .select("*")
        .eq("id", auth.user.id)
        .limit(1)
        .single();

      if (result.error?.code === "PGRST116" /** no data */) {
        if (browser && !navigator.onLine) toast.error("OFFLINE");
        else {
          const create_result = await client
            .from("accounts")
            .insert({})
            .single();
          set(create_result.data);
        }
      } else set(result.data);
    } else set(auth);
  });

  return {
    subscribe,
  };
}
