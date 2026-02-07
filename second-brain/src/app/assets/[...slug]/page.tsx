import { getAllDocuments } from '@/lib/documents';
import { DocumentLayout } from '@/components/DocumentLayout';
import { DocumentViewer } from '@/components/DocumentViewer';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string[] };
}

export async function generateStaticParams() {
  const documents = getAllDocuments().filter(doc => doc.folder === 'assets');
  return documents.map((doc) => ({
    slug: doc.slug.split('/'),
  }));
}

export default function AssetPage({ params }: PageProps) {
  const slug = params.slug.join('/');
  const document = getAllDocuments().find(
    doc => doc.folder === 'assets' && doc.slug === slug
  );

  if (!document) {
    notFound();
  }

  return (
    <DocumentLayout document={document} folder="assets">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <DocumentViewer document={document} />
      </div>
    </DocumentLayout>
  );
}