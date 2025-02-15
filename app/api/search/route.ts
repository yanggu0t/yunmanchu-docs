import { NextRequest, NextResponse } from 'next/server';
import { filterSearchResults, normalize } from '@/lib/utils';

// export const { GET } = createFromSource(source);

export async function GET(req: NextRequest) {
  const query = normalize(req.nextUrl.searchParams.get('query') ?? '');

  const results = filterSearchResults(query);

  return NextResponse.json(results);
}
