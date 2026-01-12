import { notFound } from 'next/navigation';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';

import { source } from '@/lib/source';
import {
  PriceSummary,
  PricingComparison,
} from '@/components/ui/pricing-comparison';
import { RoomFeatures } from '@/components/ui/room-features';
import { RoomPricing } from '@/components/ui/room-pricing';
import { RoomSelector, RoomsOverview } from '@/components/ui/rooms-overview';
import { FeatureTable } from '@/components/fumadocs/feature-table';
import { ImageCarousel } from '@/components/web/image-carousel';

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const slug = params.slug?.join('/') || '';

  // Add FAQ structured data for FAQ page
  const faqJsonLd = slug.includes('faq')
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '如何預訂蘊慢築民宿？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '您可以透過電話 0910-517-860 或 Line ID 0910517860 聯繫我們進行訂房。我們建議您提前預訂，特別是在連假期間。',
            },
          },
          {
            '@type': 'Question',
            name: '蘊慢築民宿的入住和退房時間？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '入住時間為下午 15:00 至 20:00，退房時間為上午 09:00 至 11:00。',
            },
          },
          {
            '@type': 'Question',
            name: '蘊慢築民宿有提供早餐嗎？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '有的，我們提供蔬食早餐，供應時間為早上 07:30 至 09:00。',
            },
          },
          {
            '@type': 'Question',
            name: '蘊慢築民宿附近有什麼景點？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '民宿周邊有許多知名景點，包括苗栗特色館（0.6公里）、龍騰斷橋（15公里）、勝興車站（15.5公里）、銅鑼天空步道（8.5公里）、客家大院（9.6公里）等。',
            },
          },
          {
            '@type': 'Question',
            name: '如何前往蘊慢築民宿？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '最近的火車站是銅鑼火車站（6.4公里），從火車站搭計程車約15分鐘。也可以搭乘往大湖或獅潭方向的公車，在福全站或苗栗特色館站下車，再步行抵達。',
            },
          },
        ],
      }
    : null;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
              img: (props) => <ImageZoom {...props} />,
              Step,
              Steps,
              FeatureTable,
              ImageCarousel,
              RoomPricing,
              RoomFeatures,
              RoomsOverview,
              RoomSelector,
              PricingComparison,
              PriceSummary,
            }}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  // Generate SEO-optimized titles and descriptions based on page content
  const slug = params.slug?.join('/') || '';

  let optimizedTitle = page.data.title;
  let optimizedDescription = page.data.description;
  let keywords: string[] = ['蘊慢築民宿', '苗栗民宿', '公館住宿'];

  // Customize metadata based on page type
  if (slug.includes('introductions')) {
    if (slug.includes('about')) {
      optimizedTitle = '關於我們 - 苗栗特色民宿';
      optimizedDescription =
        '認識蘊慢築民宿的茶藝花藝專業主人，了解我們的經營理念與服務特色。男主人為花藝教授，女主人為茶藝師，提供專業的茶藝花藝體驗課程。';
      keywords = [
        ...keywords,
        '茶藝師',
        '花藝教授',
        '茶藝體驗',
        '花藝課程',
        '苗栗茶藝',
        '花藝教學',
      ];
    } else if (slug.includes('rooms')) {
      optimizedTitle = '房型介紹 - 四人房/六人房/包棟';
      optimizedDescription =
        '蘊慢築民宿房型介紹：筆筒樹四人房（可住6人）、海金沙四人房（可住5人）、兔腳蕨六人房（可住7人），以及包棟方案。提供露台、庭園景觀，適合家庭親子旅遊。';
      keywords = [
        ...keywords,
        '四人房',
        '六人房',
        '包棟民宿',
        '家庭房',
        '親子住宿',
        '苗栗包棟',
        '露台房型',
        '庭園景觀',
      ];
    } else {
      optimizedDescription =
        '蘊慢築民宿基本介紹，了解我們的服務特色與設施。提供舒適住宿環境、茶藝花藝體驗、蔬食早餐等特色服務。';
      keywords = [
        ...keywords,
        '民宿介紹',
        '苗栗特色民宿',
        '茶藝花藝',
        '蔬食早餐',
      ];
    }
  } else if (slug.includes('guides')) {
    if (slug.includes('booking')) {
      optimizedTitle = '訂房須知與聯絡資訊';
      optimizedDescription =
        '蘊慢築民宿訂房資訊：電話0910-517-860，Line ID @yunmanchu。詳細訂房流程、退款規定、付款方式說明。位於苗栗公館福星村。';
      keywords = [
        ...keywords,
        '訂房電話',
        '民宿訂房',
        '苗栗民宿訂房',
        '退款規定',
        '聯絡方式',
      ];
    } else if (slug.includes('check_in')) {
      optimizedTitle = '入住須知與周邊景點';
      optimizedDescription =
        '蘊慢築民宿入住須知：入住時間15:00-20:00，退房時間09:00-11:00。周邊景點包含苗栗特色館、龍騰斷橋、勝興車站、銅鑼天空步道等知名景點。';
      keywords = [
        ...keywords,
        '入住須知',
        '周邊景點',
        '苗栗特色館',
        '龍騰斷橋',
        '勝興車站',
        '銅鑼天空步道',
        '苗栗景點',
      ];
    } else if (slug.includes('transport')) {
      optimizedTitle = '交通方式與大眾運輸';
      optimizedDescription =
        '蘊慢築民宿交通資訊：鄰近銅鑼火車站、苗栗火車站、苗栗高鐵站。提供免費停車場，自駕或大眾運輸皆便利。';
      keywords = [
        ...keywords,
        '交通方式',
        '銅鑼火車站',
        '苗栗火車站',
        '苗栗高鐵',
        '免費停車',
      ];
    } else if (slug.includes('faq')) {
      optimizedTitle = '常見問題解答';
      optimizedDescription =
        '蘊慢築民宿常見問題：訂房方式、入住須知、設施介紹、周邊景點、交通資訊等問題解答，讓您快速了解苗栗公館民宿。';
      keywords = [
        ...keywords,
        '常見問題',
        'FAQ',
        '民宿問答',
        '訂房問題',
        '苗栗民宿FAQ',
      ];
    } else {
      optimizedDescription =
        '蘊慢築民宿住宿指南，包含入住須知、訂房資訊、交通方式等實用資訊。';
      keywords = [...keywords, '住宿指南', '入住資訊', '交通指南'];
    }
  }

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: keywords,
    openGraph: {
      title: `${optimizedTitle} | 蘊慢築民宿`,
      description: optimizedDescription,
      type: 'article',
      images: [
        {
          url: `/og-${slug.replace(/\//g, '-') || 'default'}.jpg`,
          width: 1200,
          height: 630,
          alt: `${optimizedTitle} - 蘊慢築民宿`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${optimizedTitle} | 蘊慢築民宿`,
      description: optimizedDescription,
    },
    alternates: {
      canonical: `https://yunmanchu.com/${params.lang}/docs/${slug}`,
    },
  };
}
