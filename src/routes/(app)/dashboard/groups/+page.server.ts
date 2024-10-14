import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ev => {
  ev.depends('groups:list')

  const { user, supabase } = ev.locals
  if (!user) redirect(302, '/signin');

  async function getGroups() {
    const { data, error } = await supabase.from('groups').select('*, group_members(*)').eq('owner_id', user!.id)
    if (!data) throw error

    return data
  }

  return {
    groups: getGroups()
  }
}
