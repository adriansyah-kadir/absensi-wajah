import { get, writable } from "svelte/store";
import { auth_store } from "./auth";
import type { Tables } from "$lib/supabase/types";
import { getClient } from "$lib/supabase/client";
import { toast } from "svelte-sonner";
import { browser } from "$app/environment";

export const account_context_key = "account-context-key";

export type AccountContext = ReturnType<typeof createAccountStore>;

export type Account = Tables<"accounts"> | null | undefined;

export const account_store = createAccountStore();

export function createAccountStore() {
  const store = writable<Account>(undefined);
  const client = getClient();
  const { subscribe, set, update } = store;

  auth_store.subscribe(async (auth) => {
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

  subscribe(account => {
    const auth = get(auth_store)
    if(!account?.picture && auth && auth.user.user_metadata?.picture) {
      update(prev => {
        prev!.picture = auth.user.user_metadata.picture
        return prev
      })
    }
  })

  return {
    subscribe,
  };
}
