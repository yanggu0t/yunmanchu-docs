import * as line from '@line/bot-sdk';
import { ObjectId } from 'mongodb';

import { env } from '../config/env';
import { templates } from '../messages/templates';
import { collections, updateAnnouncement } from './db';

// LINE Client 設定
const config = {
  channelAccessToken: env.LINE_TOKEN,
};

// 建立 LINE Client 實例
const lineClient = new line.Client(config);

// 定義狀態列舉
enum BotStatus {
  Initial = 'initial',
  WaitingForVisibility = 'waiting_for_visibility',
  WaitingForContent = 'waiting_for_content',
  ConfirmingContent = 'confirming_content',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled',
}

// 全域狀態
let status: BotStatus = BotStatus.Initial;
let updateContent = {
  visible: true,
  announcement: '',
};

// 檢查文字元件的輔助函數
function isTextComponent(component: unknown): component is { text: string } {
  return (
    typeof component === 'object' &&
    component !== null &&
    'text' in component &&
    typeof (component as { text: unknown }).text === 'string'
  );
}

// 更新模板文字的輔助函數
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function updateTemplateText(template: any, index: number, newText: string) {
  const content = template.body.contents[index];
  if (content && isTextComponent(content)) {
    content.text = newText;
  }
}

// 封裝推送訊息的方法
async function pushMessage(message: line.Message | line.Message[]) {
  try {
    await lineClient.pushMessage(env.LINE_GROUPID, message);
  } catch (error) {
    console.error('推送訊息失敗:', error);
    throw new Error('推送訊息失敗');
  }
}

// 處理查詢功能
async function handleSearch() {
  const content = await collections.announcements.findOne({
    _id: new ObjectId(env.ANNOUNCEMENT_ID),
  });
  if (!content) throw new Error('找不到公告');

  const searchTemplate = {
    ...templates.search,
    body: {
      ...templates.search.body,
      contents: [...templates.search.body.contents],
    },
  };

  updateTemplateText(searchTemplate, 0, `目前顯示狀態：${content.visible}`);
  updateTemplateText(searchTemplate, 2, content.announcement);

  await pushMessage({
    type: 'flex',
    altText: '查詢結果',
    contents: searchTemplate,
  });
}
async function handleUpdate() {
  if (status !== BotStatus.Initial) {
    await pushMessage({
      type: 'text',
      text: '請先完成當前操作或使用「取消」指令',
    });
    return;
  }
  status = BotStatus.WaitingForVisibility;
  await pushMessage({
    type: 'flex',
    altText: '是否顯示公告',
    contents: templates.visible,
  });
}

async function handleConfirmation(isConfirmed: boolean) {
  if (status === BotStatus.WaitingForVisibility) {
    if (isConfirmed) {
      updateContent.visible = true;
      status = BotStatus.WaitingForContent;
      await pushMessage({
        type: 'text',
        text: '請輸入公告內容',
      });
    } else {
      updateContent = {
        visible: false,
        announcement:
          '(模板)公告！3/4（五）、3/5（六 ）還有空房，歡迎電洽民宿！(待修改)',
      };
      await updateAnnouncement(updateContent);
      status = BotStatus.Initial; // 更改這裡
      await pushMessage({
        type: 'text',
        text: '已關閉顯示公告',
      });
    }
  } else if (status === BotStatus.ConfirmingContent) {
    if (isConfirmed) {
      await updateAnnouncement(updateContent);

      const announceChangeTemplate = {
        ...templates.announceChange,
        body: {
          ...templates.announceChange.body,
          contents: [...templates.announceChange.body.contents],
        },
      };

      updateTemplateText(announceChangeTemplate, 1, updateContent.announcement);

      await pushMessage({
        type: 'flex',
        altText: '公告已更新',
        contents: announceChangeTemplate,
      });
      status = BotStatus.Initial;
    } else {
      status = BotStatus.Initial;
      await pushMessage({
        type: 'text',
        text: '已取消更新',
      });
    }
  }
}

// 處理取消操作
async function handleCancel() {
  status = BotStatus.Initial;
  await pushMessage({
    type: 'text',
    text: `動作取消，當前狀態：${status}`,
  });
}

// 處理狀態查詢
async function handleStatus() {
  await pushMessage({
    type: 'text',
    text: `當前狀態：${status}`,
  });
}

// 處理功能選單
async function handleMenu() {
  await pushMessage({
    type: 'flex',
    altText: '功能選單',
    contents: templates.chooser,
  });
}

// 處理模板顯示
async function handleTemplate() {
  await pushMessage({
    type: 'text',
    text: '(模板)公告！3/4（五）、3/5（六 ）還有空房，歡迎電洽民宿！(待修改)',
  });
}

// 處理內容輸入
async function handleContentInput(text: string) {
  if (status === BotStatus.WaitingForContent) {
    updateContent.announcement = text;

    const announceCheckTemplate = {
      ...templates.announceCheck,
      body: {
        ...templates.announceCheck.body,
        contents: [...templates.announceCheck.body.contents],
      },
    };

    updateTemplateText(announceCheckTemplate, 1, text);

    await pushMessage({
      type: 'flex',
      altText: '確認更新內容',
      contents: announceCheckTemplate,
    });
    status = BotStatus.ConfirmingContent;
  } else if (status === BotStatus.Failed) {
    await pushMessage({
      type: 'text',
      text: `錯誤-- 訊息：${text} 狀態：${status}`,
    });
  }
}

// 主要處理訊息的方法
export async function handleMessage(event: line.MessageEvent) {
  if (event.message.type !== 'text') return;

  const text = event.message.text;

  try {
    switch (text) {
      case '查詢':
        await handleSearch();
        break;

      case '更新':
        await handleUpdate();
        break;

      case '是':
        await handleConfirmation(true);
        break;

      case '否':
        await handleConfirmation(false);
        break;

      case '取消':
        await handleCancel();
        break;

      case '狀態':
        await handleStatus();
        break;

      case '功能':
        await handleMenu();
        break;

      case '模板':
        await handleTemplate();
        break;

      default:
        await handleContentInput(text);
        break;
    }
  } catch (error) {
    console.error('處理訊息失敗:', error);
    status = BotStatus.Failed;
    await pushMessage({
      type: 'text',
      text: '處理訊息時發生錯誤，請再試一次',
    });
    status = BotStatus.Initial;
    updateContent = {
      visible: true,
      announcement: '',
    };
  }
}
