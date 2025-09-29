import { center, left, public_area, right } from '@/lib/images';
import { calculatePricePerPerson } from '@/lib/utils';

// Centralized room pricing data
export const ROOM_PRICING_DATA = {
  海金沙: {
    weekday: 4680,
    weekend: 5280,
    lunar: 6280,
    capacity: 4,
    maxCapacity: 5,
    extraBedPrice: {
      weekday: 800,
      weekend: 800,
      lunar: 1000,
    },
  },
  筆筒樹: {
    weekday: 4980,
    weekend: 5680,
    lunar: 6680,
    capacity: 4,
    maxCapacity: 6,
    extraBedPrice: {
      weekday: 800,
      weekend: 800,
      lunar: 1000,
    },
  },
  兔腳蕨: {
    weekday: 6680,
    weekend: 7280,
    lunar: 8280,
    capacity: 6,
    maxCapacity: 7,
    extraBedPrice: {
      weekday: 800,
      weekend: 800,
      lunar: 1000,
    },
  },
  包棟方案: {
    weekday: 16000,
    weekend: 18000,
    lunar: 21000,
    capacity: 14,
    maxCapacity: 20,
    extraBedPrice: {
      weekday: 800,
      weekend: 800,
      lunar: 1000,
    },
  },
} as const;

// Room pricing interface
export interface RoomPricingData {
  weekday: number;
  weekend: number;
  lunar: number;
  capacity: number;
  maxCapacity?: number;
  extraBedPrice?: {
    weekday: number;
    weekend: number;
    lunar: number;
  };
}

// Room data with images for pricing cards
export interface RoomDataForPricing {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string; // Main room image for pricing cards
  pricing: {
    weekday: number;
    weekend: number;
    lunar: number;
    capacity: number;
    maxCapacity: number;
  };
  highlights: string[];
  cta: {
    text: string;
    url: string;
  };
}

// Complete room data for enhanced pricing cards
export const ROOMS_DATA: Record<string, RoomDataForPricing> = {
  海金沙: {
    id: 'sea-gold-sand',
    name: '海金沙四人房',
    subtitle: '適合長輩的舒適房型',
    description:
      '海金沙房適合長輩入住，配備床架，可加一張單床，最多可容納五人。提供沙發區，讓您與旅伴放鬆聊天看電視。窗外可欣賞自然景致。',
    image: center[1].src,
    pricing: ROOM_PRICING_DATA['海金沙'],
    highlights: ['適合長輩', '沙發區'],
    cta: {
      text: '查看房間資訊',
      url: '/docs/introductions/rooms#四人房海金沙',
    },
  },
  筆筒樹: {
    id: 'tree-fern',
    name: '筆筒樹四人房',
    subtitle: '帶露台的溫馨四人房',
    description:
      '筆筒樹房配有茶几和露台，可容納六人入住，加床選項可增加兩張單床。露台區域環繞著美麗的庭園綠意，過往入住的客人都非常喜歡這個環境。',
    image: right[1].src,
    pricing: ROOM_PRICING_DATA['筆筒樹'],
    highlights: ['獨立露台', '庭園景觀'],
    cta: {
      text: '查看房間資訊',
      url: '/docs/introductions/rooms#四人房筆筒樹',
    },
  },
  兔腳蕨: {
    id: 'rabbit-foot',
    name: '兔腳蕨六人房',
    subtitle: '寬敞的家庭房型',
    description:
      '兔腳蕨房可以加一張單床，最多能住七人，也設有沙發區，可以與同行親友一同休憩。衛浴間有對外窗能看到屋外的景色，早晨看著自然風光。',
    image: left[3].src,
    pricing: ROOM_PRICING_DATA['兔腳蕨'],
    highlights: ['最大房型', '景觀衛浴', '家庭首選'],
    cta: {
      text: '查看房間資訊',
      url: '/docs/introductions/rooms#六人房兔腳蕨',
    },
  },
  包棟方案: {
    id: 'full-house',
    name: '包棟方案',
    subtitle: '獨享整棟空間',
    description:
      '包棟方案讓您獨享整棟民宿空間，包含所有房型和公共區域。基本可住14人，最多可加至20人，最適合大家庭聚會、朋友聚會或公司團建活動。',
    image: public_area[0].src, // Use lobby image as main image
    pricing: ROOM_PRICING_DATA['包棟方案'],
    highlights: ['獨享整棟', '最多20人', '最划算方案', '含所有設施'],
    cta: {
      text: '聯繫我們詢問',
      url: '/docs/guides/booking',
    },
  },
};

// Room list for easy iteration
export const ROOMS_LIST = Object.values(ROOMS_DATA);

// Get pricing comparison helper - using centralized data
export function getPricingComparison() {
  return Object.entries(ROOM_PRICING_DATA).map(([key, pricing]) => {
    const roomName =
      key === '包棟方案'
        ? '包棟方案'
        : `${key}${key === '兔腳蕨' ? '六人房' : '四人房'}`;

    return {
      name: roomName,
      capacity: pricing.capacity,
      maxCapacity: pricing.maxCapacity,
      pricing: {
        weekday: pricing.weekday,
        weekend: pricing.weekend,
        lunar: pricing.lunar,
      },
      pricePerPerson: {
        weekday: calculatePricePerPerson(pricing.weekday, pricing.capacity),
        weekend: calculatePricePerPerson(pricing.weekend, pricing.capacity),
        lunar: calculatePricePerPerson(pricing.lunar, pricing.capacity),
      },
    };
  });
}

// Pricing rules
export const PRICING_RULES = {
  periods: {
    weekday: '平日（週日-週四）',
    weekend: '假日（週五-週六）',
    lunar: '春節期間',
  },
  extraBed: {
    weekday: 800,
    weekend: 800,
    lunar: 1000,
  },
  deposit: '訂房需付50%訂金',
  cancellation: '取消政策請洽詢民宿',
};
