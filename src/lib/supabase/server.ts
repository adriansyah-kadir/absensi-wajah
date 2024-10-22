import { createServerClient } from "@supabase/ssr";
import type { RequestEvent } from "@sveltejs/kit";
import type { Database } from "./types";
import serverEnv from "$lib/server/server-env";

export function getClient(ev: RequestEvent) {
  const cookieStore = ev.cookies;

  return createServerClient<Database>(
    serverEnv.PUBLIC_SUPABASE_URL,
    serverEnv.PUBLIC_SUPABASE_ANON_KEY,
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
