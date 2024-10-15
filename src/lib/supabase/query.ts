import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export async function fetchGroups(client: SupabaseClient<Database>, owner_id: string) {
  const result = await client.from('groups').select('*, group_members(*)').eq('owner_id', owner_id)
  if(result.error) throw result.error
  return result.data
}

export async function fetchGroupInfo(client: SupabaseClient<Database>, group_id: string, owner_id: string) {
  const result = await client.from('groups').select('*, group_members(accounts(*))').eq('id', group_id).eq('owner_id', owner_id).single()
  if (result.error) throw result.error
  return result.data
}
