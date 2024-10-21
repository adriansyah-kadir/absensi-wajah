import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createServerClient } from "@supabase/ssr";
import type { RequestEvent } from "@sveltejs/kit";
import type { Database } from "./types";

export function getClient(ev: RequestEvent) {
  const cookieStore = ev.cookies;

  return createServerClient<Database>(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                path: options.path ?? "/",
              }),
            );
          } catch (error) {
            console.log("error", error);
          }
        },
      },
    },
  );
}
