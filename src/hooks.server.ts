import { getClient } from '$lib/supabase/server'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  let user = undefined as any

  event.locals.supabase = getClient(event)
  event.locals.getUser = async () => {
    user = user ?? (await event.locals.supabase.auth.getUser()).data.user
    return user
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      /**
       *        * Supabase libraries use the `content-range` and `x-supabase-api-version`
       *               * headers, so we need to tell SvelteKit to pass it through.
       *                      */
      return name === 'content-range' || name === 'x-supabase-api-version'
    }
  })
}
