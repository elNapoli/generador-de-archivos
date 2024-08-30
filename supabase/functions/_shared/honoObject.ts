import { Hono } from 'jsr:@hono/hono'
import { cors } from 'jsr:@hono/hono/cors'

export const honoObject = path => new Hono().basePath(path).use('*', cors({
  origin: '*',
  allowHeaders: ['authorization', 'x-client-info', 'apikey'],
}))
