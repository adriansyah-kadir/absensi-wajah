import { hc } from 'hono/client';
import type { HonoApi } from './server/api';

let browserClient: ReturnType<typeof hc<HonoApi>>;

export const honoClient = (fetch: Window['fetch']): ReturnType<typeof hc<HonoApi>> => {
  const isBrowser = typeof window !== 'undefined';
  const origin = isBrowser ? window.location.origin : '';

  if (isBrowser && browserClient) {
    return browserClient;
  }

  const client = hc<HonoApi>(origin + '/api', { fetch });

  if (isBrowser) {
    browserClient = client;
  }

  return client;
};
