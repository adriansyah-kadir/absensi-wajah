import { superValidate } from "sveltekit-superforms";
import type { RequestEvent } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { signin_schema } from "./schema";

export const load = async (ev: RequestEvent) => {
  return {
    signin_form: await superValidate(zod(signin_schema))
  }
}
