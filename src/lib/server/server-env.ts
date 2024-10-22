import clientEnv, { clientEnvSchema } from "$lib/client-env";
import { z } from "zod";
import * as senv from "$env/static/private"
import * as denv from "$env/dynamic/private"

export const serverEnvSchema = z.object({
}).merge(clientEnvSchema)

export default serverEnvSchema.parse({ ...senv, ...denv, ...clientEnv })
