import type { AppRouter } from '@/server';
import { createClient } from 'jstack';

export const client = createClient<AppRouter>({
  baseUrl: `${getBaseUrl()}/api`,
});

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_API_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_API_URL}`;
  }
  // Use the actual port from the window location in browser
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
}
