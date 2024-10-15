import { Hono } from "hono";

export const hono = new Hono()
  .basePath('/api')
  .get('/checkhealth', c => {
    return c.json({
      status: "OK"
    })
  })

export type HonoApi = typeof hono
