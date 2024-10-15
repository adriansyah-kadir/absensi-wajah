import { z } from "zod";
import senv from "$env/static/public"
import denv from "$env/dynamic/public"

export const clientEnvSchema = z.object({
  PUBLIC_APP_NAME: z.string(),
  PUBLIC_SUPABASE_URL: z.string(),
  PUBLIC_SUPABASE_ANON_KEY: z.string(),
})

export default clientEnvSchema.parse({ ...senv, ...denv })
