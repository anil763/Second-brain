import { NextRequest, NextResponse } from 'next/server';
import { searchDocuments } from '@/lib/documents';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = searchDocuments(query);

  return NextResponse.json({
    results: results.map(doc => ({
      slug: doc.slug,
      title: doc.title,
      folder: doc.folder,
      excerpt: doc.excerpt,
      tags: doc.frontmatter.tags || [],
      date: doc.frontmatter.date,
    })),
  });
}