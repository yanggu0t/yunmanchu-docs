import { z } from 'zod';

import type { AnnouncementRequest } from '@/types/announcement';

import { j, publicProcedure } from '../jstack';
import { getAnnouncement, updateAnnouncement } from '../lib/db';

export const announcementRouter = j.router({
  recent: publicProcedure.query(async ({ c }) => {
    const res = await getAnnouncement();
    return c.superjson(res);
  }),

  update: publicProcedure
    .input(
      z.object({
        visible: z.boolean().optional(),
        announcement: z.string(),
      }) satisfies z.ZodType<AnnouncementRequest>
    )
    .mutation(async ({ c, input }) => {
      await updateAnnouncement(input);
      return c.superjson({ success: true });
    }),
});
