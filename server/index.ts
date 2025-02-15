import { j } from './jstack';
import { connectToDatabase } from './lib/db';
import { announcementRouter } from './routers/announcement-router';
import { reviewsRouter } from './routers/reviews-router';
import { webhookRouter } from './routers/webhook-router';

// 連接資料庫
connectToDatabase().catch(console.error);

const api = j
  .router()
  .basePath('/api')
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

const appRouter = j.mergeRouters(api, {
  announcement: announcementRouter,
  reviews: reviewsRouter,
  webhook: webhookRouter,
});

export type AppRouter = typeof appRouter;
export default appRouter;
