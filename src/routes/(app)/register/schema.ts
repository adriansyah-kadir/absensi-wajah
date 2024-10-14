import { z } from "zod";

export const register_schema = z.object({
  name: z.string().min(3)
})
