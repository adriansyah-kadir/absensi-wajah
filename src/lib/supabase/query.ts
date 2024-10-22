import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export type QueryOf<T extends (...any: any[]) => any> = Awaited<ReturnType<T>>;

export async function fetchGroups(
  client: SupabaseClient<Database>,
  owner_id: string,
) {
  const result = await client
    .from("groups")
    .select("*, group_members(*)")
    .eq("owner_id", owner_id);
  if (result.error) throw result.error;
  return result.data;
}

export type GroupInfoType = Awaited<ReturnType<typeof fetchGroupInfo>>;

export async function fetchGroupInfo(
  client: SupabaseClient<Database>,
  group_id: number,
) {
  const result = await client
    .from("groups")
    .select("*, group_members(accounts(*))")
    .eq("id", group_id)
    .single();
  if (result.error) throw result.error;
  return result.data;
}

export async function fetchAccountInfo(
  client: SupabaseClient<Database>,
  id: string,
) {
  const result = await client
    .from("accounts")
    .select("*")
    .eq("id", id)
    .single();
  if (result.error) throw result.error;
  return result.data;
}

export async function fetchGroupLocations(
  client: SupabaseClient<Database>,
  group_id: number,
) {
  const result = await client
    .from("absen_locations")
    .select("*")
    .eq("group_id", group_id);
  console.log(result);
  if (result.error) throw result.error;
  return result.data;
}
