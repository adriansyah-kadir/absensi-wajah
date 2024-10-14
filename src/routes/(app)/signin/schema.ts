import { z } from "zod";

export const signin_schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  remember: z.boolean().default(false),
})
