import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ev => {
  ev.depends('groups:info')

  const client = ev.locals.supabase
  const user = await ev.locals.getUser()

  if (!user) return redirect(302, '/signin');

  async function getGroup() {
    const { data, error } = await client.from('groups').select('*').eq('id', ev.params.id).eq('owner_id', user!.id).single()
    if (!data) throw error

    return data
  }

  return {
    group: getGroup()
  }
}
