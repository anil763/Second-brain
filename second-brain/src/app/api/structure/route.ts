import { NextResponse } from 'next/server';
import { getAllDocuments, getAllTags } from '@/lib/documents';

export async function GET() {
  const documents = getAllDocuments();
  const tags = getAllTags();

  const buildStructure = (folder: 'docs' | 'daily' | 'concepts' | 'spiritual-journey' | 'projects' | 'assets') => {
    const folderDocs = documents.filter(d => d.folder === folder);
    return folderDocs.map(doc => ({
      name: doc.title,
      path: `${folder}/${doc.slug}`,
      type: 'file' as const,
    }));
  };

  return NextResponse.json({
    structure: {
      docs: buildStructure('docs'),
      daily: buildStructure('daily'),
      concepts: buildStructure('concepts'),
      'spiritual-journey': buildStructure('spiritual-journey'),
      projects: buildStructure('projects'),
      assets: buildStructure('assets'),
    },
    tags,
  });
}