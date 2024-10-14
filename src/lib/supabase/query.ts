import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export async function fetchGroups(client: SupabaseClient<Database>, owner_id: string) {
  return client.from('groups').select('*, group_members(*)').eq('owner_id', owner_id)
}
