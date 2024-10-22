import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types"
import clientEnv from "$lib/client-env";

export function getClient() {
  return createBrowserClient<Database>(clientEnv.PUBLIC_SUPABASE_URL, clientEnv.PUBLIC_SUPABASE_ANON_KEY)
}