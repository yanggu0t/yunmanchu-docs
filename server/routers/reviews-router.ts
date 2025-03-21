import { ReviewsResponse } from '@/types/reviews';

import { env } from '../config/env';
import { j, publicProcedure } from '../jstack';

const path = `https://featurable.com/api/v1/accounts/${env.FEATURABLE_ACCOUNT_ID}/locations/${env.FEATURABLE_LOCATION_ID}/reviews?apiKey=${env.FEATURABLE_API_KEY}`;

export const reviewsRouter = j.router({
  all: publicProcedure.query(async ({ c }) => {
    try {
      const response = await fetch(path);
      const res: ReviewsResponse = await response.json();

      if (!res.success) {
        throw new Error('無法取得評論資料');
      }

      return c.superjson(res);
    } catch (error) {
      console.error('取得評論失敗:', error);
      throw new Error('取得評論失敗');
    }
  }),
});
