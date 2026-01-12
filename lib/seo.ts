import type { Metadata } from 'next';

// SEO constants for the homestay
export const SEO_CONFIG = {
  siteName: '蘊慢築民宿',
  siteUrl: 'https://yunmanchu.com',
  defaultTitle: '蘊慢築民宿 | 苗栗公館特色民宿',
  defaultDescription:
    '蘊慢築民宿位於苗栗公館，提供四人房、六人房及包棟服務。享受茶藝花藝體驗，鄰近龍騰斷橋、勝興車站等知名景點。苗栗住宿、公館民宿首選。',
  keywords: [
    '苗栗民宿',
    '苗栗住宿',
    '公館民宿',
    '公館住宿',
    '包棟民宿',
    '家庭民宿',
    '親子民宿',
    '苗栗包棟',
    '苗栗旅遊',
    '苗栗景點',
    '四人房',
    '六人房',
    '蘊慢築',
    '苗栗特色館',
    '龍騰斷橋',
    '勝興車站',
    '茶藝',
    '花藝',
  ],
  contact: {
    phone: '+886-910-517-860',
    email: 'support@yunmanchu.com',
    address: '苗栗縣公館鄉福星村8鄰262-5號',
  },
};

// Generate structured data for local business
export function generateBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    image: `${SEO_CONFIG.siteUrl}/og-image.jpg`,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.contact.phone,
    email: SEO_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '福星村8鄰262-5號',
      addressLocality: '公館鄉',
      addressRegion: '苗栗縣',
      postalCode: '363',
      addressCountry: 'TW',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '24.513889',
      longitude: '120.822222',
    },
    openingHours: 'Mo-Su 15:00-20:00',
    checkinTime: '15:00',
    checkoutTime: '11:00',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi' },
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking' },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Tea Ceremony Experience',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Flower Arrangement Classes',
      },
      { '@type': 'LocationFeatureSpecification', name: 'Garden' },
      { '@type': 'LocationFeatureSpecification', name: 'Vegetarian Breakfast' },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: '四人房 - 筆筒樹',
        price: '4980',
        priceCurrency: 'TWD',
        description: '配有茶几和露台的四人房，可加床至六人',
      },
      {
        '@type': 'Offer',
        name: '四人房 - 海金沙',
        price: '4680',
        priceCurrency: 'TWD',
        description: '適合長輩入住的四人房，可加床至五人',
      },
      {
        '@type': 'Offer',
        name: '六人房 - 兔腳蕨',
        price: '6680',
        priceCurrency: 'TWD',
        description: '寬敞的六人房，可加床至七人',
      },
      {
        '@type': 'Offer',
        name: '包棟方案',
        price: '16000',
        priceCurrency: 'TWD',
        description: '獨享整棟民宿空間，適合大家庭或團體聚會',
      },
    ],
    starRating: {
      '@type': 'Rating',
      ratingValue: '5',
    },
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate common metadata
export function generateCommonMetadata(params: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}): Metadata {
  const {
    title = SEO_CONFIG.defaultTitle,
    description = SEO_CONFIG.defaultDescription,
    keywords = SEO_CONFIG.keywords,
    image = '/og-image.jpg',
    url = SEO_CONFIG.siteUrl,
    type = 'website',
  } = params;

  return {
    title,
    description,
    keywords,
    authors: [{ name: SEO_CONFIG.siteName }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'zh_TW',
      url,
      title,
      description,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - ${SEO_CONFIG.siteName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
