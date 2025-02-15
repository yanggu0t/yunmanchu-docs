import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import {
  Calendar,
  CheckCircle,
  Coffee,
  Flower,
  Home,
  Info,
  MapPinned,
} from 'lucide-react';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: '蘊慢築民宿',
  },
  links: [
    {
      type: 'menu',
      text: '基本介紹',
      items: [
        {
          icon: <Info />,
          text: '關於我們',
          description: '認識蘊慢築的故事與理念',
          url: '/docs/introductions/about',
        },
        {
          icon: <Home />,
          text: '房間介紹',
          description: '了解我們特色房型的獨特魅力',
          url: '/docs/introductions/rooms',
        },
      ],
    },
    {
      type: 'menu',
      text: '住宿指南',
      items: [
        {
          icon: <CheckCircle />,
          text: '入住須知',
          description: '入住相關規定與注意事項',
          url: '/docs/guides/check_in',
        },
        {
          icon: <Calendar />,
          text: '訂房須知',
          description: '預訂流程與訂房政策說明',
          url: '/docs/guides/booking',
        },
        {
          icon: <MapPinned />,
          text: '交通方式',
          description: '如何抵達蘊慢築民宿',
          url: '/docs/guides/transport',
        },
      ],
    },
    {
      type: 'menu',
      text: '體驗課程',
      items: [
        {
          icon: <Flower />,
          text: '插花體驗',
          description: '體驗花藝之美，創造專屬作品',
          url: '/docs/experiences/floral',
        },
        {
          icon: <Coffee />,
          text: '品茶體驗',
          description: '品味東方茶道文化的精髓',
          url: '/docs/experiences/tea',
        },
      ],
    },
  ],
};
