import { getClient } from '$lib/supabase/server'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = getClient(event)
  event.locals.user = (await event.locals.supabase.auth.getUser()).data.user

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
