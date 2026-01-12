import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://yunmanchu.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/zh/docs/',
          '/zh/docs/introductions/',
          '/zh/docs/guides/',
          '/llms.txt',
        ],
        disallow: ['/api/', '/_next/', '/admin/', '*.json', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/zh/',
          '/zh/docs/',
          '/zh/docs/introductions/',
          '/zh/docs/guides/',
        ],
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
