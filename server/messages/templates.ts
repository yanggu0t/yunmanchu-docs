import type { FlexBubble, FlexComponent } from '@line/bot-sdk';

export const templates = {
  chooser: {
    type: 'bubble' as const,
    hero: {
      type: 'image' as const,
      url: 'https://i.imgur.com/ZrTPiPg.jpg',
      size: 'full' as const,
      aspectRatio: '20:13',
      aspectMode: 'cover' as const,
    },
    body: {
      type: 'box' as const,
      layout: 'vertical' as const,
      contents: [
        {
          type: 'text' as const,
          text: '功能選擇',
          weight: 'bold',
          size: 'xl',
        },
      ] as FlexComponent[],
    },
    footer: {
      type: 'box' as const,
      layout: 'vertical' as const,
      spacing: 'sm',
      contents: [
        {
          type: 'button' as const,
          style: 'link',
          height: 'sm',
          action: {
            type: 'message' as const,
            label: '查詢',
            text: '查詢',
          },
        },
        {
          type: 'button' as const,
          style: 'link',
          height: 'sm',
          action: {
            type: 'message' as const,
            label: '更新',
            text: '更新',
          },
        },
        {
          type: 'box' as const,
          layout: 'vertical' as const,
          contents: [],
          margin: 'sm',
        },
      ] as FlexComponent[],
      flex: 0,
    },
  } satisfies FlexBubble,
  visible: {
    type: 'bubble' as const,
    hero: {
      type: 'image' as const,
      url: 'https://i.imgur.com/ZrTPiPg.jpg',
      size: 'full' as const,
      aspectRatio: '20:13',
      aspectMode: 'cover' as const,
    },
    body: {
      type: 'box' as const,
      layout: 'vertical' as const,
      contents: [
        {
          type: 'text' as const,
          text: '是否顯示公告',
          weight: 'bold',
          size: 'xl',
        },
      ] as FlexComponent[],
    },
    footer: {
      type: 'box' as const,
      layout: 'vertical' as const,
      spacing: 'sm',
      contents: [
        {
          type: 'button' as const,
          style: 'link',
          height: 'sm',
          action: {
            type: 'message' as const,
            label: '是',
            text: '是',
          },
        },
        {
          type: 'button' as const,
          style: 'link',
          height: 'sm',
          action: {
            type: 'message' as const,
            label: '否',
            text: '否',
          },
        },
        {
          type: 'box' as const,
          layout: 'vertical' as const,
          contents: [],
          margin: 'sm',
        },
      ] as FlexComponent[],
      flex: 0,
    },
  } satisfies FlexBubble,
  announceChange: {
    type: 'bubble' as const,
    hero: {
      type: 'image' as const,
      url: 'https://i.imgur.com/ZrTPiPg.jpg',
      size: 'full' as const,
      aspectRatio: '20:13',
      aspectMode: 'cover' as const,
    },
    body: {
      type: 'box' as const,
      layout: 'vertical' as const,
      contents: [
        {
          type: 'text' as const,
          text: '已將公告更改為：',
          weight: 'bold',
          size: 'lg',
        },
        {
          type: 'text' as const,
          text: 'Hello World',
          style: 'normal',
          weight: 'bold',
          size: 'xl',
          wrap: true,
        },
      ] as FlexComponent[],
    },
  } satisfies FlexBubble,
  announceCheck: {
    type: 'bubble' as const,
    hero: {
      type: 'image' as const,
      url: 'https://i.imgur.com/ZrTPiPg.jpg',
      size: 'full' as const,
      aspectRatio: '20:13',
      aspectMode: 'cover' as const,
    },
    body: {
      type: 'box' as const,
      layout: 'vertical' as const,
      contents: [
        {
          type: 'text' as const,
          text: '是否要將公告更改為：',
          weight: 'bold',
          size: 'lg',
        },
        {
          type: 'text' as const,
          text: 'hello, world',
          wrap: true,
          weight: 'bold',
          style: 'normal',
          size: 'xl',
        },
      ] as FlexComponent[],
    },
    footer: {
      type: 'box' as const,
      layout: 'vertical' as const,
      spacing: 'sm',
      contents: [
        {
          type: 'button' as const,
          style: 'link',
          height: 'sm',
          action: {
            type: 'message' as const,
            label: '是',
            text: '是',
          },
        },
        {
          type: 'button' as const,
          style: 'link',
          height: 'sm',
          action: {
            type: 'message' as const,
            label: '否',
            text: '否',
          },
        },
        {
          type: 'box' as const,
          layout: 'vertical' as const,
          contents: [],
          margin: 'sm',
        },
      ] as FlexComponent[],
      flex: 0,
    },
  } satisfies FlexBubble,
  search: {
    type: 'bubble' as const,
    hero: {
      type: 'image' as const,
      url: 'https://i.imgur.com/ZrTPiPg.jpg',
      size: 'full' as const,
      aspectRatio: '20:13',
      aspectMode: 'cover' as const,
    },
    body: {
      type: 'box' as const,
      layout: 'vertical' as const,
      contents: [
        {
          type: 'text' as const,
          text: '目前顯示狀態',
          weight: 'bold',
          size: 'lg',
        },
        {
          type: 'text' as const,
          text: '目前公告內容：',
          wrap: true,
          weight: 'bold',
          style: 'normal',
          size: 'xl',
        },
        {
          type: 'text' as const,
          text: 'hello, world',
          wrap: true,
          weight: 'bold',
          style: 'normal',
          size: 'xl',
        },
      ] as FlexComponent[],
    },
    footer: {
      type: 'box' as const,
      layout: 'vertical' as const,
      spacing: 'sm',
      contents: [
        {
          type: 'button' as const,
          style: 'link',
          height: 'sm',
          action: {
            type: 'message' as const,
            label: '更新',
            text: '更新',
          },
        },
        {
          type: 'box' as const,
          layout: 'vertical' as const,
          contents: [],
          margin: 'sm',
        },
      ] as FlexComponent[],
      flex: 0,
    },
  } satisfies FlexBubble,
} satisfies Record<string, FlexBubble>;
