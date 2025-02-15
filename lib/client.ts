import type { AppRouter } from '@/server';
import { createClient } from 'jstack';

export const client = createClient<AppRouter>({
  baseUrl: `${getBaseUrl()}/api`,
});

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return `https://${process.env.NEXT_PUBLIC_API_URL}`;
  }
  return `http://localhost:3000`;
}
