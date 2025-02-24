import { SortedResult } from 'fumadocs-core/server';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { source } from '@/lib/source';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 正規化字串（去掉空格並轉換為 `NFKC`）
 */
export function normalize(text: string) {
  return text.trim().normalize('NFKC');
}

/**
 * 解析 `query` 並返回符合條件的搜尋結果
 * @param query 搜尋關鍵字
 * @returns SortedResult[]
 */
export function filterSearchResults(query: string): SortedResult[] {
  if (!query.trim()) return [];

  // ✅ **建立正則表達式來進行模糊搜尋（忽略大小寫）**
  const queryRegex = new RegExp(normalize(query), 'i');

  // 取得所有文件索引
  const pages = source.getPages();

  // **用 Map 來整理父子層的對應關係**
  const resultMap = new Map<
    string,
    { page: SortedResult; headings: SortedResult[]; hasDescription: boolean }
  >();

  pages.forEach((page) => {
    const { url, data } = page;
    if (!data) return;

    const { title, description, structuredData } = data;

    // ✅ 正規化 `title` 和 `description`
    const normalizedTitle = normalize(title || '');
    const normalizedDescription = normalize(description || '');

    let hasMatch = false;
    let hasHeading = false;

    // ✅ 1. 檢查 `title` 是否符合 `query`
    if (queryRegex.test(normalizedTitle)) {
      resultMap.set(url, {
        page: { id: url, url, type: 'page', content: normalizedTitle },
        headings: [],
        hasDescription: false, // 預設 `false`，如果 `description` 存在會變 `true`
      });
      hasMatch = true;
    }

    // ✅ 2. 檢查 `description` 是否符合 `query`
    if (queryRegex.test(normalizedDescription)) {
      if (!resultMap.has(url)) {
        resultMap.set(url, {
          page: { id: url, url, type: 'page', content: normalizedTitle },
          headings: [],
          hasDescription: true, // 記錄 `description` 已經存在
        });
      } else {
        resultMap.get(url)!.hasDescription = true; // 這頁已有 `description`
      }

      resultMap.get(url)!.headings.push({
        id: `${url}-desc`,
        url,
        type: 'text',
        content: normalizedDescription,
      });

      hasMatch = true;
    }

    // ✅ 3. `structuredData.headings` 是否符合 `query`
    const matchedHeadings = structuredData?.headings
      ?.filter((heading: { id: string; content: string }) =>
        queryRegex.test(normalize(heading.content))
      )
      .map((heading: { id: string; content: string }) => ({
        id: `${url}#${heading.id}`,
        url: `${url}#${heading.id}`,
        type: 'heading' as const,
        content: normalize(heading.content),
      }));

    if (matchedHeadings?.length) {
      if (!resultMap.has(url)) {
        resultMap.set(url, {
          page: { id: url, url, type: 'page', content: normalizedTitle },
          headings: [],
          hasDescription: false,
        });
      }
      resultMap.get(url)!.headings.push(...matchedHeadings);
      hasHeading = true;
      hasMatch = true;
    }

    // ✅ 4. **如果 `page` 匹配但沒有 `子層`，並且 `description` 也沒出現過，則補上一個 `text`**
    if (hasMatch && !hasHeading && !resultMap.get(url)!.hasDescription) {
      resultMap.get(url)!.headings.push({
        id: `${url}-auto-desc`,
        url,
        type: 'text',
        content: normalizedDescription || '詳細資訊',
      });
    }

    // ✅ 5. 如果 `heading` 或 `description` 符合但 `page` 沒有被加過，也補上 `page`
    if (hasMatch && !resultMap.has(url)) {
      resultMap.set(url, {
        page: { id: url, url, type: 'page', content: normalizedTitle },
        headings: [],
        hasDescription: false,
      });
    }
  });

  // ✅ 轉換成 `SortedResult[]`，確保 `page` 先出現在 `heading` 之前
  const results: SortedResult[] = [];
  resultMap.forEach(({ page, headings }) => {
    results.push(page);
    results.push(...headings);
  });

  return results;
}

export const normalizeList = <T>(list: T[], divider: number): T[] => {
  if (divider <= 0) throw new Error('Divider must be a positive number.');
  if (list.length === 0) return list;

  const remainder = list.length % divider;
  if (remainder === 0) return list;

  return [...list, ...list.slice(0, divider - remainder)];
};
