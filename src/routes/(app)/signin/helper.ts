import { getClient } from "$lib/supabase/client";

export function google_signin(next: string = '/') {
  const client = getClient()

  return () => {
    client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/register?next=${next}`
      }
    })
  }
}
