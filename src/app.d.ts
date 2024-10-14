// See https://kit.svelte.dev/docs/types#app

import type { getClient } from "$lib/supabase/server";
import type { Session, User } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: ReturnType<typeof getClient>,
      getUser: () => Promise<User | null>,
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
