'use client';

import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/client';
import type { AnnouncementResponse } from '@/types/announcement';

/**
 * Custom hook for fetching announcement data from the API
 * Uses React Query for caching and error handling
 */
export function useAnnouncement() {
  return useQuery({
    queryKey: ['announcement', 'recent'],
    queryFn: async (): Promise<AnnouncementResponse> => {
      try {
        const response = await client.announcement.recent.$get();
        if (response.ok) {
          const data = await response.json();
          return data;
        }
        throw new Error('Failed to fetch announcement');
      } catch (error) {
        // Return null for missing announcements or other errors
        // This allows the component to handle gracefully
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1, // Only retry once for announcement data
    refetchOnWindowFocus: false,
    enabled: true,
  });
}
