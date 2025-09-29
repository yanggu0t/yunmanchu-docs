import { PricingSection } from '../ui/price-section';

export const PAYMENT_FREQUENCIES = ['WEEKDAY', 'WEEKEND', 'LUNAR'];

export const TIERS = [
  {
    id: 'sea-gold-sand',
    name: '海金沙四人房',
    price: {
      WEEKDAY: 4680,
      WEEKEND: 5280,
      LUNAR: 6280,
    },
    description: '舒適的四人房型',
    features: [
      '含早餐',
      '可以加2人',
      '平日假日加床 800',
      '年假加床 1000',
      '寬大浴室適合年長者',
    ],
    cta: {
      text: '更多資訊',
      url: '/docs/introductions/rooms#%E5%9B%9B%E4%BA%BA%E6%88%BF%E6%B5%B7%E9%87%91%E6%B2%99',
    },
  },
  {
    id: 'tree-fern',
    name: '筆筒樹四人房',
    price: {
      WEEKDAY: 4980,
      WEEKEND: 5680,
      LUNAR: 6680,
    },
    description: '帶露台的四人房型',
    features: [
      '含早餐',
      '可以加3人',
      '平日假日加床 800',
      '年假加床 1000',
      '獨立露台',
    ],
    cta: {
      text: '更多資訊',
      url: '/docs/introductions/rooms#%E5%9B%9B%E4%BA%BA%E6%88%BF%E7%AD%86%E7%AD%92%E6%A8%B9',
    },
  },
  {
    id: 'rabbit-foot',
    name: '兔腳蕨六人房',
    price: {
      WEEKDAY: 6680,
      WEEKEND: 7280,
      LUNAR: 8280,
    },
    description: '寬敞的六人房型',
    features: [
      '含早餐',
      '可以加1人',
      '平日假日加床 800',
      '年假加床 1000',
      '最適合家庭入住',
    ],
    cta: {
      text: '更多資訊',
      url: '/docs/introductions/rooms#%E5%85%AD%E4%BA%BA%E6%88%BF%E5%85%94%E8%85%B3%E8%95%A8',
    },
  },
  {
    id: 'full-house',
    name: '包棟方案',
    price: {
      WEEKDAY: 16000,
      WEEKEND: 18000,
      LUNAR: 21000,
    },
    description: '獨享整棟空間',
    features: ['含早餐', '基本可住14人', '最多可加至20人', '最划算的方案'],
    cta: {
      text: '聯繫我們',
    },
    highlighted: true,
  },
];

export function PricingSectionBlock() {
  return (
    <PricingSection
      title="房型價格"
      subtitle="平日、假日、過年期間價格不同，請依入住日期選擇"
      frequencies={PAYMENT_FREQUENCIES}
      tiers={TIERS}
    />
  );
}
