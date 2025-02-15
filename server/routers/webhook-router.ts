import { j, publicProcedure } from '../jstack';
import { handleMessage } from '../lib/line';

export const webhookRouter = j.router({
  line: publicProcedure.mutation(async ({ c }) => {
    try {
      const body = await c.req.json();

      if (!body.events || !Array.isArray(body.events)) {
        throw new Error('無效的 webhook 資料格式');
      }

      // 處理每個事件
      for (const event of body.events) {
        if (event.type === 'message') {
          await handleMessage(event);
        }
      }
    } catch (error) {
      console.error('處理 webhook 失敗:', error);
      throw new Error('處理 webhook 失敗');
    }
  }),
});
