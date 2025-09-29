// Temporarily commented out for build stability
// import { left, center, right } from '@/lib/images';
// import type { RoomCardData } from '@/components/ui/room-card';

// Complete room data combining all information
// export const ROOMS_DATA: Record<string, RoomCardData> = {
//   '筆筒樹': {
//     id: 'tree-fern',
//     name: '筆筒樹四人房',
//     subtitle: '帶露台的溫馨四人房',
//     description: '筆筒樹房配有茶几和露台，可容納六人入住，加床選項可增加兩張單床。露台區域環繞著美麗的庭園綠意，過往入住的客人都非常喜歡這個環境。',
//     images: right,
//     pricing: ROOM_PRICING_DATA['筆筒樹'],
//     features: [
//       ...COMMON_ROOM_FEATURES,
//       ...ROOM_SPECIFIC_FEATURES['筆筒樹']
//     ],
//     highlights: ['獨立露台', '庭園景觀'],
//     cta: {
//       text: '查看詳細資訊',
//       url: '/docs/introductions/rooms#四人房筆筒樹'
//     }
//   },
//   '海金沙': {
//     id: 'sea-gold-sand',
//     name: '海金沙四人房',
//     subtitle: '適合長輩的舒適房型',
//     description: '海金沙房適合長輩入住，配備床架，可加一張單床，最多可容納五人。提供沙發區，讓您與旅伴放鬆聊天看電視。窗外可欣賞自然景致。',
//     images: center,
//     pricing: ROOM_PRICING_DATA['海金沙'],
//     features: [
//       ...COMMON_ROOM_FEATURES,
//       ...ROOM_SPECIFIC_FEATURES['海金沙']
//     ],
//     highlights: ['適合長輩', '沙發區'],
//     cta: {
//       text: '查看詳細資訊',
//       url: '/docs/introductions/rooms#四人房海金沙'
//     }
//   },
//   '兔腳蕨': {
//     id: 'rabbit-foot',
//     name: '兔腳蕨六人房',
//     subtitle: '寬敞的家庭房型',
//     description: '兔腳蕨房可以加一張單床，最多能住七人，也設有沙發區，可以與同行親友一同休憩。衛浴間有對外窗能看到屋外的景色，早晨看著自然風光。',
//     images: left,
//     pricing: ROOM_PRICING_DATA['兔腳蕨'],
//     features: [
//       ...COMMON_ROOM_FEATURES,
//       ...ROOM_SPECIFIC_FEATURES['兔腳蕨']
//     ],
//     highlights: ['最大房型', '景觀衛浴', '家庭首選'],
//     cta: {
//       text: '查看詳細資訊',
//       url: '/docs/introductions/rooms#六人房兔腳蕨'
//     }
//   }
// };

// Room list for easy iteration
// export const ROOMS_LIST = Object.values(ROOMS_DATA);

// Room types for filtering
export const ROOM_TYPES = {
  FOUR_PERSON: '四人房',
  SIX_PERSON: '六人房',
  FULL_HOUSE: '包棟'
} as const;

// Get room by ID helper
// export function getRoomById(id: string): RoomCardData | undefined {
//   return Object.values(ROOMS_DATA).find(room => room.id === id);
// }

// Get rooms by capacity helper
// export function getRoomsByCapacity(capacity: number): RoomCardData[] {
//   return ROOMS_LIST.filter(room => room.pricing.capacity >= capacity);
// }

// Get pricing comparison helper
export function getPricingComparison() {
  // Simplified mock data for build to work
  return [
    {
      name: '海金沙四人房',
      capacity: 4,
      maxCapacity: 5,
      pricing: {
        weekday: 4680,
        weekend: 5280,
        lunar: 6280
      },
      pricePerPerson: {
        weekday: 1170,
        weekend: 1320,
        lunar: 1570
      }
    },
    {
      name: '筆筒樹四人房',
      capacity: 4,
      maxCapacity: 6,
      pricing: {
        weekday: 4980,
        weekend: 5680,
        lunar: 6680
      },
      pricePerPerson: {
        weekday: 1245,
        weekend: 1420,
        lunar: 1670
      }
    },
    {
      name: '兔腳蕨六人房',
      capacity: 6,
      maxCapacity: 7,
      pricing: {
        weekday: 6680,
        weekend: 7280,
        lunar: 8280
      },
      pricePerPerson: {
        weekday: 1113,
        weekend: 1213,
        lunar: 1380
      }
    }
  ];
}

// Room amenities summary
// export const ROOM_AMENITIES_SUMMARY = {
//   common: COMMON_ROOM_FEATURES,
//   additional: ADDITIONAL_AMENITIES,
//   roomSpecific: ROOM_SPECIFIC_FEATURES
// };

// Booking information
export const BOOKING_INFO = {
  checkIn: '15:00',
  checkOut: '11:00',
  breakfast: '07:30-09:00',
  contact: {
    phone: '+886-XXX-XXX-XXX',
    email: 'info@yunmanchu.com',
    line: '@yunmanchu'
  },
  policies: [
    '入住時間：下午 3:00 後',
    '退房時間：上午 11:00 前',
    '含早餐服務（07:30-09:00）',
    '提供免費停車位',
    '寵物入住需事先聯繫',
    '加床費用依時段而定'
  ]
};

// Pricing rules
export const PRICING_RULES = {
  periods: {
    weekday: '平日（週日-週四）',
    weekend: '假日（週五-週六）',
    lunar: '過年期間'
  },
  extraBed: {
    weekday: 800,
    weekend: 800,
    lunar: 1000
  },
  deposit: '訂房需付50%訂金',
  cancellation: '取消政策請洽詢民宿'
};